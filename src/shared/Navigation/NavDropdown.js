import NavMenuItems from './NavMenuItems';
import classes from './NavDropdown.module.css';

const NavDropdown = (props) => {
  const submenus = props.submenus;
  const dropdown = props.dropdown;
  const depthLevel = props.depthLevel + 1;

  const dropdownClass = `${depthLevel > 1 ? classes.submenu : ''} ${
    dropdown ? classes.show : ''
  }`;

  return (
    <ul className={`${classes.dropdown} ${dropdownClass}`}>
      {submenus.map((submenu, index) => (
        <NavMenuItems depthLevel={depthLevel} items={submenu} key={index} />
      ))}
    </ul>
  );
};

export default NavDropdown;
