import { useCallback, useReducer } from 'react';

// INPUT_CHANGE processes change in input element value
// SET_DATA is used to populate fields in edit mode
// as an input element is changed, a check is made to see if the entered value is valid; if the rest of the inputs are valid, then entire form is valid
const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) continue;

        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    case 'SET_DATA':
      return { inputs: action.inputs, isValid: action.formIsValid };

    default:
      return state;
  }
};

// initialInputs: object where key=input name, value=object with keys: value & isValid
// inputHandler will be passed on to each input custom component to let form hook know if the entered value for that input is valid
// setFormData:  used for populating fields for existing data
export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  // detect changes in input field and set validity
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
