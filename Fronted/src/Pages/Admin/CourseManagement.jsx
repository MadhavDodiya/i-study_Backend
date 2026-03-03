import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

const fieldInputStyle = { padding: '8px 10px', border: '1px solid #cbd5e1', borderRadius: 6 };
const fieldGroupStyle = { display: 'flex', flexDirection: 'column', gap: 6 };
const fieldLabelStyle = { fontSize: 12, fontWeight: 600, color: '#334155' };

const CourseManagement = () => {
  const rawApiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const API_BASE = rawApiBase.replace(/\/+$/, '').replace(/\/api$/i, '');

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [createForm, setCreateForm] = useState(initialForm);
  const [createImageFile, setCreateImageFile] = useState(null);
  const [creating, setCreating] = useState(false);

  const [editingCourseId, setEditingCourseId] = useState('');
  const [editForm, setEditForm] = useState(initialForm);
  const [editImageFile, setEditImageFile] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [deletingCourseId, setDeletingCourseId] = useState('');

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

  const resolveImage = (imageKey) => {
    if (typeof imageKey !== 'string' || !imageKey.trim()) return '';
    const raw = imageKey.trim();
    if (/^https?:\/\//i.test(raw)) return raw;
    if (/^\/?uploads\//i.test(raw)) return `${API_BASE}/${raw.replace(/^\/+/, '')}`;
    return '';
  };

  const toApiErrors = (err, fallback) => {
    const apiErrors = err.response?.data?.errors;
    if (Array.isArray(apiErrors) && apiErrors.length > 0) return apiErrors.join(', ');
    return err.response?.data?.message || fallback;
  };

  const buildPayload = (form, imageFile) => {
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, String(value));
    });
    if (imageFile) payload.append('image', imageFile);
    return payload;
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!createImageFile) {
      setError('Please select a course image.');
      return;
    }

    try {
      setCreating(true);
      const token = localStorage.getItem('token');
      const payload = buildPayload(createForm, createImageFile);

      await axios.post(`${API_BASE}/api/courses`, payload, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      setSuccess('Course created successfully.');
      setCreateForm(initialForm);
      setCreateImageFile(null);
      await fetchCourses();
    } catch (err) {
      setError(toApiErrors(err, 'Failed to create course'));
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (course) => {
    setEditingCourseId(course._id);
    setEditImageFile(null);
    setEditForm({
      title: course.title || '',
      desc: course.desc || '',
      category: course.category || '',
      level: course.level || 'Beginner',
      language: course.language || 'English',
      instructor: course.instructor || '',
      price: course.price || '$0',
      priceValue: Number(course.priceValue) || 0,
      lessons: Number(course.lessons) || 0,
      students: Number(course.students) || 0,
      hours: Number(course.hours) || 0,
      rating: Number(course.rating) || 0,
    });
    setError('');
    setSuccess('');
  };

  const cancelEdit = () => {
    setEditingCourseId('');
    setEditForm(initialForm);
    setEditImageFile(null);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (!editingCourseId) return;

    setError('');
    setSuccess('');

    try {
      setUpdating(true);
      const token = localStorage.getItem('token');
      const payload = buildPayload(editForm, editImageFile);

      await axios.put(`${API_BASE}/api/courses/${editingCourseId}`, payload, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      setSuccess('Course updated successfully.');
      cancelEdit();
      await fetchCourses();
    } catch (err) {
      setError(toApiErrors(err, 'Failed to update course'));
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const ok = window.confirm('Delete this course?');
    if (!ok) return;

    setError('');
    setSuccess('');

    try {
      setDeletingCourseId(courseId);
      await axios.delete(`${API_BASE}/api/courses/${courseId}`, getAuthConfig());
      if (editingCourseId === courseId) {
        cancelEdit();
      }
      setSuccess('Course deleted successfully.');
      await fetchCourses();
    } catch (err) {
      setError(toApiErrors(err, 'Failed to delete course'));
    } finally {
      setDeletingCourseId('');
    }
  };

  const editingCourse = useMemo(
    () => courses.find((course) => course._id === editingCourseId) || null,
    [courses, editingCourseId]
  );

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
      <h2 style={{ margin: 0, marginBottom: 14 }}>Course Management (Create / Update / Delete)</h2>

      {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
      {success && <p style={{ color: '#166534' }}>{success}</p>}

      <form onSubmit={handleCreateCourse} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 14, marginBottom: 18 }}>
        <h3 style={{ margin: 0, marginBottom: 12, fontSize: 16 }}>Create Course (with Image)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
          <div style={fieldGroupStyle}>
            <label style={fieldLabelStyle}>Course Title</label>
            <input required placeholder="Course Title" value={createForm.title} onChange={(e) => setCreateForm((p) => ({ ...p, title: e.target.value }))} style={fieldInputStyle} />
          </div>
          <div style={fieldGroupStyle}>
            <label style={fieldLabelStyle}>Course Category</label>
            <input required placeholder="Course Category" value={createForm.category} onChange={(e) => setCreateForm((p) => ({ ...p, category: e.target.value }))} style={fieldInputStyle} />
          </div>
          <div style={fieldGroupStyle}>
            <label style={fieldLabelStyle}>Instructor Name</label>
            <input required placeholder="Instructor Name" value={createForm.instructor} onChange={(e) => setCreateForm((p) => ({ ...p, instructor: e.target.value }))} style={fieldInputStyle} />
          </div>
          <div style={fieldGroupStyle}>
            <label style={fieldLabelStyle}>Course Language</label>
            <input required placeholder="Course Language" value={createForm.language} onChange={(e) => setCreateForm((p) => ({ ...p, language: e.target.value }))} style={fieldInputStyle} />
          </div>
          <div style={fieldGroupStyle}>
            <label style={fieldLabelStyle}>Course Level</label>
            <select value={createForm.level} onChange={(e) => setCreateForm((p) => ({ ...p, level: e.target.value }))} style={fieldInputStyle}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div style={fieldGroupStyle}>
            <label style={fieldLabelStyle}>Course Price Label (e.g. $120)</label>
            <input placeholder="Course Price Label (e.g. $120)" value={createForm.price} onChange={(e) => setCreateForm((p) => ({ ...p, price: e.target.value }))} style={fieldInputStyle} />
          </div>
          <div style={fieldGroupStyle}>
            <label style={fieldLabelStyle}>Course Price Value</label>
            <input type="number" min="0" placeholder="Course Price Value" value={createForm.priceValue} onChange={(e) => setCreateForm((p) => ({ ...p, priceValue: e.target.value }))} style={fieldInputStyle} />
          </div>
          <div style={fieldGroupStyle}>
            <label style={fieldLabelStyle}>Total Lessons</label>
            <input type="number" min="0" placeholder="Total Lessons" value={createForm.lessons} onChange={(e) => setCreateForm((p) => ({ ...p, lessons: e.target.value }))} style={fieldInputStyle} />
          </div>
          <div style={fieldGroupStyle}>
            <label style={fieldLabelStyle}>Total Students</label>
            <input type="number" min="0" placeholder="Total Students" value={createForm.students} onChange={(e) => setCreateForm((p) => ({ ...p, students: e.target.value }))} style={fieldInputStyle} />
          </div>
          <div style={fieldGroupStyle}>
            <label style={fieldLabelStyle}>Course Hours</label>
            <input type="number" min="0" placeholder="Course Hours" value={createForm.hours} onChange={(e) => setCreateForm((p) => ({ ...p, hours: e.target.value }))} style={fieldInputStyle} />
          </div>
          <div style={fieldGroupStyle}>
            <label style={fieldLabelStyle}>Course Rating (0-5)</label>
            <input type="number" min="0" max="5" step="0.1" placeholder="Course Rating (0-5)" value={createForm.rating} onChange={(e) => setCreateForm((p) => ({ ...p, rating: e.target.value }))} style={fieldInputStyle} />
          </div>
          <div style={fieldGroupStyle}>
            <label style={fieldLabelStyle}>Course Image</label>
            <input type="file" accept="image/*" onChange={(e) => setCreateImageFile(e.target.files?.[0] || null)} style={fieldInputStyle} />
          </div>
        </div>
        <div style={{ ...fieldGroupStyle, marginTop: 10 }}>
          <label style={fieldLabelStyle}>Course Description</label>
          <textarea
            required
            placeholder="Description"
            value={createForm.desc}
            onChange={(e) => setCreateForm((p) => ({ ...p, desc: e.target.value }))}
            style={{ width: '100%', minHeight: 80, ...fieldInputStyle }}
          />
        </div>
        <button type="submit" disabled={creating} style={{ marginTop: 10, border: 'none', background: '#2563eb', color: '#fff', padding: '8px 12px', borderRadius: 6 }}>
          {creating ? 'Creating...' : 'Create Course'}
        </button>
      </form>

      {editingCourse && (
        <form onSubmit={handleUpdateCourse} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 14, marginBottom: 18, background: '#f8fafc' }}>
          <h3 style={{ margin: 0, marginBottom: 12, fontSize: 16 }}>Update Course: {editingCourse.title}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            <div style={fieldGroupStyle}>
              <label style={fieldLabelStyle}>Course Title</label>
              <input required placeholder="Course Title" value={editForm.title} onChange={(e) => setEditForm((p) => ({ ...p, title: e.target.value }))} style={fieldInputStyle} />
            </div>
            <div style={fieldGroupStyle}>
              <label style={fieldLabelStyle}>Course Category</label>
              <input required placeholder="Course Category" value={editForm.category} onChange={(e) => setEditForm((p) => ({ ...p, category: e.target.value }))} style={fieldInputStyle} />
            </div>
            <div style={fieldGroupStyle}>
              <label style={fieldLabelStyle}>Instructor Name</label>
              <input required placeholder="Instructor Name" value={editForm.instructor} onChange={(e) => setEditForm((p) => ({ ...p, instructor: e.target.value }))} style={fieldInputStyle} />
            </div>
            <div style={fieldGroupStyle}>
              <label style={fieldLabelStyle}>Course Language</label>
              <input required placeholder="Course Language" value={editForm.language} onChange={(e) => setEditForm((p) => ({ ...p, language: e.target.value }))} style={fieldInputStyle} />
            </div>
            <div style={fieldGroupStyle}>
              <label style={fieldLabelStyle}>Course Level</label>
              <select value={editForm.level} onChange={(e) => setEditForm((p) => ({ ...p, level: e.target.value }))} style={fieldInputStyle}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div style={fieldGroupStyle}>
              <label style={fieldLabelStyle}>Course Price Label (e.g. $120)</label>
              <input placeholder="Course Price Label (e.g. $120)" value={editForm.price} onChange={(e) => setEditForm((p) => ({ ...p, price: e.target.value }))} style={fieldInputStyle} />
            </div>
            <div style={fieldGroupStyle}>
              <label style={fieldLabelStyle}>Course Price Value</label>
              <input type="number" min="0" placeholder="Course Price Value" value={editForm.priceValue} onChange={(e) => setEditForm((p) => ({ ...p, priceValue: e.target.value }))} style={fieldInputStyle} />
            </div>
            <div style={fieldGroupStyle}>
              <label style={fieldLabelStyle}>Total Lessons</label>
              <input type="number" min="0" placeholder="Total Lessons" value={editForm.lessons} onChange={(e) => setEditForm((p) => ({ ...p, lessons: e.target.value }))} style={fieldInputStyle} />
            </div>
            <div style={fieldGroupStyle}>
              <label style={fieldLabelStyle}>Total Students</label>
              <input type="number" min="0" placeholder="Total Students" value={editForm.students} onChange={(e) => setEditForm((p) => ({ ...p, students: e.target.value }))} style={fieldInputStyle} />
            </div>
            <div style={fieldGroupStyle}>
              <label style={fieldLabelStyle}>Course Hours</label>
              <input type="number" min="0" placeholder="Course Hours" value={editForm.hours} onChange={(e) => setEditForm((p) => ({ ...p, hours: e.target.value }))} style={fieldInputStyle} />
            </div>
            <div style={fieldGroupStyle}>
              <label style={fieldLabelStyle}>Course Rating (0-5)</label>
              <input type="number" min="0" max="5" step="0.1" placeholder="Course Rating (0-5)" value={editForm.rating} onChange={(e) => setEditForm((p) => ({ ...p, rating: e.target.value }))} style={fieldInputStyle} />
            </div>
            <div style={fieldGroupStyle}>
              <label style={fieldLabelStyle}>Course Image (optional update)</label>
              <input type="file" accept="image/*" onChange={(e) => setEditImageFile(e.target.files?.[0] || null)} style={fieldInputStyle} />
            </div>
          </div>
          <div style={{ ...fieldGroupStyle, marginTop: 10 }}>
            <label style={fieldLabelStyle}>Course Description</label>
            <textarea
              required
              placeholder="Description"
              value={editForm.desc}
              onChange={(e) => setEditForm((p) => ({ ...p, desc: e.target.value }))}
              style={{ width: '100%', minHeight: 80, ...fieldInputStyle }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button type="submit" disabled={updating} style={{ border: 'none', background: '#16a34a', color: '#fff', padding: '8px 12px', borderRadius: 6 }}>
              {updating ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={cancelEdit} style={{ border: '1px solid #94a3b8', background: '#fff', color: '#334155', padding: '8px 12px', borderRadius: 6 }}>
              Cancel
            </button>
          </div>
        </form>
      )}

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
                <th style={{ textAlign: 'left', padding: '10px 8px' }}>Actions</th>
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
                  <td style={{ padding: '10px 8px', display: 'flex', gap: 8 }}>
                    <button type="button" onClick={() => startEdit(course)} style={{ border: 'none', background: '#2563eb', color: '#fff', padding: '6px 10px', borderRadius: 6 }}>
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCourse(course._id)}
                      disabled={deletingCourseId === course._id}
                      style={{ border: 'none', background: '#dc2626', color: '#fff', padding: '6px 10px', borderRadius: 6 }}
                    >
                      {deletingCourseId === course._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
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
