import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/Images/imgi_47_breadcrumb-bg-2.png";
import coursesData from "../Data/Courses";

const CART_STORAGE_KEY = "istudy_cart";
const CART_UPDATED_EVENT = "istudy:cart-updated";
const WISHLIST_STORAGE_KEY = "istudy_wishlist";

const readArray = (key) => {
    try {
        const parsed = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const getWishlistIds = () =>
    Array.from(new Set(readArray(WISHLIST_STORAGE_KEY).map((id) => Number(id)).filter((id) => Number.isInteger(id) && id > 0)));

const removeCourseFromWishlist = (courseId) => {
    const targetId = Number(courseId);
    const updated = getWishlistIds().filter((id) => id !== targetId);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
    return updated;
};

const addCourseToCart = (course, quantity = 1) => {
    const courseId = Number(course?.id);
    if (!Number.isInteger(courseId) || courseId <= 0) {
        return readArray(CART_STORAGE_KEY);
    }

    const qty = Number.isInteger(Number(quantity)) && Number(quantity) > 0 ? Number(quantity) : 1;
    const current = readArray(CART_STORAGE_KEY);
    const existing = current.find((item) => Number(item.courseId) === courseId);
    const updated = existing
        ? current.map((item) =>
              Number(item.courseId) === courseId ? { ...item, quantity: Number(item.quantity || 0) + qty } : item
          )
        : [...current, { courseId, quantity: qty }];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
    return updated;
};

function Wishlist() {
    const navigate = useNavigate();
    const [wishlistIds, setWishlistIds] = useState(() => getWishlistIds());

    const wishlistCourses = useMemo(() => {
        return wishlistIds
            .map((courseId) => coursesData.find((course) => course.id === courseId))
            .filter(Boolean);
    }, [wishlistIds]);

    const handleRemove = (courseId) => {
        const updatedIds = removeCourseFromWishlist(courseId);
        setWishlistIds(updatedIds);
    };

    const handleAddToCart = (course) => {
        addCourseToCart(course, 1);
        navigate("/cart");
    };

    const getPriceValue = (price) => {
        const numeric = Number(String(price).replace(/[^0-9.]/g, ""));
        return Number.isFinite(numeric) ? numeric.toFixed(2) : "0.00";
    };

    return (
        <>
            <div
                className="w-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
                style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", height: "300px" }}>
                <div className="text-center">
                    <h1 className="display-4 fw-bold mt-4" style={{ color: "#0b2c2c" }}>
                        Wishlist
                    </h1>
                    <div className="d-flex align-items-center justify-content-center gap-2 text-secondary">
                        <Link to="/" className="text-decoration-none text-black d-flex align-items-center gap-2">
                            <i className="bi bi-house-door-fill"></i>
                            <span>iStudy</span>
                        </Link>
                        <span className="mx-1"> - </span>
                        <span className="fw-medium text-black">Wishlist</span>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                {wishlistCourses.length === 0 ? (
                    <div className="text-center border rounded-4 p-5">
                        <h3 className="fw-bold mb-2">Your wishlist is empty</h3>
                        <p className="text-muted mb-4">Add courses from the course detail page to see them here.</p>
                        <Link to="/courses" className="btn btn-success px-4">
                            Browse Courses
                        </Link>
                    </div>
                ) : (
                    <div className="border rounded-3 overflow-auto">
                        <table className="table mb-0 align-middle" style={{ minWidth: "1050px" }}>
                            <thead>
                                <tr>
                                    <th className="text-center py-4 fw-semibold border" style={{ fontSize: "18px" }}>Images</th>
                                    <th className="text-center py-4 fw-semibold border" style={{ fontSize: "18px" }}>Product</th>
                                    <th className="text-center py-4 fw-semibold border" style={{ fontSize: "18px" }}>Unit Price</th>
                                    <th className="text-center py-4 fw-semibold border" style={{ fontSize: "18px" }}>Add to cart</th>
                                    <th className="text-center py-4 fw-semibold border" style={{ fontSize: "18px" }}>Total</th>
                                    <th className="text-center py-4 fw-semibold border" style={{ fontSize: "18px" }}>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlistCourses.map((course) => {
                                    const price = getPriceValue(course.price);

                                    return (
                                        <tr key={course.id}>
                                            <td className="text-center border py-4">
                                                <img
                                                    src={course.img}
                                                    alt={course.title}
                                                    style={{ width: "82px", height: "122px", objectFit: "cover" }}
                                                />
                                            </td>

                                            <td className="text-center border py-4" style={{ fontSize: "20px", fontWeight: "500" }}>
                                                {course.title}
                                            </td>

                                            <td className="text-center border py-4" style={{ fontSize: "20px", fontWeight: "500" }}>
                                                ${price}
                                            </td>

                                            <td className="text-center border py-4">
                                                <button
                                                    type="button"
                                                    className="btn px-5 py-2"
                                                    onClick={() => handleAddToCart(course)}
                                                    style={{ backgroundColor: "#10a66d", color: "#fff", fontSize: "16px", minWidth: "180px" }}>
                                                    Add To Cart
                                                </button>
                                            </td>

                                            <td className="text-center border py-4" style={{ fontSize: "20px", fontWeight: "500" }}>
                                                ${price}
                                            </td>

                                            <td className="text-center border py-4">
                                                <button
                                                    type="button"
                                                    className="btn p-0 border-0"
                                                    onClick={() => handleRemove(course.id)}
                                                    style={{ color: "#0b2219", fontSize: "16px", backgroundColor: "transparent" }}>
                                                    <i className="bi bi-x-lg me-2"></i>Remove
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="d-flex justify-content-center pb-5">
                <button type="button" className="btn btn-success px-4 py-2">
                    <Link to="/cart" className="text-decoration-none text-white">
                        Go to Cart
                    </Link>
                </button>
            </div>
        </>
    );
}

export default Wishlist
