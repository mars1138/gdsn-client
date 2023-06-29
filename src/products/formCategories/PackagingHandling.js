import React from 'react';

import FormInput from '../../shared/components/FormElements/FormInput';
import { VALIDATOR_REQUIRE } from '../../shared/utilities/validators';

import classes from './Categories.module.css';

const PackagingHandling = (props) => {
  const { product, inputHandler } = props;

  return (
    <div className={classes.category}>
      <h3>PackagingHandling</h3>
      <div className={classes['block-container']}>
        <div className={classes['block-25']}>
          <FormInput
            key={
              product && product.packagingType
                ? `packagingType${product.packagingType}`
                : 'packagingType'
            }
            id="packagingType"
            element="select"
            selectOptions={props.packageOptions}
            label="Packaging Type"
            validators={[VALIDATOR_REQUIRE()]}
            errorText={product ? product.packagingType : ''}
            selected={product ? product.packagingType : ''}
            onInput={inputHandler}
            setSelectOptions={props.setSelectOption}
            initialValid={props.edit}
          />
        </div>
        <div className={classes['block-25']}>
          <FormInput
            key={
              product && product.tempUnits
                ? `tempUnits${product.tempUnits}`
                : 'tempUnits'
            }
            id="tempUnits"
            element="select"
            selectOptions={props.tempOptions}
            label="Temperature Units"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please select a unit of measture"
            selected={product ? product.tempUnits : ''}
            onInput={inputHandler}
            setSelectOption={props.setSelectOption}
            initialValid={props.edit}
          />
          <FormInput
            key={
              product && product.minTemp
                ? `minTemp${product.minTemp}`
                : 'minTemp'
            }
            id="minTemp"
            element="input"
            type="text"
            label="Minimum Temperature"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter min temperature"
            initialValue={product ? product.minTemp : ''}
            onInput={inputHandler}
            initialValid={props.edit}
          />
          <FormInput
            key={
              product && product.maxTemp
                ? `maxTemp${product.maxTemp}`
                : 'maxTemp'
            }
            id="maxTemp"
            element="input"
            type="text"
            label="Maximum Temperature"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter max temperature"
            initialValue={product ? product.maxTemp : ''}
            onInput={inputHandler}
            initialValid={props.edit}
          />
        </div>
        <div className={classes['block-50']}>
          <FormInput
            key={
              product && product.storageInstructions
                ? `${product.storageInstructions}`
                : 'storageInstructions'
            }
            id="storageInstructions"
            element="textarea"
            label="Storage Instructions"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter storage instructions"
            initialValue={product ? product.storageInstructions : ''}
            onInput={inputHandler}
            initialValid={props.edit}
          />
        </div>
      </div>
    </div>
  );
};

export default PackagingHandling;
