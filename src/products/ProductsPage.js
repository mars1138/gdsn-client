import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Section from '../shared/components/layout/Section';
import Hero from '../shared/components/layout/Hero';
import Card from '../shared/UIElements/Card';
import TabComponent from '../shared/components/TabComponent/TabComponent';
import Button from '../shared/UIElements/Button';
import { useHttpClient } from '../shared/hooks/http-hook';
import { fetchCatalog } from '../store/catalog-functions';
import { productsHero as heroData } from '../assets/data/heroData';
import { productsTabs } from '../assets/data/tabData';
import classes from './ProductsPage.module.css';

const ProductsPage = () => {
  const catalog = useSelector((state) => state.catalog.products);
  const activeCount = catalog.filter((item) => !item.dateInactive).length;
  const publishedCount = catalog.filter((item) => item.datePublished).length;
  const unpublishedCount = catalog.filter(
    (item) => !item.dateInactive && !item.datePublished
  ).length;
  const inactiveCount = catalog.filter((item) => item.dateInactive).length;

  const authToken = useSelector((state) => state.auth.token);
  const authUserId = useSelector((state) => state.auth.userId);

  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken && authUserId) {
      dispatch(fetchCatalog(authUserId, authToken));
    }
  }, [authUserId, authToken, dispatch, sendRequest]);

  const { title, text } = heroData;

  return (
    <React.Fragment>
      <Section>
        <Hero type="right" page="products" title={title} text={text} />
      </Section>
      <Section>
        <h2>Total Products: {catalog.length}</h2>
        <div className={classes.productCards}>
          <Link to="/products/active">
            <Card>
              <h3>Active</h3>
              <span>{activeCount}</span>
            </Card>
          </Link>
          <Link to="/products/published">
            <Card>
              <h3>Published</h3>
              <span>{publishedCount}</span>
            </Card>
          </Link>
          <Link to="/products/unpublished">
            <Card>
              <h3>Unpublished</h3>
              <span>{unpublishedCount}</span>
            </Card>
          </Link>
          <Link to="/products/inactive">
            <Card>
              <h3>Inactive</h3>
              <span>{inactiveCount}</span>
            </Card>
          </Link>
        </div>
      </Section>
      <Section>
        <div className={classes.text}>
          <p>
            Please see the tabbed component below for a description of each
            category of products on your catalog. Click on Add New Item to
            create a new catalog product.
          </p>
          <div className={classes.addItem}>
            <Button to="/products/add">Add New Item</Button>
          </div>
        </div>
        <TabComponent>{productsTabs}</TabComponent>
      </Section>
    </React.Fragment>
  );
};

export default ProductsPage;
