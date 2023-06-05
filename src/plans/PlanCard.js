import React from 'react';

import Card from '../shared/UIElements/Card';
import Button from '../shared/UIElements/Button';

import classes from './PlanCard.module.css';

const PlanCard = (props) => {
  const features = [];

  props.plan.features.forEach((feature, index) => {
    features.push(
      <li key={index}>
        <div className={classes['plan-icon']}>
          <ion-icon size="medium" src={feature.icon}></ion-icon>
        </div>
        <div className={classes['plan-detail']}>{feature.text}</div>
      </li>
    );
  });

  return (
    <div className={classes.plan}>
      <Card>
        <div className={classes['plan-info']}>
          <div>
            <h2>{props.plan.title}</h2>
            <div className={classes['plan-image']}>
              <img src={props.plan.imgUrl} alt={props.plan.title} />
            </div>
            <ul className={classes['plan-list']}>{features}</ul>
          </div>
          <Button to="/about/#contact-form">Get Quote</Button>
        </div>
      </Card>
    </div>
  );
};

export default PlanCard;
