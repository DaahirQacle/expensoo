import React from 'react';
import DashboardApp from './DashboardApp';
import EcommerceShop from './Products';
import Register from './Register';
import User from './User';

const SharedLayouts = () => {
  return (
    <div>
      <DashboardApp />
      <Register />
      <EcommerceShop />
      <User />
    </div>
  );
};

export default SharedLayouts;
