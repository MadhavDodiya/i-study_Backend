import React from 'react'
import { Link } from "react-router-dom"
import bg from "../assets/Images/imgi_47_breadcrumb-bg-2.png"

function Courses() {
  return (
    <>
      <div
        className="w-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
        }}>
        <div className="text-center">
          <h1 className="display-4 fw-bold mt-4" style={{ color: "#0b2c2c" }}>
            Advanced Course Filter
          </h1>

          <div className="d-flex align-items-center justify-content-center gap-2 text-secondary">
            <Link to="/" className='text-decoration-none text-black d-flex align-items-center gap-2'>
              <i className="bi bi-house-door-fill"></i>
              <span>iStudy</span>
            </Link>
            <span className="mx-1"> - </span>
            <span className="fw-medium text-black">Advanced Course Filter</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Courses
