import React from 'react';

import classes from './Slider.module.css';

const SlideNav = (props) => {
  const prev = '/icons/chevron-back-outline.svg';
  const next = '/icons/chevron-forward-outline.svg';
  const navClass = `${props.type === 'left' ? classes.left : classes.right}`;
  return (
    <div className={navClass} onClick={props.slideAction}>
      <ion-icon
        size="medium"
        src={props.type === 'left' ? prev : next}
      ></ion-icon>
    </div>
  );
};

export default SlideNav;
