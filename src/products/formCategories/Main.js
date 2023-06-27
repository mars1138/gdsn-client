import React from 'react';

import FormInput from '../../shared/components/FormElements/FormInput';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from '../../shared/utilities/validators';
import classes from './Categories.module.css';

const Main = (props) => {
  const { product, inputHandler } = props;

  return (
    <div className={classes.category}>
      <h3>Main</h3>
      <div className={classes['block-container']}>
        <div className={classes['block-50']}>
          <FormInput
            key={product ? product.name : 'name'}
            id="name"
            element="input"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name"
            initialValue={product ? product.name : ''}
            initialValid={props.edit}
            onInput={inputHandler}
          />
          <FormInput
            key={product ? product.description : 'description'}
            id="description"
            element="textarea"
            label="Product Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a description (min 10 characters)"
            initialValue={product ? product.description : ''}
            initialValid={props.edit}
            onInput={inputHandler}
          />
          <FormInput
            key={product ? product.gtin : 'gtin'}
            id="gtin"
            element="input"
            label="GTIN-14 Global Trade Identification Number"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MINLENGTH(14),
              VALIDATOR_MAXLENGTH(14),
            ]}
            errorText="Please enter a valid 14 digit GTIN"
            initialValue={product ? product.gtin : ''}
            initialValid={props.edit}
            onInput={inputHandler}
            edit={props.edit}
          />
          <FormInput
            key={product ? `${product.category}1` : 'category'}
            id="category"
            element="select"
            selectOptions={props.categoryOptions}
            label="Global Product Category Code"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please select a category"
            selected={product ? product.category : ''}
            initialValid={props.edit}
            onInput={inputHandler}
            setSelectOption={props.setSelectOption}
          />
          <FormInput
            key={product ? `${product.type}2` : 'type'}
            id="type"
            element="select"
            selectOptions={props.typeOptions}
            label="Product Type"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please select a type"
            selected={product ? product.type : ''}
            initialValid={props.edit}
            onInput={inputHandler}
            edit={props.edit}
            setSelectOption={props.setSelectOption}
          />
        </div>
        <div className={classes['block-50']}>
          <ImageUpload
            key={product ? product.image : 'image'}
            center
            id="image"
            // validators={[VALIDATOR_REQUIRE()]}
            errorText="Please provide an image"
            initialValue={product ? product.image : ''}
            initialValid={props.edit}
            onInput={inputHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
