import React, { useState, useRef, useEffect, useCallback } from 'react';

import classes from './Section.module.css';

const Section = (props) => {
  const [hideSection, setHideSection] = useState(true);

  const sectionClasses = `${classes.section} ${
    props.sectionClass ? props.sectionClass : ''
  } ${hideSection ? classes.hidden : ''}`;

  const containerClasses = `${classes.container} ${
    props.containerClass ? props.containerClass : ''
  }`;

  const trigger = props.trigger ? props.trigger : 0.35;
  const sectionRef = useRef();

  // Sections are made visible as the user scrolls down the page
  const setRevealSections = useCallback(() => {
    const revealSection = (entries, observer) => {
      const [entry] = entries;

      if (!entry.isIntersecting) return;

      setHideSection(false);
      observer.unobserve(entry.target);
    };

    const observerParams = {
      root: null,
      threshold: trigger,
    };

    const sectionObserver = new IntersectionObserver(
      revealSection,
      observerParams
    );

    sectionObserver.observe(sectionRef.current);
  }, [trigger]);

  useEffect(() => {
    setRevealSections();
  }, [setRevealSections]);

  return (
    <section ref={sectionRef} className={sectionClasses}>
      <div className={containerClasses}>{props.children}</div>
    </section>
  );
};

export default Section;
