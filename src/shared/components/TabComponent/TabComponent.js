import React, { useState } from 'react';

import TabItem from './TabItem';
import TabContent from './TabContent';
import classes from './TabComponent.module.css';

const TabComponent = (props) => {
  const [activeTab, setActiveTab] = useState(props.children[0].id);

  const tabLabels = [];
  const contentData = [];

  const tabClickHandler = (e) => {
    setActiveTab(+e.target.id);
  };

  props.children.forEach((tab) => {
    tabLabels.push(
      <TabItem
        id={tab.id}
        key={tab.id}
        tabClick={tabClickHandler}
        activeTab={activeTab}
        title={tab.title}
      />
    );

    contentData.push(
      <TabContent
        id={tab.id}
        key={tab.id}
        activeTab={activeTab}
        imageSrc={tab.imgUrl}
        heading={tab.heading}
        text={tab.content}
      />
    );
  });

  return (
    <div className={classes.container}>
      <ul className={classes.tabs}>{tabLabels}</ul>
      <div className={classes.content}>{contentData}</div>
    </div>
  );
};

export default TabComponent;
