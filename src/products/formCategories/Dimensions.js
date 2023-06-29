import React from 'react';

import FormInput from '../../shared/components/FormElements/FormInput';
import { VALIDATOR_REQUIRE } from '../../shared/utilities/validators';

import classes from './Categories.module.css';

const Dimensions = (props) => {
  const { product, inputHandler } = props;

  return (
    <div className={classes.category}>
      <h3>Dimensions</h3>
      <div className={classes['block-container']}>
        <div className={classes['block-25']}>
          <FormInput
            key={product ? `H${product.height}` : 'height'}
            id="height"
            element="input"
            label="Height (inches)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter height in inches"
            initialValue={product ? product.height : ''}
            onInput={inputHandler}
            initialValid={props.edit}
          />
          <FormInput
            key={product ? `W${product.width}` : 'width'}
            id="width"
            element="input"
            label="Width (inches)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter width in inches"
            initialValue={product ? product.width : ''}
            onInput={inputHandler}
            initialValid={props.edit}
          />
        </div>
        <div className={classes['block-25']}>
          <FormInput
            key={product ? `D${product.depth}` : 'depth'}
            id="depth"
            element="input"
            label="Depth (inches)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter depth in inches"
            initialValue={product ? product.depth : ''}
            onInput={inputHandler}
            initialValid={props.edit}
          />
          <FormInput
            key={product ? `WT${product.weight}` : 'weight'}
            id="weight"
            element="input"
            label="Weight (lbs)"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter weight in pounds"
            initialValue={product ? product.weight : ''}
            onInput={inputHandler}
            initialValid={props.edit}
          />
        </div>
      </div>
    </div>
  );
};

export default Dimensions;
