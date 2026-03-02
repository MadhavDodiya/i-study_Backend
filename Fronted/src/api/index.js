import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const fetchUsers = () => API.get('/admin/users');
export const updateUser = (id, updatedUser) => API.put(`/admin/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
