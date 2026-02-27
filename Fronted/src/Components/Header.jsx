import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Images/imgi_2_logo.png";
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

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartPreviewItems, setCartPreviewItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartError, setCartError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/auth/me`, {
          credentials: "include",
        });

        if (response.status === 401) {
          if (isMounted) {
            setCurrentUser(null);
          }
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch current user");
        }

        const payload = await response.json();
        if (isMounted) {
          setCurrentUser(payload.user || null);
          setAuthError("");
        }
      } catch (error) {
        console.error("Header auth fetch error:", error);
        if (isMounted) {
          setCurrentUser(null);
        }
      }
    };

    fetchCurrentUser();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  useEffect(() => {
    let isMounted = true;

    const fetchCartPreview = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/cart`, {
          credentials: "include",
        });

        if (response.status === 401) {
          if (isMounted) {
            setCartPreviewItems([]);
            setCartSubtotal(0);
            setCartCount(0);
            setCartError("");
          }
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch cart preview");
        }

        const payload = await response.json();
        const items = Array.isArray(payload.items) ? payload.items : [];
        const hydratedItems = items.map((item) => ({
          ...item,
          total: Number(item.lineTotal) || 0,
          course: {
            ...item.course,
            img: courseImageMap[item.course?.imageKey] || "",
          },
        }));

        if (isMounted) {
          setCartPreviewItems(hydratedItems);
          setCartSubtotal(Number(payload.subtotal) || 0);
          setCartCount(hydratedItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0));
          setCartError("");
        }
      } catch (error) {
        console.error("Header cart preview fetch error:", error);
        if (isMounted) {
          setCartError("Unable to load cart preview.");
        }
      }
    };

    fetchCartPreview();

    return () => {
      isMounted = false;
    };
  }, [location.pathname, isCartSidebarOpen]);

  useEffect(() => {
    if (!isCartSidebarOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartSidebarOpen]);

  const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;

  const handleSidebarRemove = async (courseId) => {
    try {
      const response = await fetch(`${API_BASE}/api/cart/${courseId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to remove cart item");
      }

      const payload = await response.json();
      const items = Array.isArray(payload.items) ? payload.items : [];
      const hydratedItems = items.map((item) => ({
        ...item,
        total: Number(item.lineTotal) || 0,
        course: {
          ...item.course,
          img: courseImageMap[item.course?.imageKey] || "",
        },
      }));

      setCartPreviewItems(hydratedItems);
      setCartSubtotal(Number(payload.subtotal) || 0);
      setCartCount(hydratedItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0));
      setCartError("");
    } catch (error) {
      console.error("Header cart remove error:", error);
      setCartError("Unable to remove cart item.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok && response.status !== 401) {
        throw new Error("Failed to logout");
      }

      setCurrentUser(null);
      setCartPreviewItems([]);
      setCartSubtotal(0);
      setCartCount(0);
      setCartError("");
      setAuthError("");
      setIsCartSidebarOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      setAuthError("Unable to logout. Please try again.");
    }
  };

  const toggleSubMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSubMenu(!showSubMenu);
  };

  return (
    <>
      <div className="header-topbar text-black small">
        <div className="container">
          <div className="d-none d-md-flex align-items-center justify-content-between py-2">
            <div className="d-flex align-items-center gap-4 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-telephone-outbound-fill"></i>
                <span>(888) 446-7880</span>
              </div>

              <span className="header-divider"></span>

              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-envelope-fill"></i>
                <span>example@istudy.com</span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-geo-alt-fill"></i>
              <span>Brooklyn, NY 12207, New York</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-xl navbar-custom">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="iStudy" />
          </Link>

          <div className="dropdown me-3 d-none d-xl-block">
            <button
              id="categoryDropdown"
              className="btn btn-outline-dark dropdown-toggle"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              type="button"
              aria-expanded="false"
            >
              <i className="bi bi-list me-2"></i>
              Category
            </button>
            <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
              <li><button className="dropdown-item" type="button">Development</button></li>
              <li><button className="dropdown-item" type="button">Marketing</button></li>
              <li><button className="dropdown-item" type="button">Photography</button></li>
              <li><button className="dropdown-item" type="button">Life Style</button></li>
              <li><button className="dropdown-item" type="button">Health &amp; Fitness</button></li>
              <li><button className="dropdown-item" type="button">Data Science</button></li>
              <li><button className="dropdown-item" type="button">Marketing</button></li>
              <li><button className="dropdown-item" type="button">Photography</button></li>
            </ul>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse pb-2 pb-xl-0" id="navMenu">
            <ul className="navbar-nav me-xl-auto gap-lg-3">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              <li className="nav-item dropdown">
                <button
                  id="coursesDropdown"
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Courses
                </button>

                <ul className="dropdown-menu" aria-labelledby="coursesDropdown">

                  {/* 🔽 SUB DROPDOWN */}
                  <li className="dropdown-submenu">
                    <span
                      className="dropdown-item dropdown-toggle"
                      onClick={toggleSubMenu}
                      style={{ cursor: "pointer" }}
                    >
                      Advance Course Filter
                    </span>

                    <ul className={`dropdown-menu sub-menu ${showSubMenu ? "show" : ""}`}>
                      <li>
                        <Link className={`dropdown-item ${location.pathname === "/courses" ? "active" : ""}`} to="/courses">
                          courses
                        </Link>
                      </li>

                      <li>
                        <Link
                          className={`dropdown-item ${location.pathname === "/course_search_filter" ? "active" : ""}`} to="/course_search_filter">
                          Course search filter
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* OTHER LINKS */}
                  <li>
                    <Link className="dropdown-item" to="/courses_filter_category">
                      Courses filter category
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/courses-list">
                      Courses List
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/coursedetail">
                      Courses Details
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/program-details">
                      Program Details
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/course-lesson">
                      Courses Lesson
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/create-course">
                      Create New Courses
                    </Link>
                  </li>

                </ul>
              </li>

              <li className="nav-item dropdown position-static">
                <button
                  id="pagesDropdown"
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  data-bs-display="static"
                  aria-expanded="false">
                  Pages
                </button>

                <div className="dropdown-menu p-4 shadow dropdown-menu-center mega-menu mega-menu--five" aria-labelledby="pagesDropdown">
                  <div className="row">

                    <div className="col-lg-2">
                      <h6>Page Layout 1</h6>
                      <Link className="dropdown-item" to="/contact">
                        Contact Us
                      </Link>

                      <Link className="dropdown-item" to="/about-online-course">
                        About Online Course
                      </Link>

                      <Link className="dropdown-item" to="/about-university">
                        About University
                      </Link>

                      <Link className="dropdown-item" to="/about-modern-schooling">
                        About Modern Schooling
                      </Link>

                      <Link className="dropdown-item" to="/about-kindergarten">
                        About Kindergarten
                      </Link>

                      <Link className="dropdown-item" to="/about-quran-learning">
                        About Quran Learning
                      </Link>

                      <Link className="dropdown-item" to="/history">
                        History
                      </Link>

                      <Link className="dropdown-item" to="/vision">
                        Vision, Mission & Strategy
                      </Link>
                    </div>

                    <div className="col-lg-2">
                      <h6>Page Layout 2</h6>
                      <Link className="dropdown-item" to="/campus">
                        Campus
                      </Link>

                      <Link className="dropdown-item" to="/academic-calendar">
                        Academic Calendar
                      </Link>

                      <Link className="dropdown-item" to="/apply-online">
                        Apply Online
                      </Link>

                      <Link className="dropdown-item" to="/executive-leaders">
                        Executive Leaders
                      </Link>

                      <Link className="dropdown-item" to="/faculty-members">
                        Faculty Members
                      </Link>

                      <Link className="dropdown-item" to="/tuition-fees">
                        Tuition and Other Fees
                      </Link>

                      <Link className="dropdown-item" to="/scholarships">
                        Scholarships & Financial Aid
                      </Link>

                      <Link className="dropdown-item" to="/scholarships-details">
                        Scholarships Details
                      </Link>
                    </div>

                    <div className="col-lg-2">
                      <h6>Page Layout 3</h6>
                      <Link className="dropdown-item" to="/instructor">
                        Instructor
                      </Link>

                      <Link className="dropdown-item" to="/instructor-details">
                        Instructor Details
                      </Link>

                      <Link className="dropdown-item" to="/become-instructor">
                        Become Instructor
                      </Link>

                      <Link className="dropdown-item" to="/event-grid">
                        Event Grid
                      </Link>

                      <Link className="dropdown-item" to="/event-list">
                        Event List
                      </Link>

                      <Link className="dropdown-item" to="/event-details">
                        Event Details
                      </Link>

                      <Link className="dropdown-item" to="/webinar-details">
                        Webinar Details
                      </Link>

                      <Link className="dropdown-item" to="/faqs">
                        Faq's
                      </Link>
                    </div>

                    <div className="col-lg-2">
                      <h6>Page layout 4</h6>
                      <Link className="dropdown-item" to="/pricing">
                        Pricing Table
                      </Link>

                      <Link className="dropdown-item" to="/shop">
                        Shop
                      </Link>

                      <Link className="dropdown-item" to="/shop-v2">
                        Shop V2
                      </Link>

                      <Link className="dropdown-item" to="/book-details">
                        Book Details
                      </Link>

                      <Link className="dropdown-item" to="/shop-details">
                        Shop Details
                      </Link>

                      <Link className="dropdown-item" to="/checkout">
                        Checkout
                      </Link>

                      <Link className="dropdown-item" to="/cart">
                        Cart
                      </Link>

                      <Link className="dropdown-item" to="/wishlist">
                        Wishlist
                      </Link>
                    </div>

                    <div className="col-lg-2">
                      <h6>Page layout 5</h6>
                      <Link className="dropdown-item" to="/login">
                        Sign In
                      </Link>

                      <Link className="dropdown-item" to="/register">
                        Sign Up
                      </Link>

                      <Link className="dropdown-item" to="/forgot-password">
                        Forgot Password
                      </Link>

                      <Link className="dropdown-item" to="/404">
                        404 Page
                      </Link>

                      <Link className="dropdown-item" to="/coming-soon">
                        Coming Soon
                      </Link>

                      <Link className="dropdown-item" to="/maintenance">
                        Under Maintenance
                      </Link>

                      <Link className="dropdown-item" to="/terms">
                        Terms and Conditions
                      </Link>

                      <Link className="dropdown-item" to="/privacy">
                        Privacy & Policy
                      </Link>
                    </div>

                  </div>
                </div>
              </li>

              <li className="nav-item dropdown">
                <button
                  id="dashboardDropdown"
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dashboard
                </button>
                <ul className="dropdown-menu" aria-labelledby="dashboardDropdown">
                  <li><Link className="dropdown-item" to="/dashboard/student">Student Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/dashboard/instructor">Instructor Dashboard</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown position-static">
                <button
                  id="elementsDropdown"
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  data-bs-display="static"
                  aria-expanded="false">
                  Elements
                </button>

                <div className="dropdown-menu p-4 shadow dropdown-menu-center mega-menu" aria-labelledby="elementsDropdown">
                  <div className="row">

                    <div className="col-lg-3">
                      <h6>UI</h6>
                      <Link className="dropdown-item" to="/elements/buttons">Buttons</Link>
                      <Link className="dropdown-item" to="/elements/cards">Cards</Link>
                    </div>

                    <div className="col-lg-3">
                      <h6>Forms</h6>
                      <Link className="dropdown-item" to="/elements/inputs">Inputs</Link>
                      <Link className="dropdown-item" to="/elements/select">Select</Link>
                    </div>

                    <div className="col-lg-3">
                      <h6>Layout</h6>
                      <Link className="dropdown-item" to="/elements/grid">Grid</Link>
                      <Link className="dropdown-item" to="/elements/flex">Flex</Link>
                    </div>

                    <div className="col-lg-3">
                      <h6>Extra</h6>
                      <Link className="dropdown-item" to="/elements/icons">Icons</Link>
                      <Link className="dropdown-item" to="/elements/tabs">Tabs</Link>
                    </div>

                  </div>
                </div>
              </li>

              <li className="nav-item dropdown">
                <button
                  id="blogDropdown"
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Blog
                </button>
                <ul className="dropdown-menu" aria-labelledby="blogDropdown">
                  <li><Link className="dropdown-item" to="/blog">Blog standard</Link></li>
                  <li><Link className="dropdown-item" to="/blog/details">Blog Advance</Link></li>
                  <li><Link className="dropdown-item" to="/blog/details">Blog Details</Link></li>
                </ul>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-3 nav-actions mt-3 mt-xl-0 flex-wrap">
              <button className="btn btn-link p-0 text-dark" type="button" aria-label="Search">
                <i className="bi bi-search fs-5"></i>
              </button>

              <button
                type="button"
                className="btn btn-link p-0 position-relative text-dark text-decoration-none"
                aria-label="Open cart sidebar"
                onClick={() => setIsCartSidebarOpen(true)}>
                <i className="bi bi-cart fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  {cartCount}
                </span>
              </button>

              <div className="d-flex align-items-center gap-2 flex-wrap">
                {currentUser ? (
                  <>
                    <span className="small text-dark">Hi, {currentUser.name}</span>
                    <button
                      type="button"
                      className="btn btn-outline-danger d-none d-sm-block"
                      onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link className="btn btn-outline-success d-none d-sm-block" to="/login">Login</Link>
                    <Link className="btn btn-success" to="/register">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {authError ? (
        <div className="container mt-2">
          <p className="text-danger small mb-0">{authError}</p>
        </div>
      ) : null}

      {isCartSidebarOpen && (
        <button
          type="button"
          className="position-fixed top-0 start-0 w-100 h-100 border-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1040 }}
          onClick={() => setIsCartSidebarOpen(false)}
          aria-label="Close cart sidebar overlay"
        />
      )}

      <aside
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg d-flex flex-column"
        style={{
          width: "380px",
          maxWidth: "100%",
          zIndex: 1050,
          transform: isCartSidebarOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease"
        }}>
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <h5 className="mb-0 fw-bold">Your Cart ({cartCount})</h5>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setIsCartSidebarOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="flex-grow-1 overflow-auto p-3">
          {cartError ? (
            <p className="text-danger small mb-3">{cartError}</p>
          ) : null}

          {cartPreviewItems.length === 0 ? (
            <p className="text-muted mb-0">Your cart is empty.</p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cartPreviewItems.map((item) => (
                <div key={item.courseId} className="d-flex gap-3 border rounded-3 p-2">
                  <img
                    src={item.course.img}
                    alt={item.course.title}
                    style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "10px" }}
                  />
                  <div className="flex-grow-1">
                    <p className="mb-1 fw-semibold" style={{ fontSize: "14px", lineHeight: "1.35" }}>
                      {item.course.title}
                    </p>
                    <p className="mb-2 text-muted" style={{ fontSize: "13px" }}>
                      {item.quantity} x {formatCurrency(item.unitPrice)}
                    </p>
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-danger p-0 text-decoration-none"
                      onClick={() => handleSidebarRemove(item.courseId)}>
                      Remove
                    </button>
                  </div>
                  <p className="mb-0 fw-semibold text-success">{formatCurrency(item.total)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-top p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Subtotal</span>
            <span className="fw-bold">{formatCurrency(cartSubtotal)}</span>
          </div>

          <div className="d-grid gap-2">
            <Link className="btn btn-success" to="/cart" onClick={() => setIsCartSidebarOpen(false)}>
              Go To Cart
            </Link>
            <Link
              className="btn btn-outline-secondary"
              to="/courses"
              onClick={() => setIsCartSidebarOpen(false)}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Header
