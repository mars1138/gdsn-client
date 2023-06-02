import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import classes from './ProductsPage.module.css';
import { productsHero as heroData } from '../assets/data/heroData';

const ProductsPage = () => {
  const { title, text } = heroData;

  return (
    <React.Fragment>
      <Section>
        <Hero type="right" page="products" title={title} text={text} />
      </Section>
    </React.Fragment>
  );
};

export default ProductsPage;
