import React from 'react';

import classes from './TabContent.module.css';

const TabContent = (props) => {
  const contentClasses = `${classes.container} ${
    props.activeTab === props.id ? classes.active : ''
  }`;

  return (
    <div className={contentClasses}>
      <div className={classes.image}>
        <img src={props.imageSrc} alt={props.heading} />
      </div>
      <div className={classes.content}>
        <h4>{props.heading}</h4>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default TabContent;
