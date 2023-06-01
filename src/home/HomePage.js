import React from 'react';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';

const heroTitle = 'Home';
const heroText =
  'Welcome to GDSN-Plus! To begin creating your product catalog, please sign in or create an account. At the My Products page, you can then begin creating new items.';

const HomePage = () => {
  return (
    <React.Fragment>
      <Section>
        <Hero type="right" page="home" title={heroTitle} text={heroText} />
      </Section>
      <Section>
        <p>Home Page</p>
      </Section>
    </React.Fragment>
  );
};

export default HomePage;
