import React from 'react';

import Card from '../shared/UIElements/Card';

import classes from './WebinarCard.module.css';

const WebinarCard = (props) => {
  return (
    <Card width="30" margin="medium">
      <h3 className={classes.title}>props.webinar.title</h3>
      <img
        className={classes.image}
        src={props.webinar.imgUrl}
        alt={props.webinar.title}
      />
      <div className={classes.text}>
        <p>{props.webinar.text}</p>
      </div>
    </Card>
  );
};

export default WebinarCard;
