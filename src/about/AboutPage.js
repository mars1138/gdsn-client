import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import TabComponent from '../shared/components/TabComponent/TabComponent';
// import classes from './AboutPage.module.css';
import { aboutHero as heroData } from '../assets/data/heroData';
import { aboutTabs as tabs } from '../assets/data/tabData';

const AboutPage = () => {
  const { title, text } = heroData;

  return (
    <React.Fragment>
      <Section>
        <Hero type="left" page="about" title={title} text={text} />
      </Section>
      <Section>
        <TabComponent>{tabs}</TabComponent>
      </Section>
    </React.Fragment>
  );
};

export default AboutPage;
