import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';

import Button from '../shared/UIElements/Button';
import Modal from '../shared/UIElements/Modal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import FormInput from '../shared/components/FormElements/FormInput';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import {
  useConfirmationModal,
  useConfirmModalFooter,
} from '../shared/hooks/confirmation-hook';

import { customers } from '../assets/data/customersData';
import { categoryOptions, typeOptions } from '../assets/data/productsData';
import { VALIDATOR_REQUIRE } from '../shared/utilities/validators';
import classes from './ProductsTable.module.css';

const ProductsTable = (props) => {
  const [filterInput, setFilterInput] = useState('');
  const [actionParams, setActionParams] = useState();
  const [selectSubscriber, setSelectSubscriber] = useState();
  const [actionCompleted, setActionCompleted] = useState();

  const dispatch = useDispatch();
  const history = useHistory();

  const authToken = useSelector((state) => state.auth.token);
  const authUserId = useSelector((state) => state.auth.userId);
  const catalog = useSelector((state) => state.catalog.products);
  const { sendRequest, isSubmitting } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      subscriber: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const { columns, data, status } = props;
  const customerList = [{ id: '', name: '' }];
  let productName, customerName;
  let alreadySubbed = false;

  customers.forEach((cust) => customerList.push(cust));

  if (selectSubscriber && selectSubscriber.subscriber !== '') {
    customerName = customerList.find(
      (cust) => cust.id === +selectSubscriber.subscriber
    ).name;

    const gtin = actionParams.gtin;
    const custId = +selectSubscriber.subscriber;
    const product = catalog.find((item) => item.gtin === gtin);
    const productSubs = [...product.subscribers];
    alreadySubbed = productSubs.includes(custId);
    console.log('alreadySubbed: ', alreadySubbed);
  }

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter, // this hook provieds a way to set the filter
    // page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters, // adding the useFilters hook to the table; can add as many hooks as needed
    useSortBy,
    usePagination
  );

  const handleFilterChange = (event) => {
    const value = event.target.value || undefined;
    setFilter('name', value);
    setFilterInput(value);
  };

  const {
    showConfirmation: showConfirmActivate,
    setShowConfirmation: setShowConfirmActivate,
    cancelConfirmationHandler: cancelActivateHandler,
  } = useConfirmationModal();

  const {
    showConfirmation: showConfirmDeactivate,
    setShowConfirmation: setShowConfirmDeactivate,
    cancelConfirmationHandler: cancelDeactivateHandler,
  } = useConfirmationModal();

  const {
    showConfirmation: showConfirmPublish,
    showConfirmationHandler: showConfirmPublishHandler,
    cancelConfirmationHandler: cancelPublishHandler,
  } = useConfirmationModal();

  const {
    showConfirmation: showChooseSubscriber,
    setShowConfirmation: setShowChooseSubscriber,
    cancelConfirmationHandler: cancelSubscriberHandler,
  } = useConfirmationModal();

  const {
    showConfirmation: showConfirmDelete,
    setShowConfirmation: setShowConfirmDelete,
    cancelConfirmationHandler: cancelDeleteHandler,
  } = useConfirmationModal();

  const productActionHandler = (productId, action) => {
    productName = catalog.find((item) => item.gtin === productId).name;
    setActionParams({ gtin: productId, itemName: productName, action: action });

    if (action === 'activate') setShowConfirmActivate(true);
    if (action === 'deactivate') setShowConfirmDeactivate(true);
    if (action === 'publish') setShowChooseSubscriber(true);
    if (action === 'delete') setShowConfirmDelete(true);
  };

  const publishProductHandler = () => {
    console.log('actionParams: ', actionParams);
    const gtin = actionParams.gtin;

    if (!alreadySubbed) {
      // console.log(gtin, custId);

      const existingProduct = catalog.find((item) => item.gtin === gtin);
      console.log('existingProduct: ', existingProduct);

      let url;

      const fetchData = (authToken) => {
        const update = async (authToken) => {
          try {
            console.log('exec replaceCatalog...');
            url = process.env.REACT_APP_BACKEND_URL + `/api/products/${gtin}`;

            const formData = new FormData();
            formData.append('name', existingProduct.name);
            formData.append('description', existingProduct.description);
            formData.append('gtin', existingProduct.gtin);
            formData.append('category', existingProduct.category);
            formData.append('type', existingProduct.type);
            formData.append('image', existingProduct.image);
            formData.append('subscribers', [
              ...existingProduct.subscribers,
              +formState.inputs.subscriber.value,
            ]);

            await sendRequest(url, 'PATCH', formData, {
              Authorization: 'Bearer ' + authToken,
            });

            cancelPublishHandler();
            cancelSubscriberHandler();
            setActionCompleted('published.');
          } catch (err) {
            console.log(err);
            cancelPublishHandler();
            cancelSubscriberHandler();
          }
        };

        update(authToken);
        return { type: 'publish', payload: null };
      };

      if (authToken && authUserId) {
        dispatch(fetchData(authToken));
      }

      // console.log('Product Published!');
    }
  };

  const actionCompletedHandler = () => {
    setActionCompleted(null);
    history.go(0);
  };

  const activeStatusHandler = () => {
    console.log('actionParams: ', actionParams);
    const gtin = actionParams.gtin;
    const status = actionParams.action;
    const dateInactive =
      status === 'activate'
        ? new Date(0).toISOString()
        : new Date().toISOString();
    const existingProduct = catalog.find((item) => item.gtin === gtin);
    console.log('existingProduct: ', existingProduct);

    let url;

    const fetchData = (authToken) => {
      const update = async (authToken) => {
        try {
          console.log('activating product...');
          url = process.env.REACT_APP_BACKEND_URL + `/api/products/${gtin}`;

          const formData = new FormData();
          formData.append('name', existingProduct.name);
          formData.append('description', existingProduct.description);
          formData.append('gtin', existingProduct.gtin);
          formData.append('subscribers', existingProduct.subscribers);
          formData.append('dateInactive', dateInactive);

          await sendRequest(url, 'PATCH', formData, {
            Authorization: 'Bearer ' + authToken,
          });

          status === 'activate'
            ? cancelActivateHandler()
            : cancelDeactivateHandler();
          const action = status === 'activate' ? 'activated' : 'deactivated';
          setActionCompleted(action);
        } catch (err) {
          console.log(err);
        }
      };

      update(authToken);
      return { type: 'status_update', payload: null };
    };

    if (authToken && authUserId) {
      dispatch(fetchData(authToken));
    }
  };

  const deleteProductHandler = () => {
    const gtin = actionParams.gtin;
    const existingProduct = catalog.find((item) => item.gtin === gtin);
    console.log('existingProduct: ', existingProduct);

    let url;

    const fetchData = async () => {
      try {
        console.log('activating product...');
        url = process.env.REACT_APP_BACKEND_URL + `/api/products/${gtin}`;

        await sendRequest(
          url,
          'DELETE',
          {},
          {
            Authorization: 'Bearer ' + authToken,
          }
        );

        history.push('/products');
      } catch (err) {
        console.log(err);
      }
    };

    if (authToken && authUserId) {
      dispatch(fetchData(authUserId, authToken));
    }
    cancelDeleteHandler();
  };

  const cancelHandler = () => {
    const { action } = actionParams;
    if (action === 'activate') cancelActivateHandler();
    if (action === 'deactivate') cancelDeactivateHandler();
    if (action === 'publish') cancelPublishHandler();
    if (action === 'delete') cancelDeleteHandler();
  };

  const cancelSubHandler = (event) => {
    event.preventDefault();
    setSelectSubscriber(null);
    setShowChooseSubscriber(false);
  };

  const confirmActivateFooter = useConfirmModalFooter(
    activeStatusHandler,
    cancelHandler,
    'Activate',
    'Cancel'
  );
  const confirmDeactivateFooter = useConfirmModalFooter(
    activeStatusHandler,
    cancelHandler,
    'Deactivate',
    'Cancel'
  );
  const confirmPublishFooter = useConfirmModalFooter(
    publishProductHandler,
    cancelHandler,
    'Publish',
    'Cancel'
  );
  const confirmDeleteFooter = useConfirmModalFooter(
    deleteProductHandler,
    cancelHandler,
    'Delete',
    'Cancel'
  );

  const selectSubscriberForm = (
    <div className={classes.subscribers}>
      <form onSubmit={showConfirmPublishHandler}>
        <div className={classes['form-container']}>
          <FormInput
            id="subscriber"
            element="select"
            selectOptions={customerList}
            label="Subscribers"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please select a subscriber"
            initialValid={false}
            onInput={inputHandler}
            setSelectOption={setSelectSubscriber}
          />
          <div className={classes.buttons}>
            <div>
              <Button inverse onClick={cancelSubHandler}>
                Cancel
              </Button>
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <Button
                inverse
                type="submit"
                disabled={!formState.isValid || alreadySubbed}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div>{alreadySubbed && <p>Product already published to Customer</p>}</div>
    </div>
  );

  return (
    <React.Fragment>
      <input
        className={classes.search}
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={'Search name'}
      />

      {isSubmitting && <LoadingSpinner />}

      <Modal
        // show={actionCompleted === null || !actionCompleted ? false : true}
        show={actionCompleted}
        onClear={actionCompletedHandler}
        msgHeader={`Success!`}
      >
        <p>Product has been {actionCompleted}</p>
      </Modal>

      <Modal
        show={showChooseSubscriber}
        onClear={cancelSubscriberHandler}
        msgHeader={`Choose Subscriber to receive Publication`}
      >
        <p>
          <strong>{`Item: `}</strong>
          {actionParams && actionParams.itemName}
        </p>
        <p>
          <strong>{`GTIN: `}</strong>
          {actionParams && actionParams.gtin}
        </p>
        <div>{selectSubscriberForm}</div>
      </Modal>

      <Modal
        show={showConfirmPublish}
        onClear={cancelPublishHandler}
        msgHeader="Confirm Product Publication"
        footer={confirmPublishFooter}
      >
        <p>Are you sure you want to publish this product?</p>
        <br />
        <p>
          <strong>{`Item: `}</strong>
          {actionParams && actionParams.itemName}
        </p>
        <p>
          <strong>{`GTIN: `}</strong>
          {actionParams && actionParams.gtin}
        </p>
        <p>
          <strong>{`Customer: `}</strong>
          {customerName && customerName}
        </p>
        <p>
          <strong>{`Customer ID: `}</strong>
          {selectSubscriber && selectSubscriber.subscriber}
        </p>
      </Modal>

      <Modal
        show={showConfirmActivate}
        onClear={cancelActivateHandler}
        msgHeader="Confirm Product Activation"
        footer={confirmActivateFooter}
      >
        <p>Are you sure you want to Activate this product?</p>
        <p>
          <strong>{`Item: `}</strong>
          {actionParams && actionParams.itemName}
        </p>
        <p>
          <strong>{`GTIN: `}</strong>
          {actionParams && actionParams.gtin}
        </p>
      </Modal>

      <Modal
        show={showConfirmDeactivate}
        onClear={cancelDeactivateHandler}
        msgHeader="Confirm Product Deactivation"
        footer={confirmDeactivateFooter}
      >
        <p>Are you sure you want to deactivate this product?</p>
        <p>
          <strong>{`Item: `}</strong>
          {actionParams && actionParams.itemName}
        </p>
        <p>
          <strong>{`GTIN: `}</strong>
          {actionParams && actionParams.gtin}
        </p>
      </Modal>

      <Modal
        show={showConfirmDelete}
        onClear={cancelDeleteHandler}
        msgHeader="Confirm Product Deletion"
        footer={confirmDeleteFooter}
      >
        <p>Are you sure you want to PERMANENTLY DELETE this product?</p>
        <p>
          <strong>{`Item: `}</strong>
          {actionParams && actionParams.itemName}
        </p>
        <p>
          <strong>{`GTIN: `}</strong>
          {actionParams && actionParams.gtin}
        </p>
      </Modal>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => {
            if (i === 0) {
              return null;
            } else {
              return (
                <tr
                  key={i}
                  className={classes.headers}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      key={i}
                      className={classes.header}
                      {...column.getHeaderProps(column.getSortByToggleProps(), {
                        style: {
                          width: column.width,
                        },
                      })}
                    >
                      <div className={classes.arrow}>
                        {column.render('Header')}
                        <ion-icon
                          size="small"
                          src={
                            column.isSorted
                              ? column.isSortedDesc
                                ? '/icons/caret-down-outline.svg'
                                : '/icons/caret-up-outline.svg'
                              : ''
                          }
                        ></ion-icon>
                      </div>
                    </th>
                  ))}
                </tr>
              );
            }
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            // only render items on the current page
            if (
              rowIndex >= pageSize * pageIndex &&
              rowIndex + 1 <= pageSize * (pageIndex + 1)
            ) {
              // This line is necessary to prepare the rows and get the row props from react-table dynamically
              prepareRow(row);

              return (
                <tr
                  key={rowIndex}
                  className={classes.row}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell, i) => {
                    let type = {};
                    let category = {};

                    if (cell.column.Header === 'Type') {
                      type = typeOptions.filter(
                        (type) => type.id === +cell.value
                      )[0];
                    }
                    if (cell.column.Header === 'Category') {
                      category = categoryOptions.filter(
                        (category) => category.id === +cell.value
                      )[0];
                    }

                    if (cell.column.accessor) {
                      return (
                        <td
                          key={i}
                          {...cell.getCellProps({
                            style: {
                              width: cell.column.width,
                            },
                          })}
                        >
                          {cell.column.Header === 'Image' && (
                            <div className={classes.thumbnail}>
                              <img
                                // src={`${process.env.REACT_APP_BACKEND_URL}/${cell.value}`}
                                src={cell.value}
                                alt={cell.value}
                              />
                            </div>
                          )}
                          {cell.column.Header === 'GTIN' && (
                            <Link to={`/products/${cell.value}`}>
                              {cell.value}
                            </Link>
                          )}
                          {cell.column.Header === 'Type' && type.name}
                          {cell.column.Header === 'Category' && category.name}
                          {cell.column.Header !== 'Image' &&
                            cell.column.Header !== 'Type' &&
                            cell.column.Header !== 'Category' &&
                            cell.column.Header !== 'GTIN' &&
                            cell.render('Cell')}
                        </td>
                      );
                    } else if (cell.column.Header === 'Index') {
                      return <td key={i}>{rowIndex + 1}</td>;
                    } else {
                      return (
                        <td key={i}>
                          <div className={classes.buttons}>
                            {status !== 'inactive' && (
                              <>
                                <Button
                                  to={`/products/${cell.row.original.gtin}`}
                                  action
                                >
                                  <span title="edit">
                                    <ion-icon
                                      size="small"
                                      src="/icons/build-outline.svg"
                                    ></ion-icon>
                                  </span>
                                </Button>
                                <Button
                                  onClick={() => {
                                    productActionHandler(
                                      cell.row.original.gtin,
                                      'publish'
                                    );
                                  }}
                                  action
                                >
                                  <span title="publish">
                                    <ion-icon
                                      size="small"
                                      src="/icons/exit-outline.svg"
                                    ></ion-icon>
                                  </span>
                                </Button>
                                <Button
                                  onClick={() => {
                                    productActionHandler(
                                      cell.row.original.gtin,
                                      'deactivate'
                                    );
                                  }}
                                  action
                                >
                                  <span title="deactivate">
                                    <ion-icon
                                      size="small"
                                      src="/icons/stop-circle-outline.svg"
                                    ></ion-icon>
                                  </span>
                                </Button>
                              </>
                            )}
                            {status === 'inactive' && (
                              <>
                                <Button
                                  onClick={() => {
                                    productActionHandler(
                                      cell.row.original.gtin,
                                      'activate'
                                    );
                                  }}
                                  action
                                >
                                  <span title="reactivate">
                                    <ion-icon
                                      size="small"
                                      src="/icons/play-circle-outline.svg"
                                    ></ion-icon>
                                  </span>
                                </Button>
                                <Button
                                  onClick={() => {
                                    productActionHandler(
                                      cell.row.original.gtin,
                                      'delete'
                                    );
                                  }}
                                  action
                                >
                                  <span title="permanent delete">
                                    <ion-icon
                                      size="small"
                                      src="/icons/trash-outline.svg"
                                    ></ion-icon>
                                  </span>
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </React.Fragment>
  );
};

export default ProductsTable;
