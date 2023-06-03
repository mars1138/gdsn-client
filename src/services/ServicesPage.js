import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import TabComponent from '../shared/components/TabComponent/TabComponent';
// import classes from './ServicesPage.module.css';
import { servicesHero as heroData } from '../assets/data/heroData';
import { servicesTabs as tabs } from '../assets/data/tabData';

const ServicesPage = () => {
  const { title, text } = heroData;
  return (
    <React.Fragment>
      <Section>
        <Hero page="services" title={title} text={text} />
      </Section>
      <Section>
        <TabComponent>{tabs}</TabComponent>
      </Section>
    </React.Fragment>
  );
};

export default ServicesPage;
