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

  return (
    <Card index={props.subscriberNum} width="30">
      <div
        className={classes.close}
        onClick={() => {
          toggleSubHandler(props.customer.id);
        }}
      >
        {!deleteSub && (
          <ion-icon size="small" src="/icons/trash-outline.svg"></ion-icon>
        )}
        {deleteSub && (
          <ion-icon
            size="small"
            src="/icons/arrow-undo-circle-outline.svg"
          ></ion-icon>
        )}
      </div>
      <div className={classes.subscriber}>
        <h4>{props.customer.name}</h4>
        <h5>#{props.customer.id}</h5>
        {!deleteSub && <p>Active</p>}
        {deleteSub && <p style={{ color: 'var(--red-1)' }}>Remove</p>}
      </div>
    </Card>
  );
};

const Subscribers = (props) => {
  const customerList = useSelector((state) => state.customers.customerList);
  const subscribers = props.subscribers;
  const subscriberList = [];

  let content;

  content = <p>No Subscribers</p>;

  subscribers[0] &&
    subscribers.forEach((subscriberNum, i) => {
      const customer = customerList.find((cust) => cust.id === +subscriberNum);

      subscriberList.push(
        <Subscriber
          key={subscriberNum}
          index={i}
          customer={customer}
          toggleSubscriber={props.toggleSubscriber}
        />
      );
    });

  if (subscribers && subscribers.length > 0) content = subscriberList;

  return (
    <div className={classes.category}>
      <h3>Subscribers</h3>
      <div className={classes['block-container']}>
        <div className={classes.subscribers}>{content}</div>
      </div>
    </div>
  );
};

export default Subscribers;
