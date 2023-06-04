import React from 'react';

import classes from './Slider.module.css';

const Slide = (props) => {
  let slide;

  if (props.type === 'description') {
    slide = (
      <div className={classes.content}>
        <div className={classes.description}>
          <h3>{props.slide.title}</h3>
          <p className={classes.text}>{props.slide.text}</p>
        </div>
        <div className={classes.image}>
          <img src={props.slide.imgUrl} alt={props.slide.title} />
        </div>
      </div>
    );
  }

  if (props.type === 'gallery') {
    slide = (
      <div className={classes.content}>
        <div className={classes.gallery}>
          <img src={props.slide.imgUrl} alt="temp" />
        </div>
      </div>
    );
  }

  if (props.type === 'testimonial') {
    slide = (
      <div className={classes.content}>
        <div className={classes.quote}>
          <blockquote>
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            odit voluptate unde quasi atque quas amet minima eius tempore ea
            dignissimos rerum repudiandae omnis cupiditate, laudantium illo
            suscipit, dicta illum"
          </blockquote>
          <div className={classes.author}>
            <span>-&nbsp;{props.slide.author}</span>
          </div>
        </div>
        <div className={classes['author-image']}>
          <img src={props.slide.imgUrl} alt={props.slide.title} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={classes.slide}
      style={{ transform: `translateX(${props.shift[props.index]}%)` }}
      id={props.index}
      key={props.index}
    >
      {slide}
    </div>
  );
};

export default Slide;
