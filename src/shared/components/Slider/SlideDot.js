import React from 'react';

import classes from './Slider.module.css';

const SlideDot = (props) => {
  const dotClasses = `${classes.dot} ${
    props.currentSlide === props.index ? classes.active : ''
  }`;

  return (
    <button
      className={dotClasses}
      onClick={() => {
        props.goToSlide(props.index);
      }}
      id={props.index}
      key={props.index}
    ></button>
  );
};

export default SlideDot;
