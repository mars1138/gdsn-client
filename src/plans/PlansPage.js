import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import classes from './PlansPage.module.css';
import { plansHero as heroData } from '../assets/data/heroData';

const PlansPage = () => {
  const { title, text } = heroData;

  return (
    <React.Fragment>
      <Section>
        <Hero type="center" page="plans" title={title} text={text} />
      </Section>
    </React.Fragment>
  );
};

export default PlansPage;
