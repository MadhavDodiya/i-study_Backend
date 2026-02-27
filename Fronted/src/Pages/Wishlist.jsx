import React, { useEffect, useState } from "react";
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

function Wishlist() {
    const navigate = useNavigate();
    const [wishlistRows, setWishlistRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchWishlist = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${API_BASE}/api/wishlist`, {
                credentials: "include",
            });

            if (response.status === 401) {
                setErrorMessage("Please login to view your wishlist.");
                setWishlistRows([]);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch wishlist");
            }

            const payload = await response.json();
            const rows = (Array.isArray(payload.items) ? payload.items : []).map((item) => ({
                ...item,
                course: {
                    ...item.course,
                    img: courseImageMap[item.course?.imageKey] || "",
                },
            }));

            setWishlistRows(rows);
            setErrorMessage("");
        } catch (error) {
            console.error("Wishlist fetch error:", error);
            setErrorMessage("Unable to load wishlist. Please check backend server.");
            setWishlistRows([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemove = async (courseId) => {
        try {
            const response = await fetch(`${API_BASE}/api/wishlist/${courseId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (response.status === 401) {
                setErrorMessage("Please login to update your wishlist.");
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to remove wishlist item");
            }

            await fetchWishlist();
        } catch (error) {
            console.error("Wishlist remove error:", error);
            setErrorMessage("Unable to remove wishlist item.");
        }
    };

    const handleAddToCart = async (courseId) => {
        try {
            const response = await fetch(`${API_BASE}/api/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ courseId, quantity: 1 }),
            });

            if (response.status === 401) {
                setErrorMessage("Please login to add items to cart.");
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to add course to cart");
            }

            navigate("/cart");
        } catch (error) {
            console.error("Wishlist add-to-cart error:", error);
            setErrorMessage("Unable to add course to cart.");
        }
    };

    const getPriceValue = (amount) => {
        const numeric = Number(amount);
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
                {isLoading && (
                    <div className="alert alert-info border-0 shadow-sm" role="alert">
                        Loading wishlist...
                    </div>
                )}

                {!isLoading && errorMessage && (
                    <div className="alert alert-warning border-0 shadow-sm" role="alert">
                        {errorMessage}
                    </div>
                )}

                {!isLoading && wishlistRows.length === 0 ? (
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
                                {wishlistRows.map((item) => {
                                    const price = getPriceValue(item.course?.priceValue);
                                    const course = item.course;

                                    return (
                                        <tr key={item.courseId}>
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
                                                    onClick={() => handleAddToCart(course.id)}
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
