import React, { useContext } from 'react';
import { appContext } from '../context/context';

const Alert = () => {
  const { alertType, alertText } = useContext(appContext);
  console.log(alertText);
  return <div className={`alert alert-${alertType} text-center`}> {alertText} </div>;
};

export default Alert;
