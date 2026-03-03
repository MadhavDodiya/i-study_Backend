import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const rawApiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const API_BASE = rawApiBase.replace(/\/+$/, '').replace(/\/api$/i, '');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
    isActive: true,
  });

  const [editingUserId, setEditingUserId] = useState('');
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    isAdmin: false,
    isActive: true,
  });

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    };
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_BASE}/api/admin/users`, getAuthConfig());
      setUsers(response.data.users || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isAdmin: formData.isAdmin,
        isActive: formData.isActive,
      };

      const response = await axios.post(`${API_BASE}/api/admin/users`, payload, getAuthConfig());

      if (response.data.success) {
        setSuccessMessage('User created successfully.');
        setFormData({ name: '', email: '', password: '', isAdmin: false, isActive: true });
        await fetchUsers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user) => {
    setEditingUserId(user._id);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      isAdmin: Boolean(user.isAdmin),
      isActive: user.isActive !== false,
    });
    setError('');
    setSuccessMessage('');
  };

  const cancelEdit = () => {
    setEditingUserId('');
    setEditForm({ name: '', email: '', isAdmin: false, isActive: true });
  };

  const handleUpdateUser = async (userId) => {
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.put(
        `${API_BASE}/api/admin/users/${userId}`,
        {
          name: editForm.name,
          email: editForm.email,
          isAdmin: editForm.isAdmin,
          isActive: editForm.isActive,
        },
        getAuthConfig()
      );

      if (response.data.success) {
        setSuccessMessage('User updated successfully.');
        cancelEdit();
        await fetchUsers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (userId) => {
    const ok = window.confirm('Are you sure you want to delete this user?');
    if (!ok) return;

    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.delete(`${API_BASE}/api/admin/users/${userId}`, getAuthConfig());
      if (response.data.success) {
        setSuccessMessage('User deleted successfully.');
        if (editingUserId === userId) {
          cancelEdit();
        }
        await fetchUsers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div>
      {error && (
        <div
          style={{
            background: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#991b1b',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '16px',
          }}
        >
          {error}
        </div>
      )}

      {successMessage && (
        <div
          style={{
            background: '#dcfce7',
            border: '1px solid #86efac',
            color: '#166534',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '16px',
          }}
        >
          {successMessage}
        </div>
      )}

      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '24px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h2>Create User</h2>
        <form
          onSubmit={handleCreateUser}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}
        >
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            minLength={6}
            style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
          />

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={formData.isAdmin}
              onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
            />
            Admin
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            Active
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#667eea',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600',
              gridColumn: '1 / -1',
            }}
          >
            {loading ? 'Saving...' : 'Create User'}
          </button>
        </form>
      </div>

      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h2>Users ({users.length})</h2>

        {loading && users.length === 0 ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Role</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const isEditing = editingUserId === user._id;
                  return (
                    <tr key={user._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '12px' }}>
                        {isEditing ? (
                          <input
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            style={{ padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: 4, width: '100%' }}
                          />
                        ) : (
                          user.name
                        )}
                      </td>

                      <td style={{ padding: '12px' }}>
                        {isEditing ? (
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            style={{ padding: '6px 10px', border: '1px solid #cbd5e1', borderRadius: 4, width: '100%' }}
                          />
                        ) : (
                          user.email
                        )}
                      </td>

                      <td style={{ padding: '12px' }}>
                        {isEditing ? (
                          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input
                              type="checkbox"
                              checked={editForm.isAdmin}
                              onChange={(e) => setEditForm({ ...editForm, isAdmin: e.target.checked })}
                            />
                            Admin
                          </label>
                        ) : user.isAdmin ? (
                          'Admin'
                        ) : (
                          'User'
                        )}
                      </td>

                      <td style={{ padding: '12px' }}>
                        {isEditing ? (
                          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input
                              type="checkbox"
                              checked={editForm.isActive}
                              onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                            />
                            Active
                          </label>
                        ) : user.isActive === false ? (
                          'Inactive'
                        ) : (
                          'Active'
                        )}
                      </td>

                      <td style={{ padding: '12px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleUpdateUser(user._id)}
                              style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' }}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={cancelEdit}
                              style={{ background: '#64748b', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => startEdit(user)}
                              style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(user._id)}
                              style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' }}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
