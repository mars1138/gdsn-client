import React from 'react';
import { useSelector } from 'react-redux';

import ProductsTable from './ProductsTable';
import TabComponent from '../shared/components/TabComponent/TabComponent';
import Section from '../shared/components/layout/Section';
import Card from '../shared/UIElements/Card';

import { productsTabs } from '../assets/data/tabData';
import { activeColumns, inactiveColumns } from '../assets/data/productsData';
import classes from './ProductsList.module.css';

const ProductsList = (props) => {
  const catalog = useSelector((state) => state.catalog.products);
  const productsList = [];

  const filterProducts = (product, filter) => {
    if (filter === 'inactive') {
      return product.dateInactive;
    }
    if (filter === 'active') {
      return !product.dateInactive;
    }
    if (filter === 'published') {
      return !product.dateInactive && product.datePublished;
    }

    if (filter === 'unpublished') {
      return (
        !product.dateInactive &&
        product.subscribers.length === 0 &&
        !product.datePublished
      );
    }
  };

  if (catalog) {
    catalog.forEach((item) => {
      if (filterProducts(item, props.status)) productsList.push(item);
    });

    productsList.sort((itemA, itemB) => itemA.gtin - itemB.gtin);
  }

  const noProducts = (
    <div className={classes['no-products']}>
      <Card width="30">
        <p>No Products To List</p>
      </Card>
    </div>
  );

  return (
    <React.Fragment>
      <Section>
        <h1 className={classes.header}>
          {`${props.status}`} Products {`(${productsList.length})`}
        </h1>
        {productsList.length > 0 && (
          <ProductsTable
            columns={
              props.status === 'inactive' ? inactiveColumns : activeColumns
            }
            data={productsList}
            status={props.status}
          />
        )}
        {productsList.length < 1 && noProducts}
      </Section>
      <Section>
        <TabComponent>{productsTabs}</TabComponent>
      </Section>
    </React.Fragment>
  );
};

export default ProductsList;
