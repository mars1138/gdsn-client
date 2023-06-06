import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import TabComponent from '../shared/components/TabComponent/TabComponent';
import Card from '../shared/UIElements/Card';
import Slider from '../shared/components/Slider/Slider';
import Contact from '../shared/components/contact/Contact';
import classes from './AboutPage.module.css';
import { aboutHero as heroData } from '../assets/data/heroData';
import { aboutTabs as tabs } from '../assets/data/tabData';
import { aboutCards as cards } from '../assets/data/cardData';
import { aboutSlider as slider } from '../assets/data/sliderData';

const AboutPage = () => {
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
        <Hero type="left" page="about" title={title} text={text} />
      </Section>
      <Section>
        <div className={classes['about-cards']}>{cardArray}</div>
      </Section>
      <Section>
        <TabComponent>{tabs}</TabComponent>
      </Section>
      <Section>
        <Contact/>
      </Section>
      <Section>
        <Slider type="gallery" content={slider} />
      </Section>
    </React.Fragment>
  );
};

export default AboutPage;
