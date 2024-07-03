import axios from 'axios';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../test/testUtils';
import App from './App';
import { getSecretWord as mockGetSecretWord } from './actions';

// activate global mock to make sure getSecretWord doesn't make network call
jest.mock('./actions');

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => {
  return shallow(<App />);
};

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

describe('get secret word', () => {
  test('getSecretWord on app mount', () => {});

  test('getSecretWord does not run on app update', () => {});
});
