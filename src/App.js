import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import HomePage from './home/HomePage';
import ServicesPage from './services/ServicesPage';
import ResourcesPage from './resources/ResourcesPage';
import Webinars from './resources/Webinars';
import Training from './resources/Training';
import Support from './resources/Support';
import PlansPage from './plans/PlansPage';
import ProductsPage from './products/ProductsPage';
import ProductsList from './products/ProductsList';
import AddProduct from './products/AddProduct';
import UpdateProduct from './products/UpdateProduct';
import AboutPage from './about/AboutPage';
import MainHeader from './shared/Navigation/MainHeader';
import Footer from './shared/components/footer/Footer';
import Auth from './user/Auth';
import ScrollToTop from './shared/utilities/ScrollToTop';
// import { useHttpClient } from './shared/hooks/http-hook';
import { authActions } from './store/auth-slice';
import { fetchCatalog } from './store/catalog-functions';

let logoutTimer;

function App() {
  // const isAuth = false;
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const authUserId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);
  const authExpire = useSelector((state) => state.auth.expireDate);

  const dispatch = useDispatch();
  // const { sendRequest } = useHttpClient();

  let routes;

  // set auto logout timer according expire date/time
  useEffect(() => {
    if (authToken !== null && authExpire !== null) {
      const remainingTime = authExpire - new Date().getTime();

      logoutTimer = setTimeout(() => {
        dispatch(authActions.logout());
      }, remainingTime);

      dispatch(fetchCatalog(authUserId, authToken));
    } else {
      clearTimeout(logoutTimer);
    }
  }, [authUserId, authExpire, authToken, dispatch]);

  // login user if user data in local storage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userData'));

    if (
      storedUser &&
      storedUser.token &&
      storedUser.expireDate &&
      new Date(storedUser.expireDate) > new Date(1671223612525)
    ) {
      dispatch(
        authActions.login({
          user: storedUser.userId,
          token: storedUser.token,
          expireDate: storedUser.expireDate,
        })
      );
    } else {
      localStorage.removeItem('userData');
    }
  }, [dispatch]);

  if (isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/products" exact>
          <ProductsPage />
        </Route>
        <Route path="/products/active">
          <ProductsList status="active" />
        </Route>
        <Route path="/products/published">
          <ProductsList status="published" />
        </Route>
        <Route path="/products/unpublished">
          <ProductsList status="unpublished" />
        </Route>
        <Route path="/products/inactive">
          <ProductsList status="inactive" />
        </Route>
        <Route path="/products/add">
          {/* <ProductsPage /> */}
          <AddProduct />
        </Route>
        <Route path="/products/:pid">
          {/* <ProductsPage /> */}
          <UpdateProduct />
        </Route>
        <Route path="/services">
          <ServicesPage />
        </Route>
        <Route path="/resources" exact>
          <ResourcesPage />
        </Route>
        <Route path="/resources/webinars">
          <Webinars />
        </Route>
        <Route path="/resources/training">
          <Training />
        </Route>
        <Route path="/resources/support">
          <Support />
        </Route>
        <Route path="/plans">
          <PlansPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Redirect to="/products" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/services">
          <ServicesPage />
        </Route>
        <Route path="/resources" exact>
          <ResourcesPage />
        </Route>
        <Route path="/resources/webinars">
          <Webinars />
        </Route>
        <Route path="/resources/training">
          <Training />
        </Route>
        <Route path="/resources/support">
          <Support />
        </Route>
        <Route path="/plans">
          <PlansPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <Router>
      <MainHeader />
      <main>
        <ScrollToTop>{routes}</ScrollToTop>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
