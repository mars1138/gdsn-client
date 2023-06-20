import React, { useState } from 'react';

import Button from '../UIElements/Button';

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
