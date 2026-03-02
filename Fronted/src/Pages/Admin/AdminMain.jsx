import React, { useState } from 'react';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import OrderManagement from './OrderManagement';
import CourseManagement from './CourseManagement';

const AdminMain = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'courses', label: 'Courses', icon: '📚' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'courses':
        return <CourseManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      {/* ✅ Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        borderBottom: '2px solid #e2e8f0',
        overflowX: 'auto',
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 20px',
              background: activeTab === tab.id ? '#667eea' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#64748b',
              border: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === tab.id ? '3px solid #667eea' : 'none',
              fontWeight: activeTab === tab.id ? '600' : '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ✅ Content Area */}
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminMain;