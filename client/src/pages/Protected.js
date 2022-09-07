import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { appContext } from '../context/context';

const Protected = ({ children }) => {
  const { theUser } = useContext(appContext);
  if (!theUser) {
    return <Navigate to="/register" />;
  }

  return <div>{children}</div>;
};

export default Protected;
