import React from 'react';
import { Link } from 'react-router-dom';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import TabComponent from '../shared/components/TabComponent/TabComponent';
import Card from '../shared/UIElements/Card';
import classes from './ResourcesPage.module.css';
import { resourcesHero as heroData } from '../assets/data/heroData';
import { resourcesTabs as tabs } from '../assets/data/tabData';
import { resourcesCards as cards } from '../assets/data/cardData';

const ResourcesPage = () => {
  const { title, text } = heroData;
  const cardArray = [];

  cards.forEach((card) =>
    cardArray.push(
      <Link to={`/resources/${card.title}`}>
        <Card>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </Card>
      </Link>
    )
  );
  return (
    <React.Fragment>
      <Section>
        <Hero type="right" page="resources" title={title} text={text} />
      </Section>
      <Section>
        <div className={classes['resources-cards']}>{cardArray}</div>
      </Section>
      <Section>
        <TabComponent>{tabs}</TabComponent>
      </Section>
    </React.Fragment>
  );
};

export default ResourcesPage;
