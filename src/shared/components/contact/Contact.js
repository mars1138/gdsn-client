import React, { useState } from 'react';

import ContactForm from './ContactForm';
import ContactText from './ContactText';
import classes from './Contact.module.css';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactClasses = `${classes.container} ${
    isSubmitting ? classes.submitting : ''
  }`;

  return (
    <div id="contact-form" className={classes.contact}>
      <h2>Contact us today for more information!</h2>
      <div className={contactClasses}>
        <ContactForm />
        <ContactText />
      </div>
    </div>
  );
};

export default Contact;
