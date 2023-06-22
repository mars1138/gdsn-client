import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.css';

const Button = (props) => {
  const buttonClasses = `${classes.button}
    ${props.inverse && classes.inverse}
    ${props.disabled && classes.disabled}
    ${props.got && classes.go}
    ${props.danger && classes.danger}
    ${props.action && classes.action}
  `;

  if (props.to) {
    return (
      <Link to={props.to} className={buttonClasses}>
        {props.children}
      </Link>
    );
  }
  if (props.href) {
    return (
      <a className={buttonClasses} href={props.href}>
        {props.children}
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      <div>{props.children}</div>
    </button>
  );
};

export default Button;
