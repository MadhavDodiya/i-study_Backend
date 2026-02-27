import React, { useEffect, useMemo, useState } from "react";
import bg from "../assets/Images/imgi_47_breadcrumb-bg-2.png";
import { Link, useNavigate } from "react-router-dom";
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

function Cart() {
    const navigate = useNavigate();
    const [cartRows, setCartRows] = useState([]);
    const [shippingCost, setShippingCost] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchCart = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_BASE}/api/cart`, {
                credentials: "include",
            });

            if (response.status === 401) {
                setErrorMessage("Please login to view your cart.");
                setCartRows([]);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch cart");
            }

            const payload = await response.json();
            const items = Array.isArray(payload.items) ? payload.items : [];
            const hydratedRows = items.map((item) => ({
                ...item,
                course: {
                    ...item.course,
                    img: courseImageMap[item.course?.imageKey] || "",
                },
            }));

            setCartRows(hydratedRows);
            setErrorMessage("");
        } catch (error) {
            console.error("Cart fetch error:", error);
            setErrorMessage("Unable to load cart. Please check backend server.");
            setCartRows([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const subtotal = useMemo(
        () => cartRows.reduce((sum, item) => sum + item.lineTotal, 0),
        [cartRows]
    );

    const total = subtotal + shippingCost;

    const removeItem = async (courseId) => {
        const response = await fetch(`${API_BASE}/api/cart/${courseId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (response.status === 401) {
            setErrorMessage("Please login to update your cart.");
            return false;
        }

        if (!response.ok) {
            throw new Error("Failed to remove cart item");
        }

        return true;
    };

    const updateQuantity = async (courseId, quantity) => {
        const response = await fetch(`${API_BASE}/api/cart/${courseId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ quantity }),
        });

        if (response.status === 401) {
            setErrorMessage("Please login to update your cart.");
            return false;
        }

        if (!response.ok) {
            throw new Error("Failed to update quantity");
        }

        return true;
    };

    const handleRemove = async (courseId) => {
        try {
            const ok = await removeItem(courseId);
            if (ok) {
                await fetchCart();
            }
        } catch (error) {
            console.error("Cart remove error:", error);
            setErrorMessage("Unable to remove cart item.");
        }
    };

    const handleIncrease = async (courseId, quantity) => {
        try {
            const ok = await updateQuantity(courseId, quantity + 1);
            if (ok) {
                await fetchCart();
            }
        } catch (error) {
            console.error("Cart quantity update error:", error);
            setErrorMessage("Unable to update quantity.");
        }
    };

    const handleDecrease = async (courseId, quantity) => {
        try {
            if (quantity <= 1) {
                const ok = await removeItem(courseId);
                if (ok) {
                    await fetchCart();
                }
                return;
            }

            const ok = await updateQuantity(courseId, quantity - 1);
            if (ok) {
                await fetchCart();
            }
        } catch (error) {
            console.error("Cart quantity update error:", error);
            setErrorMessage("Unable to update quantity.");
        }
    };

    const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;

    return (
        <>
            <div
                className="w-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
                style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", height: "300px" }}>
                <div className="text-center">
                    <h1 className="display-4 fw-bold mt-4" style={{ color: "#0b2c2c" }}>
                        Cart
                    </h1>
                    <div className="d-flex align-items-center justify-content-center gap-2 text-secondary">
                        <Link to="/" className="text-decoration-none text-black d-flex align-items-center gap-2">
                            <i className="bi bi-house-door-fill"></i>
                            <span>iStudy</span>
                        </Link>
                        <span className="mx-1"> - </span>
                        <span className="fw-medium text-black">cart</span>
                    </div>
                </div>
            </div>

            <div className="py-5" style={{ backgroundColor: "#f5f7f9" }}>
                <div className="container">
                    {isLoading && (
                        <div className="alert alert-info border-0 shadow-sm" role="alert">
                            Loading cart...
                        </div>
                    )}

                    {!isLoading && errorMessage && (
                        <div className="alert alert-warning border-0 shadow-sm" role="alert">
                            {errorMessage}
                        </div>
                    )}

                    <div className="row g-4 align-items-start">
                        <div className="col-12 col-lg-8">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                                {!isLoading && cartRows.length === 0 ? (
                                    <div className="card-body text-center p-5">
                                        <h3 className="fw-bold mb-2">Your cart is empty</h3>
                                        <p className="text-muted mb-4">Add courses from course detail or wishlist to view them here.</p>
                                        <Link to="/courses" className="btn btn-success px-4 py-2 rounded-pill">
                                            Browse Courses
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table align-middle mb-0">
                                            <thead style={{ backgroundColor: "#eef3f2" }}>
                                                <tr>
                                                    <th className="px-4 py-3 text-nowrap">Course</th>
                                                    <th className="px-4 py-3 text-nowrap">Unit Price</th>
                                                    <th className="px-4 py-3 text-nowrap">Quantity</th>
                                                    <th className="px-4 py-3 text-nowrap">Total</th>
                                                    <th className="px-4 py-3 text-nowrap">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartRows.map((item) => (
                                                    <tr key={item.courseId}>
                                                        <td className="px-4 py-3">
                                                            <div className="d-flex align-items-center gap-3">
                                                                <img
                                                                    src={item.course?.img}
                                                                    alt={item.course.title}
                                                                    style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "12px" }}
                                                                />
                                                                <p className="mb-0 fw-semibold" style={{ color: "#0b2c2c" }}>
                                                                    {item.course.title}
                                                                </p>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-3 fw-medium">{formatCurrency(item.unitPrice)}</td>

                                                        <td className="px-4 py-3">
                                                            <div className="d-inline-flex align-items-center border rounded-pill overflow-hidden">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm border-0 px-3"
                                                                    onClick={() => handleDecrease(item.courseId, item.quantity)}>
                                                                    -
                                                                </button>
                                                                <span className="px-3 py-1 fw-semibold" style={{ minWidth: "44px", textAlign: "center" }}>
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm border-0 px-3"
                                                                    onClick={() => handleIncrease(item.courseId, item.quantity)}>
                                                                    +
                                                                </button>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-3 fw-semibold text-success">{formatCurrency(item.lineTotal)}</td>

                                                        <td className="px-4 py-3">
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-outline-danger rounded-pill"
                                                                onClick={() => handleRemove(item.courseId)}>
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-12 col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4">
                                <div className="card-body p-4">
                                    <h4 className="fw-bold mb-4" style={{ color: "#0b2c2c" }}>Cart Summary</h4>

                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="text-muted">Subtotal</span>
                                        <span className="fw-semibold">{formatCurrency(subtotal)}</span>
                                    </div>

                                    <hr />

                                    <p className="fw-semibold mb-3" style={{ color: "#0b2c2c" }}>Shipping</p>

                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <label className="d-flex justify-content-between align-items-center">
                                            <span className="d-flex align-items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="ship"
                                                    checked={shippingCost === 20}
                                                    onChange={() => setShippingCost(20)}
                                                />
                                                Flat Rate
                                            </span>
                                            <span className="text-success fw-medium">$20.00</span>
                                        </label>

                                        <label className="d-flex justify-content-between align-items-center">
                                            <span className="d-flex align-items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="ship"
                                                    checked={shippingCost === 25}
                                                    onChange={() => setShippingCost(25)}
                                                />
                                                Local Pickup
                                            </span>
                                            <span className="text-success fw-medium">$25.00</span>
                                        </label>

                                        <label className="d-flex align-items-center gap-2">
                                            <input
                                                type="radio"
                                                name="ship"
                                                checked={shippingCost === 0}
                                                onChange={() => setShippingCost(0)}
                                            />
                                            Free Shipping
                                        </label>
                                    </div>

                                    <hr />

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <span className="fw-bold" style={{ color: "#0b2c2c" }}>Total</span>
                                        <span className="fw-bold fs-5 text-success">{formatCurrency(total)}</span>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn w-100 py-2 fw-semibold"
                                        style={{ backgroundColor: "#10a66d", color: "#fff" }}
                                        disabled={cartRows.length === 0}
                                        onClick={() => navigate("/checkout")}>
                                        Proceed To Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
