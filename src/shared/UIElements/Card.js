import React from 'react';

import classes from './Card.module.css';

const Card = (props) => {
  const widthClass = `width--${props.width}`;
  const marginClass = `margin--${props.margin}`;
  const cardClasses = `${classes.card} ${
    props.width ? classes[widthClass] : ''
  } ${props.margin ? classes[marginClass] : ''}`;

  return (
    <div className={cardClasses} key={props.index}>
      {props.children}
    </div>
  );
};

export default Card;
