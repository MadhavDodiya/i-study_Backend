import React, { useMemo, useState } from 'react';
import bg from "../assets/Images/imgi_47_breadcrumb-bg-2.png";
import { Link, useNavigate } from "react-router-dom";
import coursesData from "../Data/Courses";

const CART_STORAGE_KEY = "istudy_cart";
const CART_UPDATED_EVENT = "istudy:cart-updated";

const getCartItems = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const saveCartItems = (items) => {
    const normalized = Array.isArray(items) ? items : [];
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
    return normalized;
};

const removeCourseFromCart = (courseId) => {
    const targetId = Number(courseId);
    return saveCartItems(getCartItems().filter((item) => Number(item.courseId) !== targetId));
};

const updateCartItemQuantity = (courseId, quantity) => {
    const targetId = Number(courseId);
    const targetQty = Number(quantity);
    const updated = getCartItems().map((item) =>
        Number(item.courseId) === targetId
            ? { ...item, quantity: Number.isInteger(targetQty) && targetQty > 0 ? targetQty : 1 }
            : item
    );
    return saveCartItems(updated);
};

function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(() => getCartItems());
    const [shippingCost, setShippingCost] = useState(0);

    const cartRows = useMemo(() => {
        return cartItems
            .map((item) => {
                const course = coursesData.find((entry) => entry.id === item.courseId);
                if (!course) {
                    return null;
                }

                const unitPrice = Number.isFinite(Number(course.priceValue))
                    ? Number(course.priceValue)
                    : Number(String(course.price).replace(/[^0-9.]/g, "")) || 0;

                return {
                    ...item,
                    course,
                    unitPrice,
                    lineTotal: unitPrice * item.quantity,
                };
            })
            .filter(Boolean);
    }, [cartItems]);

    const subtotal = useMemo(
        () => cartRows.reduce((sum, item) => sum + item.lineTotal, 0),
        [cartRows]
    );

    const total = subtotal + shippingCost;

    const handleRemove = (courseId) => {
        const updated = removeCourseFromCart(courseId);
        setCartItems(updated);
    };

    const handleIncrease = (courseId, quantity) => {
        const updated = updateCartItemQuantity(courseId, quantity + 1);
        setCartItems(updated);
    };

    const handleDecrease = (courseId, quantity) => {
        if (quantity <= 1) {
            const updated = removeCourseFromCart(courseId);
            setCartItems(updated);
            return;
        }

        const updated = updateCartItemQuantity(courseId, quantity - 1);
        setCartItems(updated);
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
                    <div className="row g-4 align-items-start">
                        <div className="col-12 col-lg-8">
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                                {cartRows.length === 0 ? (
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
                                                                    src={item.course.img}
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
