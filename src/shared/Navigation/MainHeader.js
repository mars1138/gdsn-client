import React from 'react';
import { Link } from 'react-router-dom';

import NavLinks from './NavLinks';
import Logo from './Logo';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <h1 className={classes['header-title']}>
          <Link to="/">GDSN-Plus</Link>
        </h1>
        <nav className={classes['header-nav']}>
          <NavLinks />
        </nav>
      </header>
    </React.Fragment>
  );
};

export default MainHeader;
