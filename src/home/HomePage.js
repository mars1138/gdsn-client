import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import TabComponent from '../shared/components/TabComponent/TabComponent';
import Card from '../shared/UIElements/Card';
import Slider from '../shared/components/Slider/Slider';
import classes from './HomePage.module.css';
import { homeHero as heroData } from '../assets/data/heroData';
import { homeTabs as tabs } from '../assets/data/tabData';
import { homeCards as cards } from '../assets/data/cardData';
import { homeSlider1 as slider } from '../assets/data/sliderData';

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
      <Section trigger="0.1">
        <h2>Services That Fit Your Company's Needs</h2>
        <Slider type="description" content={slider} />
      </Section>
    </React.Fragment>
  );
};

export default HomePage;
