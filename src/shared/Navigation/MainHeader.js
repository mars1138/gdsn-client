import React from 'react';
import { Link } from 'react-router-dom';

import NavLinks from './NavLinks';
import Logo from './Logo';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <div>
          <Logo />
        </div>
        <h1>
          <Link to="/">GDSN-Plus</Link>
        </h1>
        <nav>
          <NavLinks />
        </nav>
      </header>
    </React.Fragment>
  );
};

export default MainHeader;
