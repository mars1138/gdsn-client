import React, { useState } from 'react';

import Button from '../UIElements/Button';

// useConfirmationModal hook allows us to set actions & state to handle multiple modals that may occur on the same page page
export const useConfirmationModal = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const showConfirmationHandler = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  const cancelConfirmationHandler = () => setShowConfirmation(false);

  return {
    showConfirmation,
    setShowConfirmation,
    showConfirmationHandler,
    cancelConfirmationHandler,
  };
};

// allows us to set different functions and labels for multiple modals that may occur on the same page
export const useConfirmModalFooter = (
  submitFunction,
  cancelFunction,
  confirmLabel,
  cancelLabel
) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div>
        <Button danger onClick={cancelFunction}>
          {cancelLabel}
        </Button>
      </div>
      <div style={{ marginLeft: '1rem' }}>
        <Button onClick={submitFunction}>{confirmLabel}</Button>
      </div>
    </div>
  );
};
