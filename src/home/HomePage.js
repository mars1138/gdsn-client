import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import TabComponent from '../shared/components/TabComponent/TabComponent';
import Card from '../shared/UIElements/Card';
import classes from './HomePage.module.css';
import { homeHero as heroData } from '../assets/data/heroData';
import { homeTabs as tabs } from '../assets/data/tabData';
import { homeCards as cards } from '../assets/data/cardData';

const HomePage = () => {
  const { title, text } = heroData;
  const cardArray = [];

  cards.forEach((card) =>
    cardArray.push(
      <Card key={card.id} width="30">
        <h3>{card.title}</h3>
        <p>{card.text}</p>
      </Card>
    )
  );

  return (
    <React.Fragment>
      <Section>
        <Hero type="right" page="home" title={title} text={text} />
      </Section>
      <Section>
        <h2>Your Comprehensive Item Management Solution</h2>
        <div className={classes.cards}>{cardArray}</div>
      </Section>
      <Section>
        <TabComponent>{tabs}</TabComponent>
      </Section>
    </React.Fragment>
  );
};

export default HomePage;
