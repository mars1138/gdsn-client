import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '../UIElements/Button';
import NavMenuItems from './NavMenuItems';
import { navMenuData, navMenuDataLoggedOut } from './navMenuData';

import { authActions } from '../../store/auth-slice';
import classes from './NavLinks.module.css';

const NavLinks = () => {
  const menuLinks = [];
  // const isAuth = false;
  //   const isAuth = true;
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const history = useHistory();

  const setMenu = (menuData) => {
    menuData.forEach((menu, index) => {
      const depthLevel = 0;
      menuLinks.push(
        <NavMenuItems items={menu} key={index} depthLevel={depthLevel} />
      );
    });
  };

  const logoutHandler = (event) => {
    dispatch(authActions.logout());
    history.push('/auth');
  };

  setMenu(isAuth ? navMenuData : navMenuDataLoggedOut);

  return (
    <React.Fragment>
      <nav className={classes['nav-container']}>
        <ul className={classes['nav-links']}>{menuLinks}</ul>
        <div className={classes.button}>
          {!isAuth && <Button to="/auth">Login</Button>}
          {isAuth && (
            <Button onClick={logoutHandler} inverse>
              Logout
            </Button>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavLinks;
