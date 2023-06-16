import React from 'react';

import Hero from '../shared/components/layout/Hero';
import TabComponent from '../shared/components/TabComponent/TabComponent';
import Card from '../shared/UIElements/Card';
import Section from '../shared/components/layout/Section';
import { supportCards } from '../assets/data/cardData';
import { supportTabs } from '../assets/data/tabData';
import { supportHero } from '../assets/data/heroData';
import classes from './Support.module.css';

const Support = () => {
  const cardArray = [];

  supportCards.forEach((card) =>
    cardArray.push(
      <Card key={card.id}>
        <div className={classes.image}>
          <img src={card.cardImg} alt={card.cardTitle} />
        </div>
      </Card>
    )
  );

  return (
    <React.Fragment>
      <Section>
        <Hero
          type="center"
          page="support"
          title={supportHero.title}
          text={supportHero.text}
        />
      </Section>
      <Section>
        <TabComponent>{supportTabs}</TabComponent>
      </Section>
      <Section>
        <div className={classes.supportCards}>{cardArray}</div>
      </Section>
    </React.Fragment>
  );
};

export default Support;
