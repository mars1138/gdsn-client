import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import classes from './ResourcesPage.module.css';
import { resourcesHero as heroData } from '../assets/data/heroData';

const ResourcesPage = () => {
  const { title, text } = heroData;

  return (
    <React.Fragment>
      <Section>
        <Hero type="right" page="resources" title={title} text={text} />
      </Section>
    </React.Fragment>
  );
};

export default ResourcesPage;
