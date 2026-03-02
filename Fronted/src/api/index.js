import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    // ✅ FIXED: Check both possible token keys
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// ✅ FIXED: Changed endpoint to /admin/users
export const fetchUsers = () => API.get('/admin/users');
export const createUser = (userData) => API.post('/admin/users', userData);
export const updateUser = (id, updatedUser) => API.put(`/admin/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);