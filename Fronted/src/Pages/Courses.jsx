import React, { useState } from 'react'
import { Link } from "react-router-dom"
import bg from "../assets/Images/imgi_47_breadcrumb-bg-2.png";
import img1 from "../assets/Images/course1.png";
import img2 from "../assets/Images/course2.png";
import img3 from "../assets/Images/course3.png";
import img4 from "../assets/Images/course4.png";
import img5 from "../assets/Images/course5.png";
import img6 from "../assets/Images/course6.png";
import img7 from "../assets/Images/course7.png";
import img8 from "../assets/Images/course8.png";

function Courses() {
  const [view, setView] = useState("grid");
  const [showFilter, setShowFilter] = useState(false);

  const course = [
    {
      img: img1,
      lesson: "45",
      title: "Master of Data science from scratch",
      desc: "Empower your career with data science skills that are in high demand across industries.",
      star: "( 4.8/5 Ratings )"
    },
    {
      img: img2,
      lesson: "45",
      title: "Master of Data science from scratch",
      desc: "Empower your career with data science skills that are in high demand across industries.",
      star: "( 4.8/5 Ratings )"
    },
    {
      img: img3,
      lesson: "45",
      title: "Master of Data science from scratch",
      desc: "Empower your career with data science skills that are in high demand across industries.",
      star: "( 4.8/5 Ratings )"
    },
    {
      img: img4,
      lesson: "45",
      title: "Master of Data science from scratch",
      desc: "Empower your career with data science skills that are in high demand across industries.",
      star: "( 4.8/5 Ratings )"
    },
    {
      img: img5,
      lesson: "45",
      title: "Master of Data science from scratch",
      desc: "Empower your career with data science skills that are in high demand across industries.",
      star: "( 4.8/5 Ratings )"
    },
    {
      img: img6,
      lesson: "45",
      title: "Master of Data science from scratch",
      desc: "Empower your career with data science skills that are in high demand across industries.",
      star: "( 4.8/5 Ratings )"
    },
    {
      img: img7,
      lesson: "45",
      title: "Master of Data science from scratch",
      desc: "Empower your career with data science skills that are in high demand across industries.",
      star: "( 4.8/5 Ratings )"
    },
    {
      img: img8,
      lesson: "45",
      title: "Master of Data science from scratch",
      desc: "Empower your career with data science skills that are in high demand across industries.",
      star: "( 4.8/5 Ratings )"
    },
  ]


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

      <div>
        {/* TOP BAR */}
        <div className="w-100 bg-light border-bottom">
          <div className="container py-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">

            <h2 className="fs-5 fw-semibold mb-0">
              We found <span className="text-success fw-bold">14</span> courses available for you
            </h2>

            <div className="d-flex align-items-center gap-3">
              <span className="fw-medium">Grid</span>

              {/* GRID BUTTON */}
              <button
                onClick={() => setView("grid")}
                className={`btn d-flex align-items-center justify-content-center ${view === "grid"
                  ? "btn-success text-white"
                  : "btn-outline-secondary"
                  }`}
                style={{ width: "45px", height: "45px" }}
              >
                <i className="bi bi-grid-fill fs-5"></i>
              </button>

              {/* LIST BUTTON */}
              <button
                onClick={() => setView("list")}
                className={`btn d-flex align-items-center justify-content-center ${view === "list"
                  ? "btn-success text-white"
                  : "btn-outline-secondary"
                  }`}
                style={{ width: "45px", height: "45px" }}
              >
                <i className="bi bi-list-ul fs-5"></i>
              </button>

              {/* FILTER BUTTON */}
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="btn btn-light border d-flex align-items-center gap-2"
                style={{ height: "45px" }}
              >
                <i className="bi bi-sliders"></i>
                Filters
                <i className="bi bi-chevron-down"></i>
              </button>
            </div>
          </div>
        </div>

        {/* FILTER PANEL */}
        {showFilter && (
          <div className="container py-4 border-bottom bg-light">
            <h3 className="fw-bold mb-3">Filter Panel</h3>
            <p>Add your filters here...</p>
          </div>
        )}

        {/* COURSES */}
        <div className="container py-5">

          {/* GRID VIEW */}
          {view === "grid" && (
            <div className="row g-4">
              {course.map((c, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                  <div className="border rounded-4 overflow-hidden shadow-sm h-100">
                    <img src={c.img} alt="" className='img-fluid w-100' />
                    <div className="p-3">
                      <p className='text-secondary mb-1'>Lessons {c.lesson}</p>
                      <h5 className='fw-bold mb-2'>{c.title}</h5>
                      <p className='text-muted mb-2'>{c.desc}</p>
                      <p className='mb-0'>{c.star}</p>
                    </div>
                    <hr className="m-0" />
                    <div className="p-3">
                      <button className='btn btn-outline-success w-100'>
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LIST VIEW */}
          {view === "list" && (
            <div className="d-flex flex-column gap-3">
              {course.map((c, index) => (
                <div key={index} className="border p-3 rounded shadow-sm d-flex flex-column flex-md-row gap-3 align-items-center">
                  <img src={c.img} alt="" className='rounded' style={{ width: "100%", maxWidth: "200px", height: "auto", objectFit: "cover" }} />
                  <div className="flex-grow-1">
                    <h5 className='fw-bold mb-1'>{c.title}</h5>
                    <p className='text-muted mb-1 small'>{c.desc}</p>
                    <div className="d-flex align-items-center gap-3 text-muted small">
                      <span>Lessons {c.lesson}</span>
                      <span>{c.star}</span>
                    </div>
                  </div>
                  <button className='btn btn-outline-success align-self-stretch align-self-md-center'>
                    Enroll Now
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>

    </>
  )
}

export default Courses
