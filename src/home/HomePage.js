import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import classes from './HomePage.module.css';
import { homeHero as heroData } from '../assets/data/heroData';

const HomePage = () => {
  const { title, text } = heroData;

  return (
    <React.Fragment>
      <Section>
        <Hero type="right" page="home" title={title} text={text} />
      </Section>
      <Section>
        <p>Home Page</p>
      </Section>
    </React.Fragment>
  );
};

export default HomePage;
