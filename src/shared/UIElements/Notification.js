import classes from './Notification.module.css';

const Notification = (props) => {
  let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = classes.error;
  }
  if (props.status === 'success') {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <div className={cssClasses}>
      <p>{props.message}</p>
      <span onClick={props.onClear}>&#10005;</span>
    </div>
  );
};

export default Notification;
