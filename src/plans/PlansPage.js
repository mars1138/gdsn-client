import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import Slider from '../shared/components/Slider/Slider';
import PlanCard from './PlanCard';
import classes from './PlansPage.module.css';
import { plansHero as heroData } from '../assets/data/heroData';
import { plansSlider as slider } from '../assets/data/sliderData';
import { planCards } from '../assets/data/cardData';

const PlansPage = () => {
  const { title, text } = heroData;
  const plansArray = [];

  planCards.forEach((plan, index) => {
    plansArray.push(<PlanCard plan={plan} id={index} key={index} />);
  });

  return (
    <React.Fragment>
      <Section>
        <Hero type="center" page="plans" title={title} text={text} />
      </Section>
      <Section>
        <div className={classes.planCards}>{plansArray}</div>
      </Section>

      <Section>
        <h2>Plans That Suit Any Company's Mission</h2>
        <Slider type="description" content={slider} />
      </Section>
    </React.Fragment>
  );
};

export default PlansPage;
