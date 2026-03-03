import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;
const getStatusTone = (status) => {
  if (status === 'paid') return { bg: '#dcfce7', color: '#166534' };
  if (status === 'cancelled') return { bg: '#fee2e2', color: '#991b1b' };
  return { bg: '#fef3c7', color: '#92400e' };
};

const Dashboard = () => {
  const rawApiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const API_BASE = rawApiBase.replace(/\/+$/, '').replace(/\/api$/i, '');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        const config = {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        };

        const [usersRes, coursesRes, ordersRes] = await Promise.all([
          axios.get(`${API_BASE}/api/admin/users`, config),
          axios.get(`${API_BASE}/api/admin/courses`, config),
          axios.get(`${API_BASE}/api/admin/orders`, config),
        ]);

        setUsers(usersRes.data.users || []);
        setCourses(coursesRes.data.courses || []);
        setOrders(ordersRes.data.orders || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_BASE]);

  const summary = useMemo(() => {
    const totalUsers = users.length;
    const activeCourses = courses.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

    return {
      totalUsers,
      activeCourses,
      totalOrders,
      totalRevenue,
    };
  }, [users, courses, orders]);

  const recentOrders = useMemo(() => orders.slice(0, 8), [orders]);

  const statCards = [
    { label: 'Total Users', value: summary.totalUsers, tone: 'linear-gradient(135deg,#1d4ed8,#3b82f6)' },
    { label: 'Active Courses', value: summary.activeCourses, tone: 'linear-gradient(135deg,#0f766e,#14b8a6)' },
    { label: 'Total Orders', value: summary.totalOrders, tone: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
    { label: 'Revenue', value: formatCurrency(summary.totalRevenue), tone: 'linear-gradient(135deg,#b45309,#f59e0b)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <style>{`
        .admin-table-row:hover { background: #f8fafc; }
        .admin-card { position: relative; overflow: hidden; }
        .admin-card::after {
          content: "";
          position: absolute;
          right: -32px;
          top: -32px;
          width: 110px;
          height: 110px;
          border-radius: 999px;
          background: rgba(255,255,255,0.18);
        }
      `}</style>

      <div
        style={{
          borderRadius: 14,
          padding: '16px 18px',
          background: 'linear-gradient(120deg,#0f172a,#1e293b)',
          color: '#e2e8f0',
          border: '1px solid rgba(148,163,184,0.25)',
        }}
      >
        <h1 style={{ margin: 0, marginBottom: 6, fontSize: 26, fontWeight: 800, color: '#f8fafc' }}>Dashboard</h1>
        <p style={{ margin: 0, color: '#cbd5e1', fontSize: 14 }}>Live admin data from MongoDB</p>
      </div>

      {loading && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
          Loading dashboard data...
        </div>
      )}

      {!loading && error && (
        <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#9f1239', borderRadius: 12, padding: 16 }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {statCards.map((card) => (
              <div
                key={card.label}
                className="admin-card"
                style={{
                  background: card.tone,
                  color: '#fff',
                  borderRadius: 12,
                  padding: 14,
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 22px rgba(15,23,42,0.14)',
                }}
              >
                <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.86)' }}>{card.label}</p>
                <p style={{ margin: '6px 0 0', fontSize: 26, fontWeight: 800, letterSpacing: '0.01em' }}>{card.value}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16 }}>
            <h2 style={{ margin: 0, marginBottom: 12, fontSize: 18 }}>Recent Orders</h2>
            {recentOrders.length === 0 ? (
              <p style={{ margin: 0, color: '#64748b' }}>No orders found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b', fontSize: 12 }}>Order ID</th>
                      <th style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b', fontSize: 12 }}>User</th>
                      <th style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b', fontSize: 12 }}>Status</th>
                      <th style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b', fontSize: 12 }}>Total</th>
                      <th style={{ textAlign: 'left', padding: '10px 8px', color: '#64748b', fontSize: 12 }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => {
                      const tone = getStatusTone(order.status);
                      return (
                      <tr key={order._id} className="admin-table-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 8px', fontFamily: 'monospace', fontSize: 12 }}>{order._id}</td>
                        <td style={{ padding: '10px 8px' }}>{order.userId?.email || order.userId?.name || '-'}</td>
                        <td style={{ padding: '10px 8px' }}>
                          <span
                            style={{
                              background: tone.bg,
                              color: tone.color,
                              borderRadius: 999,
                              padding: '3px 10px',
                              fontSize: 12,
                              fontWeight: 700,
                              textTransform: 'capitalize',
                            }}
                          >
                            {order.status || '-'}
                          </span>
                        </td>
                        <td style={{ padding: '10px 8px', fontWeight: 700 }}>{formatCurrency(order.total)}</td>
                        <td style={{ padding: '10px 8px', color: '#64748b', fontSize: 13 }}>
                          {order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}
                        </td>
                      </tr>
                    );})}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
