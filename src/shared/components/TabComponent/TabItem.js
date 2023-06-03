import React from 'react';

import classes from './TabItem.module.css';

const TabItem = (props) => {
  const tabClasses = `${classes.tab} ${
    props.activeTab === props.id ? classes.active : ''
  }`;

  return (
    <li id={props.id} onClick={props.tabClick} className={tabClasses}>
      {props.title}
    </li>
  );
};

export default TabItem;
