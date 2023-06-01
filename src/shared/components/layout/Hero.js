import React from 'react';

import HeroText from './HeroText';

import classes from './Hero.module.css';

const Hero = props => {
  const heroClasses = `${classes.hero} ${classes[props.page]} `;

  return (
    <div className={heroClasses}>
      <HeroText type={props.type} title={props.title} text={props.text} />
    </div>
  );
};

export default Hero;