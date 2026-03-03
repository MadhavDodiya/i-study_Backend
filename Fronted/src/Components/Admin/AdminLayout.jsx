import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminLogin from './AdminLogin';

const AdminLayout = ({ children }) => {
  const rawApiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const API_BASE = rawApiBase.replace(/\/+$/, '').replace(/\/api$/i, '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [authError, setAuthError] = useState('');

  // ✅ Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
          const response = await fetch(`${API_BASE}/api/auth/me`, {
            credentials: 'include',
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error('Session expired');
          }

          const payload = await response.json();
          if (!payload?.user?.isAdmin) {
            throw new Error('Only admins can access this panel');
          }

          setUser(payload.user);
          setIsAuthenticated(true);
          setAuthError('');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthError(error.message || 'Please login with an admin account');
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API_BASE]);

  const handleLoginSuccess = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/api/auth/me`, {
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Login validation failed');
      }

      const payload = await response.json();
      if (!payload?.user?.isAdmin) {
        throw new Error('Only admins can access this panel');
      }

      setIsAuthenticated(true);
      setUser(payload.user);
      setAuthError('');
      localStorage.setItem('user', JSON.stringify(payload.user));
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
      setAuthError(error.message || 'Please login with an admin account');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setAuthError('');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Show loading spinner
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
            animation: 'spin 2s linear infinite',
          }}>⚙️</div>
          <p style={{ color: '#64748b', fontSize: '16px' }}>Loading admin panel...</p>
        </div>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // ✅ Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} initialError={authError} />;
  }

  // ✅ Show admin dashboard if authenticated
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: "'DM Sans', sans-serif" }}>
      {/* ✅ Sidebar */}
      <div 
        style={{
          width: '260px',
          borderRight: '1px solid #e2e8f0',
          background: '#1e293b',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          overflowY: 'auto',
          display: window.innerWidth > 768 ? 'block' : isMobileOpen ? 'block' : 'none',
          zIndex: 1000,
        }}
      >
        <AdminSidebar />
      </div>

      {/* ✅ Main Content */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader 
          onMenuClick={() => setIsMobileOpen(!isMobileOpen)}
          onLogout={handleLogout}
          user={user}
        />
        
        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '28px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
