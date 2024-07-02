import React from 'react';

export const Congrats = (props) => {
  if (props.success) {
    return (
      <div data-test='component-congrats' className='alert alert-success'>
        <span data-test='congrats-message'>
          Congratulations! You guessed the world!
        </span>
      </div>
    );
  } else {
    return <div data-test='component-congrats'></div>;
  }
};
