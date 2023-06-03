import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import TabComponent from '../shared/components/TabComponent/TabComponent';
// import classes from './HomePage.module.css';
import { homeHero as heroData } from '../assets/data/heroData';
import { homeTabs as tabs } from '../assets/data/tabData';

const HomePage = () => {
  const { title, text } = heroData;

  return (
    <React.Fragment>
      <Section>
        <Hero type="right" page="home" title={title} text={text} />
      </Section>
      <Section>
        <TabComponent>{tabs}</TabComponent>
      </Section>
    </React.Fragment>
  );
};

export default HomePage;
