import logo from '../../assets/GP-logo.png';
import classes from './Logo.module.css';

const Logo = () => {
  return (
    <div className={classes.logo}>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Logo;
