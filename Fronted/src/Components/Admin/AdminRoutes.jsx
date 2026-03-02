import React from 'react';
import AdminLayout from './AdminLayout';
import { Outlet } from 'react-router-dom';

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminRoutes;