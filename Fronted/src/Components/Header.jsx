import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Images/imgi_2_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function Header() {
  return (
    <>
      <div className="bg-[#ffb800] text-black text-sm">
        <div className="max-w-7xl mx-auto px-4">

          <div className="hidden md:flex items-center justify-between h-12">

            <div className="flex items-center gap-6">

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-outbound-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5" />
                </svg>
                <span>(888) 446-7880</span>
              </div>

              <div className="w-px h-5 bg-black/40"></div>

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
                <span>example@istudy.com</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
              </svg>
              <span>Brooklyn, NY 12207, New York</span>
            </div>

          </div>

          <div className="md:hidden py-2 space-y-1 text-center">
            <div>(888) 446-7880</div>
            <div>example@istudy.com</div>
            <div>Brooklyn, NY 12207, New York</div>
          </div>

        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-custom navbar-bg-[#daf4ed]">
        <div className="container">

          {/* LOGO */}
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="iStudy" />
          </Link>

          {/* CATEGORY */}
          <div className="dropdown me-3 d-none d-lg-block">
            <button className="btn btn-light border dropdown-toggle" data-bs-toggle="dropdown">
              <i className="bi bi-list me-2"></i>
              Category
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item">Develpment</Link></li>
              <li><Link className="dropdown-item">Marketing</Link></li>
              <li><Link className="dropdown-item">Photography</Link></li>
              <li><Link className="dropdown-item">Life Style</Link></li>
              <li><Link className="dropdown-item">Health & Fitness</Link></li>
              <li><Link className="dropdown-item">Datascience</Link></li>
              <li><Link className="dropdown-item">Marketing</Link></li>
              <li><Link className="dropdown-item">Photography</Link></li>
            </ul>
          </div>

          {/* MOBILE TOGGLE */}
          <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENU */}
          <div className="navbar-collapse" id="navMenu">

            <ul className="navbar-nav mx-auto gap-lg-3">

              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>

              {/* COURSES */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                  Courses
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="">Advance Course Filter</Link></li>
                  <li><Link className="dropdown-item" to="">Courses grid</Link></li>
                  <li><Link className="dropdown-item" to="">Courses List</Link></li>
                  <li><Link className="dropdown-item" to="">Courses Details</Link></li>
                  <li><Link className="dropdown-item" to="">Program Details</Link></li>
                  <li><Link className="dropdown-item" to="">Courses Lesson</Link></li>
                  <li><Link className="dropdown-item" to="">create New Courses</Link></li>
                </ul>
              </li>

              {/* PAGES MEGA */}
              <li className="nav-item dropdown position-static">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  Pages
                </button>

                <div className="dropdown-menu p-4 shadow dropdown-menu-center mega-menu mega-menu--five">
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
                      <Link className="dropdown-item" to="/signin">
                        Sign In
                      </Link>

                      <Link className="dropdown-item" to="/signup">
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

              {/* DASHBOARD */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dashboard
                </button>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/dashboard/student">Student Dashboard</Link></li>
                  <li><Link className="dropdown-item" to="/dashboard/instructor">Instructor Dashboard</Link></li>
                </ul>
              </li>

              {/* ELEMENTS MEGA */}
              <li className="nav-item dropdown position-static">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  Elements
                </button>

                <div className="dropdown-menu p-4 shadow dropdown-menu-center mega-menu">
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

              {/* BLOG */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle btn btn-link"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Blog
                </button>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/blog">Blog standard</Link></li>
                  <li><Link className="dropdown-item" to="/blog/details">Blog Advance</Link></li>
                  <li><Link className="dropdown-item" to="/blog/details">Blog Details</Link></li>
                </ul>
              </li>

            </ul>

            {/* RIGHT */}
            <div className="d-flex align-items-center gap-3">

              <i className="bi bi-search fs-5"></i>

              <div className="position-relative">
                <i className="bi bi-cart fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  3
                </span>
              </div>

              <Link className="btn btn-outline-success d-none d-sm-block" to="/login">Login</Link>
              <Link className="btn btn-success" to="/register">Register</Link>

            </div>

          </div>
        </div>
      </nav>



    </>
  );
}

export default Header
