import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import HomePage from './home/HomePage';
import ServicesPage from './services/ServicesPage';
import ResourcesPage from './resources/ResourcesPage';
import PlansPage from './plans/PlansPage';
import ProductsPage from './products/ProductsPage';
import AboutPage from './about/AboutPage';
import MainHeader from './shared/Navigation/MainHeader';
import Footer from './shared/components/footer/Footer';

function App() {
  useEffect(() => {}, []);

  const routes = (
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
      <Route path="/resources">
        <ResourcesPage />
      </Route>
      <Route path="/plans">
        <PlansPage />
      </Route>
      <Route path="/products">
        <ProductsPage />
      </Route>
      <Route path="/about">
        <AboutPage />
      </Route>
    </Switch>
  );

  return (
    <Router>
      <MainHeader />
      <main>{routes}</main>
      <Footer />
    </Router>
  );
}

export default App;
