import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h1 style={{ margin: 0, marginBottom: 6, fontSize: 26, fontWeight: 800, color: '#0f172a' }}>Dashboard</h1>
        <p style={{ margin: 0, color: '#64748b', fontSize: 14 }}>Live admin data from MongoDB</p>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: 12 }}>Total Users</p>
              <p style={{ margin: '6px 0 0', fontSize: 24, fontWeight: 700 }}>{summary.totalUsers}</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: 12 }}>Active Courses</p>
              <p style={{ margin: '6px 0 0', fontSize: 24, fontWeight: 700 }}>{summary.activeCourses}</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: 12 }}>Total Orders</p>
              <p style={{ margin: '6px 0 0', fontSize: 24, fontWeight: 700 }}>{summary.totalOrders}</p>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 14 }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: 12 }}>Revenue</p>
              <p style={{ margin: '6px 0 0', fontSize: 24, fontWeight: 700 }}>{formatCurrency(summary.totalRevenue)}</p>
            </div>
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
                      <th style={{ textAlign: 'left', padding: '10px 8px' }}>Order ID</th>
                      <th style={{ textAlign: 'left', padding: '10px 8px' }}>User</th>
                      <th style={{ textAlign: 'left', padding: '10px 8px' }}>Status</th>
                      <th style={{ textAlign: 'left', padding: '10px 8px' }}>Total</th>
                      <th style={{ textAlign: 'left', padding: '10px 8px' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '10px 8px' }}>{order._id}</td>
                        <td style={{ padding: '10px 8px' }}>{order.userId?.email || order.userId?.name || '-'}</td>
                        <td style={{ padding: '10px 8px' }}>{order.status || '-'}</td>
                        <td style={{ padding: '10px 8px' }}>{formatCurrency(order.total)}</td>
                        <td style={{ padding: '10px 8px' }}>{order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}</td>
                      </tr>
                    ))}
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
