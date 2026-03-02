import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const AddUser = () => {
    // ✅ FIXED: Use correct API endpoint
    const API_URL =
        // process.env.REACT_APP_API_URL || "http://localhost:5000/api";
        import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        isActive: true,
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // ✅ FIXED: Wrapped in useCallback to safely use in useEffect dependency array
    const fetchUsers = useCallback(async () => {
        try {
            // ✅ FIXED: Get token from correct key
            const token = localStorage.getItem("token") || localStorage.getItem("authToken");
            if (!token) {
                setMessage("Not authenticated. Please login.");
                setMessageType("error");
                return;
            }

            // ✅ FIXED: Use correct endpoint (/api/admin/users, not /api/users)
            const response = await axios.get(`${API_URL}/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // ✅ FIXED: Access correct response data key
            const fetchedUsers = response.data.users || [];
            setUsers(fetchedUsers);
        } catch (error) {
            console.error("Fetch error:", error);
            setMessage(error.response?.data?.message || "Failed to fetch users");
            setMessageType("error");
        }
    }, [API_URL]);

    // ✅ FIXED: Added fetchUsers to dependency array (safe now due to useCallback)
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // ================= HANDLE INPUT =================
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // ================= ADD USER =================
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            // ✅ FIXED: Get token from correct key
            const token = localStorage.getItem("token") || localStorage.getItem("authToken");
            if (!token) throw new Error("Unauthorized - No token found");

            // ✅ FIXED: Use correct endpoint
            const response = await axios.post(
                `${API_URL}/admin/users`,  // FIXED: Changed from /api/users/add
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setMessage("User added successfully!");
                setMessageType("success");

                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    role: "user",
                    isActive: true,
                });

                fetchUsers();
            }
        } catch (error) {
            console.error("Submit error:", error);
            setMessage(
                error.response?.data?.message || error.message || "Error occurred"
            );
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    // ================= DELETE USER =================
    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            // ✅ FIXED: Get token from correct key
            const token = localStorage.getItem("token") || localStorage.getItem("authToken");
            if (!token) throw new Error("Unauthorized");

            // ✅ FIXED: Use correct endpoint
            const response = await axios.delete(`${API_URL}/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setMessage("User deleted successfully!");
                setMessageType("success");
                fetchUsers();
            } else {
                setMessage("Failed to delete user");
                setMessageType("error");
            }
        } catch (error) {
            console.error("Delete error:", error);
            setMessage(
                error.response?.data?.message || error.message || "Delete failed"
            );
            setMessageType("error");
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>User Management</h1>

            {/* MESSAGE */}
            {message && (
                <div
                    style={{
                        padding: "10px",
                        marginBottom: "15px",
                        color: messageType === "error" ? "red" : "green",
                        fontWeight: "bold",
                    }}
                >
                    {message}
                </div>
            )}

            {/* ADD USER FORM */}
            <form
                onSubmit={handleSubmit}
                style={{
                    marginBottom: "30px",
                    padding: "20px",
                    border: "1px solid #ddd",
                }}
            >
                <h2>Add New User</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{ display: "block", marginBottom: "10px", width: "100%" }}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{ display: "block", marginBottom: "10px", width: "100%" }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    minLength="6"
                    required
                    style={{ display: "block", marginBottom: "10px", width: "100%" }}
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    style={{ display: "block", marginBottom: "10px", width: "100%" }}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <label style={{ display: "block", marginBottom: "10px" }}>
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                    />
                    {" "}Active
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add User"}
                </button>
            </form>

            {/* USER TABLE */}
            <h2>All Users ({users.length})</h2>

            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <table border="1" width="100%" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? "Admin" : "User"}</td>
                                <td>{user.isActive ? "Active" : "Inactive"}</td>
                                <td>
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString()
                                        : "N/A"}
                                </td>
                                <td>
                                    <button
                                        style={{ color: "red" }}
                                        onClick={() => handleDeleteUser(user._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AddUser;