import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [isForbidden, setIsForbidden] = useState(false);

  const addSecurityNotification = (attemptedByEmail = '') => {
    try {
      const key = 'admin_notifications';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      const notice = {
        title: 'Blocked admin access attempt',
        desc: attemptedByEmail
          ? `${attemptedByEmail} tried to open admin panel`
          : 'A non-admin user tried to open admin panel',
        time: new Date().toISOString(),
        unread: true,
      };
      const merged = [notice, ...existing].slice(0, 20);
      localStorage.setItem(key, JSON.stringify(merged));
    } catch (error) {
      console.error('Unable to store admin notification:', error);
    }
  };

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
            addSecurityNotification(payload?.user?.email || '');
            setUser(payload?.user || null);
            setIsAuthenticated(false);
            setIsForbidden(true);
            setAuthError('Only admins can access this panel');
            return;
          }

          setUser(payload.user);
          setIsAuthenticated(true);
          setIsForbidden(false);
          setAuthError('');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthError(error.message || 'Please login with an admin account');
        setIsAuthenticated(false);
        setIsForbidden(false);
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
        addSecurityNotification(payload?.user?.email || '');
        setUser(payload?.user || null);
        setIsAuthenticated(false);
        setIsForbidden(true);
        setAuthError('Only admins can access this panel');
        return;
      }

      setIsAuthenticated(true);
      setUser(payload.user);
      setIsForbidden(false);
      setAuthError('');
      localStorage.setItem('user', JSON.stringify(payload.user));
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setIsForbidden(false);
      setUser(null);
      setAuthError(error.message || 'Please login with an admin account');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsForbidden(false);
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

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '48px',
              marginBottom: '16px',
              animation: 'spin 2s linear infinite',
            }}
          >
            ??
          </div>
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

  if (isForbidden) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 520,
            width: '100%',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            padding: 24,
            boxShadow: '0 10px 30px rgba(15,23,42,0.08)',
          }}
        >
          <h2 style={{ margin: '0 0 8px', color: '#0f172a' }}>Access Denied</h2>
          <p style={{ margin: 0, color: '#475569' }}>Only admin users can access this panel.</p>
          <div style={{ marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              to="/user/panel"
              style={{
                background: '#16a34a',
                color: '#fff',
                padding: '10px 14px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              Go to My Panel
            </Link>
            <Link
              to="/"
              style={{
                border: '1px solid #cbd5e1',
                color: '#334155',
                padding: '10px 14px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} initialError={authError} />;
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f8fafc',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
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

      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader onMenuClick={() => setIsMobileOpen(!isMobileOpen)} onLogout={handleLogout} user={user} />

        <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '28px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
