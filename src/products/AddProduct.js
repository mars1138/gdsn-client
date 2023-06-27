import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Modal from '../shared/UIElements/Modal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import Button from '../shared/UIElements/Button';
import Card from '../shared/UIElements/Card';
import Section from '../shared/components/layout/Section';

import Main from './formCategories/Main';
import Dimensions from './formCategories/Dimensions';
import PackagingHandling from './formCategories/PackagingHandling';

import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import {
  useConfirmationModal,
  useConfirmModalFooter,
} from '../shared/hooks/confirmation-hook';

import {
  categoryOptions,
  typeOptions,
  tempOptions,
  packageOptions,
} from '../assets/data/productsData';
import classes from './AddProduct.module.css';
import classes2 from './formCategories/Categories.module.css';

const AddProduct = () => {
  const { isSubmitting, error, sendRequest, clearError } = useHttpClient();
  const [didSubmit, setDidSubmit] = useState(false);
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      gtin: {
        value: '',
        isValid: false,
      },
      category: {
        value: '',
        isValid: false,
      },
      type: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const productSubmitHandler = async (event) => {
    event.preventDefault();
    setShowConfirmation(false);
    let url;

    try {
      url = `${process.env.REACT_APP_BACKEND_URL}/api/products`;
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('gtin', formState.inputs.gtin.value);
      formData.append('category', formState.inputs.category.value);
      formData.append('type', formState.inputs.type.value);
      formData.append('image', formState.inputs.image.value);
      formData.append('height', formState.inputs.height.value);
      formData.append('width', formState.inputs.width.value);
      formData.append('depth', formState.inputs.depth.value);
      formData.append('weight', formState.inputs.weight.value);
      formData.append('packagingType', formState.inputs.packagingType.value);
      formData.append('tempUnits', formState.inputs.tempUnits.value);
      formData.append('minTemp', formState.inputs.minTemp.value);
      formData.append('maxTemp', formState.inputs.maxTemp.value);
      formData.append(
        'storageInstructions',
        formState.inputs.storageInstructions.value
      );
      formData.append('subscribers', []);

      await sendRequest(url, 'POST', formData, {
        Authorization: 'Bearer ' + token,
      });

      setDidSubmit(true);
    } catch (err) {
      console.log(err);
    }
  };

  // for Confirmation Modal
  const {
    showConfirmation,
    setShowConfirmation,
    showConfirmationHandler,
    cancelConfirmationHandler,
  } = useConfirmationModal();

  const confirmModalFooter = useConfirmModalFooter(
    productSubmitHandler,
    cancelConfirmationHandler,
    'Register',
    'Cancel'
  );

  const resetSubmitHandler = () => {
    setDidSubmit(false);
    history.push('/products');
  };

  const errorModal = (
    <Modal
      show={error === undefined || null ? false : true}
      msgHeader="Error creating product"
      onClear={clearError}
    >
      {`${error ? error : 'An unknown error occurred'}`}
    </Modal>
  );

  const didSubmitModal = (
    <Modal show={didSubmit} msgHeader="Success!" onClear={resetSubmitHandler}>
      Product had been registered successfully!
    </Modal>
  );

  const confirmModal = (
    <Modal
      show={showConfirmation}
      onClear={cancelConfirmationHandler}
      msgHeader="Confirm Registration"
      footer={confirmModalFooter}
    >
      <p>Are you sure you want to register this product?</p>
    </Modal>
  );

  return (
    <Section>
      <h1>Add Product</h1>
      <div className={classes['card-container']}>
        <Card>
          {errorModal}
          {didSubmitModal}
          {confirmModal}
          <form className={classes.form} onSubmit={showConfirmationHandler}>
            {isSubmitting && <LoadingSpinner />}
            <Main
              inputHandler={inputHandler}
              categoryOptions={categoryOptions}
              typeOptions={typeOptions}
            />
            <Dimensions inputHandler={inputHandler} />
            <PackagingHandling
              inputHandler={inputHandler}
              packageOptions={packageOptions}
              tempOptions={tempOptions}
            />
            <div className={classes2['block-container']}>
              <Button type="submit" disabled={!formState.isValid}>
                Add Item
              </Button>
              <Button to="/products/active" danger>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Section>
  );
};

export default AddProduct;
