import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../../UIElements/Modal';
import LoadingSpinner from '../../UIElements/LoadingSpinner';
import Button from '../../UIElements/Button';
import { useForm } from '../../hooks/form-hook';
import FormInput from '../FormElements/FormInput';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from '../../utilities/validators';
import classes from './ContactForm.module.css';

const ContactForm = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      company: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      phone: {
        value: '',
        isValid: false,
      },
      comments: {
        value: '',
        isValid: true,
      },
    },
    false
  );

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
    history.push('/');
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
          <FormInput
            key="name"
            id="name"
            element="input"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your full name"
            onInput={inputHandler}
          />
          <FormInput
            key="company"
            id="company"
            element="input"
            label="Company"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your company's name"
            onInput={inputHandler}
          />
          <FormInput
            key="email"
            id="email"
            element="input"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={inputHandler}
          />
          <FormInput
            key="phone"
            id="phone"
            element="input"
            label="Phone"
            validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(10)]}
            errorText="Please enter a valid phone number, with area code"
            onInput={inputHandler}
          />
          <FormInput
            key="comments"
            id="comments"
            element="textarea"
            label="Comments"
            initialValid={true}
            errorText="Please enter comment of minimum 10 characters"
            onInput={inputHandler}
          />
          <Button disabled={!formState.isValid}>Submit</Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ContactForm;
