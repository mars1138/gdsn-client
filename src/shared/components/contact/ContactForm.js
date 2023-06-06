import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../../UIElements/Modal';
import Button from '../../UIElements/Button';
import LoadingSpinner from '../../UIElements/LoadingSpinner';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState();

  const history = useHistory();
  const submitMessage = 'Form submitted, we will contact you shortly!';

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
      <div>
        <form>
          <Button>Submit</Button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ContactForm;
