import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Card from '../../shared/UIElements/Card';

import classes from './Categories.module.css';

const Subscriber = (props) => {
  const [deleteSub, setDeleteSub] = useState(false);

  const toggleSubHandler = (custId) => {
    setDeleteSub(!deleteSub);
    props.toggleSubscriber(custId);
  };

  return <Card index={props.subscriberNum} width="30"></Card>;
};

const Subscribers = (props) => {

    return <div>
        
    </div>
};

export default Subscribers;
