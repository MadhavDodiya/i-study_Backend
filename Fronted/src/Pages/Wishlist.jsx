import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/Images/imgi_47_breadcrumb-bg-2.png";
import coursesData from "../Data/Courses";
import { getWishlistIds, removeCourseFromWishlist } from "../utils/wishlistStorage";

function Wishlist() {
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

    const getPriceValue = (price) => {
        const numeric = Number(String(price).replace(/[^0-9.]/g, ""));
        return Number.isFinite(numeric) ? numeric.toFixed(2) : "0.00";
    };

    return (
        <>
            <div
                className="w-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
                style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", height: "300px" }}
            >
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
                                                <Link
                                                    to={`/coursedetail/${course.id}`}
                                                    className="btn px-5 py-2"
                                                    style={{ backgroundColor: "#10a66d", color: "#fff", fontSize: "16px", minWidth: "180px" }}>
                                                    Add To Cart
                                                </Link>
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
                    Go to Cart
                </button>
            </div>
        </>
    );
}

export default Wishlist
