import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ================= CTA CARDS ================= */}
      <div className="bg-light pt-5 footer-cta-wrap">
        <div className="container">
          <div className="bg-white rounded-4 shadow p-4 position-relative footer-cta-shell" style={{ marginBottom: "-70px", zIndex: 10 }}>
            <div className="row g-3 g-md-4">

              {/* CARD 1 */}
              <div className="col-md-6">
                <div className="rounded-4 p-4 h-100 d-flex flex-column flex-sm-row justify-content-between align-items-center text-center text-sm-start footer-cta-card" style={{ background: "#e7f5ef" }}>
                  <div>
                    <p className="text-warning fw-bold small">START YOUR JOURNEY TODAY</p>
                    <h4 className="fw-bold">Become an Instructor & Share Your Expertise</h4>
                    <button className="btn btn-warning mt-3">Learn More</button>
                  </div>
                  <img src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png" height="120" alt="Instructor" className="footer-cta-image mt-3 mt-sm-0" />
                </div>
              </div>

              {/* CARD 2 */}
              <div className="col-md-6">
                <div className="rounded-4 p-4 h-100 d-flex flex-column flex-sm-row justify-content-between align-items-center text-center text-sm-start footer-cta-card" style={{ background: "#f5efe2" }}>
                  <div>
                    <p className="text-success fw-bold small">UNLOCK YOUR POTENTIAL</p>
                    <h4 className="fw-bold">Enhance Your Skills and Stay Ahead</h4>
                    <button className="btn btn-success mt-3">Explore Courses</button>
                  </div>
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png" height="120" alt="Skills" className="footer-cta-image mt-3 mt-sm-0" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer style={{ background: "#022c22" }} className="text-white pt-5 pb-3 footer-main">
        <div className="container pt-5">
          <div className="row g-4 mt-3 text-center text-md-start">

            {/* LOGO */}
            <div className="col-lg-3">
              <h3 className="fw-bold">iStudy</h3>
              <p className="text-white-50 small">
                Education focused website template provides visitors with insights into programs or services offered.
              </p>
              <div className="d-flex gap-2 justify-content-center justify-content-md-start">
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{width: 35, height: 35}}><i className="bi bi-facebook"></i></a>
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{width: 35, height: 35}}><i className="bi bi-twitter-x"></i></a>
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{width: 35, height: 35}}><i className="bi bi-linkedin"></i></a>
                <a href="#" className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center" style={{width: 35, height: 35}}><i className="bi bi-instagram"></i></a>
              </div>
            </div>

            {/* LINKS */}
            <div className="col-lg-2 col-6">
              <h6 className="fw-bold">Links</h6>
              <ul className="list-unstyled small d-flex flex-column gap-2">
                <li><Link to="/about" className="text-white-50 text-decoration-none">About Us</Link></li>
                <li><Link to="/news" className="text-white-50 text-decoration-none">News</Link></li>
                <li><Link to="/event" className="text-white-50 text-decoration-none">Event</Link></li>
                <li><Link to="/shop" className="text-white-50 text-decoration-none">Shop</Link></li>
                <li><Link to="/pricing" className="text-white-50 text-decoration-none">Pricing Table</Link></li>
              </ul>
            </div>

            <div className="col-lg-2 col-6">
              <h6 className="fw-bold">Class</h6>
              <ul className="list-unstyled small d-flex flex-column gap-2">
                <li><Link to="/courses" className="text-white-50 text-decoration-none">Courses</Link></li>
                <li><Link to="/instructor" className="text-white-50 text-decoration-none">Instructor</Link></li>
                <li><Link to="/instructor-details" className="text-white-50 text-decoration-none">Instructor Details</Link></li>
                <li><Link to="/become-instructor" className="text-white-50 text-decoration-none">Become Instructor</Link></li>
                <li><Link to="/student-panel" className="text-white-50 text-decoration-none">Student Panel</Link></li>
              </ul>
            </div>

            <div className="col-lg-2 col-6">
              <h6 className="fw-bold">Support</h6>
              <ul className="list-unstyled small d-flex flex-column gap-2">
                <li><Link to="/contact" className="text-white-50 text-decoration-none">Contact</Link></li>
                <li><Link to="/faq" className="text-white-50 text-decoration-none">FAQ</Link></li>
                <li><Link to="/terms" className="text-white-50 text-decoration-none">Terms</Link></li>
                <li><Link to="/privacy" className="text-white-50 text-decoration-none">Privacy</Link></li>
              </ul>
            </div>

            {/* NEWSLETTER */}
            <div className="col-lg-3">
              <h6 className="fw-bold">Newsletter</h6>
              <p className="small text-white-50">Subscribe to get latest updates.</p>

              <div className="input-group mb-2">
                <input className="form-control" placeholder="Email" />
                <button className="btn btn-success">Subscribe</button>
              </div>

              <small>
                <input type="checkbox" className="me-2" />
                I agree to website terms
              </small>
            </div>

          </div>

          <hr className="border-success mt-4" />

          <p className="text-center small m-0">
            © Copyright 2026 | Developed By iStudy
          </p>
        </div>
      </footer>

      {/* ================= SCROLL TOP ================= */}
      <button
        onClick={scrollTop}
        className={`btn btn-success rounded-circle position-fixed d-flex align-items-center justify-content-center shadow-lg ${showTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{ bottom: "25px", right: "25px", width: "50px", height: "50px", zIndex: 999, transition: "all 0.3s ease-in-out" }}
      >
        <i className="bi bi-arrow-up fs-5"></i>
      </button>
    </>
  );
}
