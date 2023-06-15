import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import TabComponent from '../shared/components/TabComponent/TabComponent';
import Slider from '../shared/components/Slider/Slider';
// import classes from './ServicesPage.module.css';
import { servicesHero as heroData } from '../assets/data/heroData';
import { servicesTabs as tabs } from '../assets/data/tabData';
import { servicesSlider1 as slider1 } from '../assets/data/sliderData';
import { servicesSlider2 as slider2 } from '../assets/data/sliderData';

const ServicesPage = () => {
  const { title, text } = heroData;
  console.log('services loading...');
  return (
    <React.Fragment>
      <Section>
        <Hero page="services" title={title} text={text} />
      </Section>
      <Section>
        <TabComponent>{tabs}</TabComponent>
      </Section>
      <Section>
        <Slider type="gallery" content={slider1} />
      </Section>
      <Section>
        <Slider type="testimonial" content={slider2} />
      </Section>
    </React.Fragment>
  );
};

export default ServicesPage;
