import React from 'react';

import classes from './ContactText.module.css';

const ContactText = () => {
  return (
    <div className={classes['contact-text-container']}>
      <div className={classes['contact-text']}>
        <h3>Main Office</h3>
        <p>
          1234 Main St.
          <br />
          Downtown, WA 98101
        </p>
        <p>(206) 555-4321</p>
      </div>
    </div>
  );
};

export default ContactText;
