import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../../UIElements/Modal';
import Button from '../../UIElements/Button';
import LoadingSpinner from '../../UIElements/LoadingSpinner';
import classes from './ContactForm.module.css';

const ContactForm = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState();

  const history = useHistory();

  const submitMessage = 'Form is submitted.  We will contact you shortly!';
  const formClasses = `${classes['contact-form']} ${
    isSubmitting ? classes.submitting : ''
  }`;

  const submitHandler = (event) => {
    event.preventDefault();

    props.toggleSubmitting();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setDidSubmit(true);
      props.toggleSubmitting();
      history.push('/about');
    }, 1500);
  };

  const errorHandler = () => {
    setError(null);
  };

  const resetSubmitHandler = () => {
    setDidSubmit(false);
    // history.push('/');
  };

  return (
    <React.Fragment>
      {error && (
        <Modal msgHeader="Error!" show={error} onClear={errorHandler}>
          {error}
        </Modal>
      )}
      {didSubmit && (
        <Modal
          msgHeader="Success!"
          show={didSubmit}
          onClear={resetSubmitHandler}
        >
          {submitMessage}
        </Modal>
      )}
      <div className={classes['form-container']}>
        {isSubmitting && <LoadingSpinner />}
        <form className={formClasses} onSubmit={submitHandler}>
          <Button>Submit</Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ContactForm;
