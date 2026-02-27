import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgimg from "../assets/Images/sign-in-bg.webp";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setErrorMessage("Please fill all fields");
            return;
        }

        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email: form.email.trim(),
                    password: form.password,
                }),
            });

            const payload = await response.json().catch(() => ({}));

            if (!response.ok) {
                setErrorMessage(payload.message || "Login failed");
                return;
            }

            navigate("/", { replace: true });
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Unable to login. Please check backend server.");
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

                        <h2 className="title">Sign In</h2>
                        <p className="subtitle">Welcome back</p>

                        <form onSubmit={handleSubmit}>
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
                            <input
                                type="password"
                                name="password"
                                placeholder="Your Password"
                                className="form-input"
                                value={form.password}
                                onChange={handleChange}
                            />

                            <div className="remember-row">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={form.remember}
                                        onChange={handleChange}
                                    />
                                    Remember Me
                                </label>

                                <span className="forgot">Forgot Password?</span>
                            </div>

                            {errorMessage ? (
                                <p className="text-danger small mt-2 mb-0">{errorMessage}</p>
                            ) : null}

                            <button className="login-btn" disabled={isSubmitting}>
                                {isSubmitting ? "Signing in..." : "Continue"}
                            </button>
                        </form>

                        <div className="divider">
                            <span>OR SignIn With</span>
                        </div>

                        <div className="social-row">
                            <button className="fb-btn" type="button">Facebook</button>
                            <button className="google-btn" type="button">Google</button>
                        </div>

                        <p className="signup-text">
                            Don't have an account?
                            <span>
                                <Link to="/register" className="signup-link">
                                    Sign up
                                </Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
