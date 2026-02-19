import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgimg from "../assets/Images/sign-in-bg.webp";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            alert("Please fill all fields");
            return;
        }

        console.log("LOGIN DATA:", form);
        alert("Login Successful (Demo)");
    };

    return (
        <div className="container-fluid login-page">
            <div className="row min-vh-100">

                {/* LEFT IMAGE */}
                <div className="col-lg-6 p-0 d-none d-lg-block">
                    <img src={bgimg} alt="" className="login-img" />
                </div>

                {/* RIGHT FORM */}
                <div className="col-lg-6 d-flex align-items-center justify-content-center">
                    <div className="login-card">

                        {/* LOGO */}
                        <div className="text-center mb-3">
                            <h3 className="brand">iStudy</h3>
                        </div>

                        <h2 className="title">Sign In</h2>
                        <p className="subtitle">Welcome back Wick</p>

                        <form onSubmit={handleSubmit}>
                            {/* EMAIL */}
                            <label>Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="form-input"
                                value={form.email}
                                onChange={handleChange}
                            />

                            {/* PASSWORD */}
                            <label>Password *</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Your Password"
                                className="form-input"
                                value={form.password}
                                onChange={handleChange}
                            />

                            {/* REMEMBER */}
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

                            {/* BUTTON */}
                            <button className="login-btn">Sign In</button>
                        </form>

                        {/* OR */}
                        <div className="divider">
                            <span>OR SignIn With</span>
                        </div>

                        {/* SOCIAL */}
                        <div className="social-row">
                            <button className="fb-btn">Facebook</button>
                            <button className="google-btn">Google</button>
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
