import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import classes from './AboutPage.module.css';
import { aboutHero as heroData } from '../assets/data/heroData';

const AboutPage = () => {
  const { title, text } = heroData;

  return (
    <React.Fragment>
      <Section>
        <Hero type="left" page="about" title={title} text={text} />
      </Section>
    </React.Fragment>
  );
};

export default AboutPage;
