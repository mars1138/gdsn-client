import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import TabComponent from '../shared/components/TabComponent/TabComponent';
// import classes from './ResourcesPage.module.css';
import { resourcesHero as heroData } from '../assets/data/heroData';
import { resourcesTabs as tabs } from '../assets/data/tabData';

const ResourcesPage = () => {
  const { title, text } = heroData;

  return (
    <React.Fragment>
      <Section>
        <Hero type="right" page="resources" title={title} text={text} />
      </Section>
      <Section>
        <TabComponent>{tabs}</TabComponent>
      </Section>
    </React.Fragment>
  );
};

export default ResourcesPage;
