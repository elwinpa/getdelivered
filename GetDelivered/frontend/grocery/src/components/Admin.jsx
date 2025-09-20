import React from 'react';
import AdminProductList from './AdminProductList';

const Admin = ({ onClose }) => {
  return (

    <div className="">
        <h2 className="admin-portal">Admin Portal</h2>
        <AdminProductList/>
    </div>
  );
};

export default Admin;
