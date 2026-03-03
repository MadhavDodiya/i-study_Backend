import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const initialForm = {
  title: '',
  desc: '',
  category: '',
  level: 'Beginner',
  language: 'English',
  instructor: '',
  price: '$0',
  priceValue: 0,
  lessons: 0,
  students: 0,
  hours: 0,
  rating: 0,
};

const CourseManagement = () => {
  const rawApiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const API_BASE = rawApiBase.replace(/\/+$/, '').replace(/\/api$/i, '');

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [form, setForm] = useState(initialForm);

  const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    };
  };

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_BASE}/api/admin/courses`, getAuthConfig());
      setCourses(response.data.courses || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!imageFile) {
      setError('Please select a course image');
      return;
    }

    try {
      setSubmitting(true);
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        payload.append(key, String(value));
      });
      payload.append('image', imageFile);

      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/api/courses`, payload, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      setSuccess('Course created successfully with image.');
      setForm(initialForm);
      setImageFile(null);
      await fetchCourses();
    } catch (err) {
      const apiErrors = err.response?.data?.errors;
      if (Array.isArray(apiErrors) && apiErrors.length > 0) {
        setError(apiErrors.join(', '));
      } else {
        setError(err.response?.data?.message || 'Failed to create course');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const resolveImage = (imageKey) => {
    if (typeof imageKey !== 'string' || !imageKey.trim()) return '';
    const raw = imageKey.trim();
    if (/^https?:\/\//i.test(raw)) return raw;
    if (/^\/?uploads\//i.test(raw)) return `${API_BASE}/${raw.replace(/^\/+/, '')}`;
    return '';
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
      <h2 style={{ margin: 0, marginBottom: 14 }}>Course Management</h2>

      {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
      {success && <p style={{ color: '#166534' }}>{success}</p>}

      <form
        onSubmit={handleCreateCourse}
        style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 14, marginBottom: 18 }}
      >
        <h3 style={{ margin: 0, marginBottom: 12, fontSize: 16 }}>Add Course (with Image)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
          <input required placeholder="Title" value={form.title} onChange={(e) => handleChange('title', e.target.value)} />
          <input required placeholder="Category" value={form.category} onChange={(e) => handleChange('category', e.target.value)} />
          <input required placeholder="Instructor" value={form.instructor} onChange={(e) => handleChange('instructor', e.target.value)} />
          <input required placeholder="Language" value={form.language} onChange={(e) => handleChange('language', e.target.value)} />
          <select value={form.level} onChange={(e) => handleChange('level', e.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <input placeholder="Price Label ($120)" value={form.price} onChange={(e) => handleChange('price', e.target.value)} />
          <input type="number" min="0" placeholder="Price Value" value={form.priceValue} onChange={(e) => handleChange('priceValue', e.target.value)} />
          <input type="number" min="0" placeholder="Lessons" value={form.lessons} onChange={(e) => handleChange('lessons', e.target.value)} />
          <input type="number" min="0" placeholder="Students" value={form.students} onChange={(e) => handleChange('students', e.target.value)} />
          <input type="number" min="0" placeholder="Hours" value={form.hours} onChange={(e) => handleChange('hours', e.target.value)} />
          <input type="number" min="0" max="5" step="0.1" placeholder="Rating (0-5)" value={form.rating} onChange={(e) => handleChange('rating', e.target.value)} />
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        </div>
        <textarea
          required
          placeholder="Description"
          value={form.desc}
          onChange={(e) => handleChange('desc', e.target.value)}
          style={{ marginTop: 10, width: '100%', minHeight: 80 }}
        />
        <button
          type="submit"
          disabled={submitting}
          style={{ marginTop: 10, border: 'none', background: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: 6 }}
        >
          {submitting ? 'Creating...' : 'Create Course'}
        </button>
      </form>

      <h3 style={{ margin: 0, marginBottom: 10, fontSize: 16 }}>Courses ({courses.length})</h3>
      {loading && <p>Loading courses...</p>}
      {!loading && courses.length === 0 && <p>No courses found.</p>}
      {!loading && courses.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Image</th>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Title</th>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Category</th>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Level</th>
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px 8px' }}>
                    {resolveImage(course.imageKey) ? (
                      <img src={resolveImage(course.imageKey)} alt={course.title} style={{ width: 52, height: 36, objectFit: 'cover', borderRadius: 6 }} />
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: 12 }}>n/a</span>
                    )}
                  </td>
                  <td style={{ padding: '10px 8px' }}>{course.title}</td>
                  <td style={{ padding: '10px 8px' }}>{course.category || '-'}</td>
                  <td style={{ padding: '10px 8px' }}>{course.level || '-'}</td>
                  <td style={{ padding: '10px 8px' }}>{course.price || '$0'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
