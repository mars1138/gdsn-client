import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Modal from '../shared/UIElements/Modal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import Button from '../shared/UIElements/Button';
import Card from '../shared/UIElements/Card';
import Section from '../shared/components/layout/Section';

import Main from './formCategories/Main';
import Dimensions from './formCategories/Dimensions';
import PackagingHandling from './formCategories/PackagingHandling';
import Subscribers from './formCategories/Subscribers';

import { useHttpClient } from '../shared/hooks/http-hook';
import { useForm } from '../shared/hooks/form-hook';
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

const UpdateProduct = () => {
  const [loadedProduct, setLoadedProduct] = useState();
  const [didSubmit, setDidSubmit] = useState(false);

  const [subscriberUpdate, setSubscriberUpdate] = useState([]);
  const [selectOptionsValues, setSelectOptionsValues] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      category: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const { sendRequest, error, clearError, isSubmitting } = useHttpClient();
  const params = useParams();
  const history = useHistory();

  const catalog = useSelector((state) => state.catalog.products);
  const authToken = useSelector((state) => state.auth.token);
  const authUserId = useSelector((state) => state.auth.userId);

  const toggleSubscriber = (custId) => {
    if (subscriberUpdate.find((subscriber) => subscriber === custId)) {
      const newSubs = subscriberUpdate.filter((sub) => sub !== custId);

      setSubscriberUpdate([...newSubs]);
    } else {
      setSubscriberUpdate((prev) => [...prev, +custId]);
    }
  };

  useEffect(() => {
    let product;
    console.log(params.pid);
    const fetchProduct = () => {
      product = catalog.filter((item) => item.gtin === +params.pid)[0];
    };

    fetchProduct();
    console.log('product to update: ', product);
    if (product.subscribers && product.subscribers.length > 0)
      setSubscriberUpdate([...product.subscribers]);

    setSelectOptionsValues({
      category: product.category,
      type: product.type,
      packagingType: product.packagingType,
      tempUnits: product.tempUnits,
      image: product.image,
    });

    setFormData(
      {
        name: {
          value: product.name,
          isValid: true,
        },
        description: {
          value: product.description,
          isValid: true,
        },
        gtin: {
          value: product.gtin,
          isValid: true,
        },
        category: {
          value: product.category,
          isValid: true,
        },
        type: {
          value: product.type,
          isValid: true,
        },
        image: {
          value: product.image,
          isValid: true,
        },
        height: {
          value: product.height,
          isValid: true,
        },
        width: {
          value: product.width,
          isValid: true,
        },
        depth: {
          value: product.depth,
          isValid: true,
        },
        weight: {
          value: product.weight,
          isValid: true,
        },
        packagingType: {
          value: product.packagingType || '',
          isValid: true,
        },
        tempUnits: {
          value: product.tempUnits || '',
          isValid: true,
        },
        minTemp: {
          value: product.minTemp,
          isValid: true,
        },
        maxTemp: {
          value: product.maxTemp,
          isValid: true,
        },
        storageInstructions: {
          value: product.storageInstructions,
          isValid: true,
        },
      },
      true
    );

    setLoadedProduct(product);
  }, [params.pid, catalog, setFormData]);

  const selectOptionsHandler = (value) => {
    const newVal = value;

    setSelectOptionsValues((prev) => {
      return { ...prev, ...newVal };
    });
  };

  const updateSubmitHandler = (event) => {
    event.preventDefault();
    setShowConfirmation(false);

    console.log('formState: ', formState);
    console.log('updateSubmit subscriberUpdate: ', subscriberUpdate);

    let url;

    const fetchData = async () => {
      try {
        url =
          process.env.REACT_APP_BACKEND_URL +
          `/api/products/${formState.inputs.gtin.value}`;

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
        formData.append('subscribers', subscriberUpdate);

        await sendRequest(url, 'PATCH', formData, {
          Authorization: 'Bearer ' + authToken,
        });

        setDidSubmit(true);
      } catch (err) {
        console.log(err);
      }
    };

    if (authToken && authUserId) fetchData();
  };

  // for Confirmation Modal
  const {
    showConfirmation,
    setShowConfirmation,
    showConfirmationHandler,
    cancelConfirmationHandler,
  } = useConfirmationModal();

  const confirmModalFooter = useConfirmModalFooter(
    updateSubmitHandler,
    cancelConfirmationHandler,
    'Update',
    'Cancel'
  );

  const resetSubmitHandler = () => {
    setDidSubmit(false);
    history.push('/products');
  };

  console.log(selectOptionsValues);
  console.log('loadedProduct: ', loadedProduct);

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
      Product has been updated successfully
    </Modal>
  );

  const confirmModal = (
    <Modal
      show={showConfirmation}
      onClear={cancelConfirmationHandler}
      msgHeader="Confirm Changes"
      footer={confirmModalFooter}
    >
      <p>Are you sure you want to update this product?</p>
    </Modal>
  );

  return (
    <Section>
      <h1>Update Product</h1>
      <div className={classes['card-container']}>
        <Card>
          {errorModal}
          {didSubmitModal}
          {confirmModal}
          <form className={classes.form} onSubmit={showConfirmationHandler}>
            {isSubmitting && <LoadingSpinner />}
            <Main
              inputHandler={inputHandler}
              setSelectOption={selectOptionsHandler}
              product={loadedProduct}
              categoryOptions={categoryOptions}
              typeOptions={typeOptions}
              edit
            />
            <Dimensions
              inputHandler={inputHandler}
              product={loadedProduct}
              edit
            />
            <PackagingHandling
              inputHandler={inputHandler}
              setSelectOption={selectOptionsHandler}
              onSubmit={updateSubmitHandler}
              product={loadedProduct}
              packageOptions={packageOptions}
              tempOptions={tempOptions}
              edit
            />
            <Subscribers
              product={loadedProduct ? loadedProduct.gtin : ''}
              subscribers={loadedProduct ? loadedProduct.subscribers : []}
              // subscribers={subscriberUpdate ? subscriberUpdate : []}
              toggleSubscriber={toggleSubscriber}
            />
            <div className={classes2['block-container']}>
              <Button type="submit" disabled={!formState.isValid}>
                Update
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

export default UpdateProduct;
