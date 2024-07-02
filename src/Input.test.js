import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../test/testUtils';
import Input from './Input';

Enzyme.configure({ adapter: new EnzymeAdapter() });

// const mockSetCurrentGuess = jest.fn();
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: (initialState) => [initialState, mockSetCurrentGuess],
// }));

const setup = (success = false, secretWord = 'party') => {
  return shallow(<Input success={success} secretWord={secretWord} />);
};

describe('render', () => {
  describe('success is true', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup(true);
    });
    test('input renders without error', () => {
      // const wrapper = setup();
      const inputComponent = findByTestAttr(wrapper, 'component-input');
      expect(inputComponent.length).toBe(1);
    });

    test('input box does not show', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(false);
    });

    test('submit button does not show', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(false);
    });
  });

  describe('success is false', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup(false);
    });

    test('Input renders without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');
      expect(inputComponent.length).toBe(1);
    });

    test('input box show', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(true);
    });

    test('submit button shows', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(true);
    });
  });
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = () => ['', mockSetCurrentGuess];
    wrapper = setup();
  });

  afterEach(() => {
    React.useState = originalUseState;
  });

  test('state updates with value of input box upon change', () => {
    // const mockSetCurrentGuess = jest.fn();
    // React.useState = () => ['', mockSetCurrentGuess];
    // const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, 'input-box');
    expect(inputBox.length).toBe(1);

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  test('field is cleared upon submit button click', () => {
    // const mockSetCurrentGuess = jest.fn();
    // React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    // const wrapper = setup();
    const sumbmitButton = findByTestAttr(wrapper, 'submit-button');

    sumbmitButton.simulate('click', { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});
