import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/Images/imgi_47_breadcrumb-bg-2.png";
import course1 from "../assets/Images/course1.png";
import course2 from "../assets/Images/course2.png";
import course3 from "../assets/Images/course3.png";
import course4 from "../assets/Images/course4.png";
import course5 from "../assets/Images/course5.png";
import course6 from "../assets/Images/course6.png";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const courseImageMap = {
    course1,
    course2,
    course3,
    course4,
    course5,
    course6,
};

function Checkout() {
    const navigate = useNavigate();
    const [cartRows, setCartRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [placedOrder, setPlacedOrder] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        address: "",
        note: ""
    });

    const fetchCart = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_BASE}/api/cart`, {
                credentials: "include",
            });

            if (response.status === 401) {
                setErrorMessage("Please login to checkout.");
                setCartRows([]);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch cart");
            }

            const payload = await response.json();
            const items = (Array.isArray(payload.items) ? payload.items : []).map((item) => ({
                ...item,
                total: Number(item.lineTotal) || 0,
                course: {
                    ...item.course,
                    img: courseImageMap[item.course?.imageKey] || "",
                },
            }));

            setCartRows(items);
            setErrorMessage("");
        } catch (error) {
            console.error("Checkout cart fetch error:", error);
            setErrorMessage("Unable to load checkout data.");
            setCartRows([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const subtotal = useMemo(
        () => cartRows.reduce((sum, item) => sum + item.total, 0),
        [cartRows]
    );

    const tax = subtotal * 0.1;
    const grandTotal = subtotal + tax;

    const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const submitCheckout = async (event) => {
        event.preventDefault();

        if (cartRows.length === 0) {
            return;
        }

        setErrorMessage("");
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_BASE}/api/orders/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (response.status === 401) {
                setErrorMessage("Please login to place order.");
                return;
            }

            const payload = await response.json();
            if (!response.ok) {
                setErrorMessage(payload.message || "Unable to place order.");
                return;
            }

            setPlacedOrder(payload.order || null);
            setOrderPlaced(true);
            setCartRows([]);
        } catch (error) {
            console.error("Checkout submit error:", error);
            setErrorMessage("Unable to place order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div
                className="w-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
                style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", height: "300px" }}>
                <div className="text-center">
                    <h1 className="display-4 fw-bold mt-4" style={{ color: "#0b2c2c" }}>
                        Checkout
                    </h1>
                    <div className="d-flex align-items-center justify-content-center gap-2 text-secondary">
                        <Link to="/" className="text-decoration-none text-black d-flex align-items-center gap-2">
                            <i className="bi bi-house-door-fill"></i>
                            <span>iStudy</span>
                        </Link>
                        <span className="mx-1"> - </span>
                        <span className="fw-medium text-black">checkout</span>
                    </div>
                </div>
            </div>

            <div className="py-5" style={{ backgroundColor: "#f5f7f9" }}>
                <div className="container">
                    {isLoading && (
                        <div className="alert alert-info border-0 shadow-sm" role="alert">
                            Loading checkout...
                        </div>
                    )}

                    {!isLoading && errorMessage && (
                        <div className="alert alert-warning border-0 shadow-sm" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    {orderPlaced ? (
                        <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                            <h2 className="fw-bold mb-3" style={{ color: "#0b2c2c" }}>Order placed successfully</h2>
                            <p className="text-muted mb-4">Thank you. Your courses are confirmed.</p>
                            {placedOrder?.id && (
                                <p className="text-muted mb-4">Order ID: {placedOrder.id}</p>
                            )}
                            <div className="d-flex gap-2 justify-content-center flex-wrap">
                                <Link to="/courses" className="btn btn-success px-4">Continue Learning</Link>
                                <button type="button" className="btn btn-outline-secondary px-4" onClick={() => navigate('/')}>
                                    Back To Home
                                </button>
                            </div>
                        </div>
                    ) : !isLoading && cartRows.length === 0 ? (
                        <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                            <h3 className="fw-bold mb-2">Your cart is empty</h3>
                            <p className="text-muted mb-4">Add courses to cart before checkout.</p>
                            <div className="d-flex gap-2 justify-content-center flex-wrap">
                                <Link to="/courses" className="btn btn-success px-4">Browse Courses</Link>
                                <Link to="/cart" className="btn btn-outline-secondary px-4">Go To Cart</Link>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={submitCheckout}>
                            <div className="row g-4 align-items-start">
                                <div className="col-12 col-lg-8">
                                    <div className="card border-0 shadow-sm rounded-4">
                                        <div className="card-body p-4 p-md-5">
                                            <h4 className="fw-bold mb-4" style={{ color: "#0b2c2c" }}>Billing Details</h4>

                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">First Name</label>
                                                    <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Last Name</label>
                                                    <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Email Address</label>
                                                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Phone</label>
                                                    <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Country</label>
                                                    <input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">City</label>
                                                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">Address</label>
                                                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">Order Notes (optional)</label>
                                                    <textarea className="form-control" rows="4" name="note" value={formData.note} onChange={handleChange}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-4">
                                    <div className="card border-0 shadow-sm rounded-4">
                                        <div className="card-body p-4">
                                            <h5 className="fw-bold mb-3" style={{ color: "#0b2c2c" }}>Order Summary</h5>

                                            <div className="d-flex flex-column gap-3 mb-3">
                                                {cartRows.map((item) => (
                                                    <div key={item.courseId} className="d-flex justify-content-between gap-2">
                                                        <div>
                                                            <p className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>{item.course.title}</p>
                                                            <small className="text-muted">Qty: {item.quantity}</small>
                                                        </div>
                                                        <span className="fw-semibold">{formatCurrency(item.total)}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <hr />

                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-muted">Subtotal</span>
                                                <span>{formatCurrency(subtotal)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-muted">Tax (10%)</span>
                                                <span>{formatCurrency(tax)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between fw-bold fs-5 mt-2">
                                                <span>Total</span>
                                                <span className="text-success">{formatCurrency(grandTotal)}</span>
                                            </div>

                                            <button type="submit" className="btn btn-success w-100 mt-4 py-2 fw-semibold" disabled={isSubmitting}>
                                                {isSubmitting ? "Placing Order..." : "Place Order"}
                                            </button>

                                            <Link to="/cart" className="btn btn-outline-secondary w-100 mt-2 py-2">
                                                Back To Cart
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}

export default Checkout;
