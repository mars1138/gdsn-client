import React, { useEffect, useReducer } from 'react';

import { validate } from '../../utilities/validators';
import classes from './FormInput.module.css';

const inputReducer = (state, action) => {
  // CHANGE will check input value against any validator functions recieved as props
  // TOUCH sets an input as having been accessed by user
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: action.validators
          ? validate(action.val, action.validators)
          : true,
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

// for each input element, state keeps track of value, valid state, and whether element has been clicked on/accessed by user
// input element type is determined by props.element
// onInput passed as props; originating from form-hook; form-hook will use arguments to determine overall form validity
const FormInput = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;
  const inputClasses = `${props.edit ? classes.disabled : ''}`;

  let element;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const changeSelectHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });

    props.setSelectOption &&
      props.setSelectOption({ [props.id]: event.target.value });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  if (props.element === 'input') {
    element = (
      <input
        key={`${props.id}-input`}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        disabled={props.edit ? true : false}
        className={inputClasses}
      />
    );
  }
  if (props.element === 'textarea') {
    element = (
      <textarea
        key={`${props.id}-text`}
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        placeholder={props.placeholder}
      />
    );
  }
  if (props.element === 'select') {
    const optionsArray = [];

    props.id &&
      props.selectOptions.forEach((option, index) => {
        optionsArray.push(
          <option
            // key={`${props.id ? props.id : 'option'}-${index}`}
            key={option.name}
            value={option.id}
            className={props.edit && inputClasses}
          >
            {option.name}
          </option>
        );
      });

    element = (
      <select
        key={`${props.id}-select`}
        id={props.id}
        onChange={changeSelectHandler}
        onBlur={touchHandler}
        defaultValue={props.selected}
        disabled={props.edit ? true : false}
      >
        {optionsArray}
      </select>
    );
  }

  return (
    <div
      className={`${classes['form-control']} ${
        !inputState.isValid && inputState.isTouched && classes.invalid
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default FormInput;
