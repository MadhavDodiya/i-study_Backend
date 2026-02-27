import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgimg from "../assets/Images/sign-up-bg.webp";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Register() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            setErrorMessage("Please fill all fields");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: form.name.trim(),
                    email: form.email.trim(),
                    password: form.password,
                }),
            });

            const payload = await response.json().catch(() => ({}));

            if (!response.ok) {
                setErrorMessage(payload.message || "Registration failed");
                return;
            }

            navigate("/", { replace: true });
        } catch (error) {
            console.error("Register error:", error);
            setErrorMessage("Unable to register. Please check backend server.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container-fluid login-page">
            <div className="row min-vh-100">
                <div className="col-lg-6 p-0 d-none d-lg-block">
                    <img src={bgimg} alt="" className="login-img" />
                </div>

                <div className="col-lg-6 d-flex align-items-center justify-content-center">
                    <div className="login-card">
                        <div className="text-center mb-3">
                            <h3 className="brand">iStudy</h3>
                        </div>

                        <h2 className="title">Sign Up</h2>
                        <p className="subtitle">Create your account</p>

                        <form onSubmit={handleSubmit}>
                            <label>Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Full Name"
                                className="form-input"
                                value={form.name}
                                onChange={handleChange}
                            />

                            <label>Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="form-input"
                                value={form.email}
                                onChange={handleChange}
                            />

                            <label>Password *</label>
                            <div className="password-input-wrap">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Your Password"
                                    className="form-input password-input"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                </button>
                            </div>

                            <label>Confirm Password *</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="form-input"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />

                            {errorMessage ? (
                                <p className="text-danger small mt-2 mb-0">{errorMessage}</p>
                            ) : null}

                            <button className="login-btn" disabled={isSubmitting}>
                                {isSubmitting ? "Creating account..." : "Continue"}
                            </button>
                        </form>

                        <p className="signup-text">
                            Already have an account?{" "}
                            <span>
                                <Link to="/login" className="signup-link">
                                    Sign in
                                </Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
