import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTable, useFilters, useSortBy, usePagination } from 'react-table';

import Button from '../shared/UIElements/Button';
import Modal from '../shared/UIElements/Modal';
import LoadingSpinner from '../shared/UIElements/LoadingSpinner';
import { useForm } from '../shared/hooks/form-hook';
import FormInput from '../shared/components/FormElements/FormInput';

const ProductsTable = (props) => {
  //

  return (
    <div>
      <h2>Products Table</h2>
    </div>
  );
};

export default ProductsTable;
