import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const formatCurrency = (value) => `$${Number(value || 0).toFixed(2)}`;

const statusColor = (status) => {
  if (status === 'paid') return { bg: '#dcfce7', text: '#166534' };
  if (status === 'cancelled') return { bg: '#fee2e2', text: '#991b1b' };
  return { bg: '#fef3c7', text: '#92400e' };
};

const OrderManagement = () => {
  const rawApiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const API_BASE = rawApiBase.replace(/\/+$/, '').replace(/\/api$/i, '');

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statusDrafts, setStatusDrafts] = useState({});
  const [savingOrderId, setSavingOrderId] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState('');

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    };
  };

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_BASE}/api/admin/orders`, getAuthConfig());
      const list = response.data.orders || [];
      setOrders(list);

      const drafts = {};
      list.forEach((order) => {
        drafts[order._id] = order.status || 'placed';
      });
      setStatusDrafts(drafts);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load checkout orders');
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const totals = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        acc.count += 1;
        acc.revenue += Number(order.total || 0);
        if (order.status === 'placed') acc.placed += 1;
        if (order.status === 'paid') acc.paid += 1;
        if (order.status === 'cancelled') acc.cancelled += 1;
        return acc;
      },
      { count: 0, revenue: 0, placed: 0, paid: 0, cancelled: 0 }
    );
  }, [orders]);

  const handleStatusSave = async (orderId) => {
    const nextStatus = statusDrafts[orderId];
    setSavingOrderId(orderId);
    setError('');
    setSuccess('');

    try {
      const response = await axios.patch(
        `${API_BASE}/api/admin/orders/${orderId}/status`,
        { status: nextStatus },
        getAuthConfig()
      );

      if (response.data.success) {
        setSuccess('Checkout status updated successfully.');
        setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: nextStatus } : o)));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update checkout status');
    } finally {
      setSavingOrderId('');
    }
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
      <h2 style={{ margin: 0, marginBottom: 12 }}>Checkout Management</h2>
      <p style={{ margin: 0, marginBottom: 16, color: '#64748b', fontSize: 13 }}>
        Manage customer checkout orders, billing details, and payment status.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 8, marginBottom: 14 }}>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 10 }}><b>{totals.count}</b><p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Orders</p></div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 10 }}><b>{totals.placed}</b><p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Placed</p></div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 10 }}><b>{totals.paid}</b><p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Paid</p></div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 10 }}><b>{totals.cancelled}</b><p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Cancelled</p></div>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 10 }}><b>{formatCurrency(totals.revenue)}</b><p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>Revenue</p></div>
      </div>

      {loading && <p>Loading checkout orders...</p>}
      {!loading && error && <p style={{ color: '#b91c1c' }}>{error}</p>}
      {!loading && success && <p style={{ color: '#166534' }}>{success}</p>}
      {!loading && !error && orders.length === 0 && <p>No checkout orders found.</p>}

      {!loading && !error && orders.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Order ID</th>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Customer</th>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Amount</th>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Checkout Status</th>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const chip = statusColor(order.status);
                const isExpanded = expandedOrderId === order._id;
                return (
                  <React.Fragment key={order._id}>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 8px' }}>{order._id}</td>
                      <td style={{ padding: '10px 8px' }}>
                        <div>{order.userId?.name || '-'}</div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>{order.userId?.email || order.billing?.email || '-'}</div>
                      </td>
                      <td style={{ padding: '10px 8px' }}>{formatCurrency(order.total)}</td>
                      <td style={{ padding: '10px 8px' }}>
                        <span style={{ background: chip.bg, color: chip.text, padding: '4px 8px', borderRadius: 999, fontSize: 12, fontWeight: 600 }}>
                          {order.status || 'placed'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 8px' }}>{order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}</td>
                      <td style={{ padding: '10px 8px' }}>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <select
                            value={statusDrafts[order._id] || 'placed'}
                            onChange={(e) => setStatusDrafts((prev) => ({ ...prev, [order._id]: e.target.value }))}
                            style={{ padding: '6px 8px', border: '1px solid #cbd5e1', borderRadius: 6 }}
                          >
                            <option value="placed">placed</option>
                            <option value="paid">paid</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => handleStatusSave(order._id)}
                            disabled={savingOrderId === order._id}
                            style={{ padding: '6px 10px', border: 'none', borderRadius: 6, cursor: 'pointer', background: '#2563eb', color: '#fff' }}
                          >
                            {savingOrderId === order._id ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setExpandedOrderId(isExpanded ? '' : order._id)}
                            style={{ padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: 6, cursor: 'pointer', background: '#fff' }}
                          >
                            {isExpanded ? 'Hide Details' : 'View Details'}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <td colSpan={6} style={{ padding: 12 }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
                            <div>
                              <h4 style={{ margin: '0 0 8px', fontSize: 14 }}>Billing Details</h4>
                              <p style={{ margin: '4px 0', fontSize: 13 }}><b>Name:</b> {order.billing?.firstName || '-'} {order.billing?.lastName || ''}</p>
                              <p style={{ margin: '4px 0', fontSize: 13 }}><b>Email:</b> {order.billing?.email || '-'}</p>
                              <p style={{ margin: '4px 0', fontSize: 13 }}><b>Phone:</b> {order.billing?.phone || '-'}</p>
                              <p style={{ margin: '4px 0', fontSize: 13 }}><b>Address:</b> {order.billing?.address || '-'}, {order.billing?.city || '-'}, {order.billing?.country || '-'}</p>
                              <p style={{ margin: '4px 0', fontSize: 13 }}><b>Note:</b> {order.billing?.note || '-'}</p>
                            </div>
                            <div>
                              <h4 style={{ margin: '0 0 8px', fontSize: 14 }}>Checkout Items</h4>
                              {Array.isArray(order.items) && order.items.length > 0 ? (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                  <thead>
                                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                      <th style={{ textAlign: 'left', padding: '6px 4px', fontSize: 12 }}>Title</th>
                                      <th style={{ textAlign: 'left', padding: '6px 4px', fontSize: 12 }}>Qty</th>
                                      <th style={{ textAlign: 'left', padding: '6px 4px', fontSize: 12 }}>Unit</th>
                                      <th style={{ textAlign: 'left', padding: '6px 4px', fontSize: 12 }}>Line Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {order.items.map((item, idx) => (
                                      <tr key={`${order._id}-${idx}`} style={{ borderBottom: '1px solid #edf2f7' }}>
                                        <td style={{ padding: '6px 4px', fontSize: 13 }}>{item.title}</td>
                                        <td style={{ padding: '6px 4px', fontSize: 13 }}>{item.quantity}</td>
                                        <td style={{ padding: '6px 4px', fontSize: 13 }}>{formatCurrency(item.unitPrice)}</td>
                                        <td style={{ padding: '6px 4px', fontSize: 13 }}>{formatCurrency(item.lineTotal)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              ) : (
                                <p style={{ margin: 0, fontSize: 13 }}>No items found.</p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
