import React from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'#f0f2f7' }}>
      <AdminSidebar />
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, overflow:'hidden' }}>
        <AdminHeader />
        <main style={{ flex:1, overflowY:'auto', overflowX:'hidden', padding:'28px 28px' }}>
          <div style={{ maxWidth:1200, margin:'0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;