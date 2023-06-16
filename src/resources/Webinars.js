import React from 'react';

import Section from '../shared/components/layout/Section';
import WebinarCard from './WebinarCard';
import { webinarCards } from '../assets/data/cardData';
import classes from './Webinars.module.css';

const Webinars = () => {
  const webinars = [];

  webinarCards.forEach((topic, index) => {
    webinars.push(<WebinarCard webinar={topic} key={index} />);
  });

  return (
    <React.Fragment>
      <Section>
        <h2>Webinars</h2>
        <div className={classes.webinars}>{webinars}</div>
      </Section>
    </React.Fragment>
  );
};

export default Webinars;
