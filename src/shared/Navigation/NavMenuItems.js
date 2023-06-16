import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import NavDropdown from './NavDropdown';
import classes from './NavMenuItems.module.css';

const NavMenuItems = (props) => {
  const items = props.items;
  const depthLevel = props.depthLevel;

  const [dropdown, setDropdown] = useState(false);

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [dropdown]);

  const mouseEnterHandler = () => {
    window.innerWidth > 768 && setDropdown(true);
  };

  const mouseLeaveHandler = () => {
    window.innerWidth > 768 && setDropdown(false);
  };

  const closeDropdownHandler = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className={classes['menu-items']}
      ref={ref}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={closeDropdownHandler}
    >
      {items.url && items.submenu && (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {window.innerWidth < 960 && depthLevel === 0 ? (
              items.title
            ) : (
              <NavLink activeClassName={classes.active} to={items.url}>
                {items.title}
                {depthLevel > 0 && window.innerWidth < 960 ? null : depthLevel >
                    0 && window.innerWidth > 960 ? (
                  <span>&raquo;</span>
                ) : (
                  <span className={classes.arrow} />
                )}
              </NavLink>
            )}
          </button>
          <NavDropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      )}
      {!items.url && items.submenu && (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? 'true' : 'false'}
            onClick={() => setDropdown((prev) => !prev)}
          >
            {items.title}{' '}
            {depthLevel > 0 ? (
              <span>&raquo;</span>
            ) : (
              <span className={classes.arrow} />
            )}
          </button>
          <NavDropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      )}
      {items.url && !items.submenu && (
        <button>
          <NavLink activeClassName={classes.active} to={items.url}>
            {items.title}{' '}
          </NavLink>
        </button>
      )}
    </li>
  );
};

export default NavMenuItems;
