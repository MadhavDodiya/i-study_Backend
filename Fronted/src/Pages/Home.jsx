import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from '../Data/Categories';
import courses from '../Data/Courses';
import banner from '../assets/Images/imgi_20_banner-img-1.png';
import banner1 from '../assets/Images/imgi_29_about-thumb-01.png';
import banner2 from '../assets/Images/imgi_30_about-thumb-small-01.png';
// import course1 from '../assets/Images/course1.png';
// import course2 from '../assets/Images/course2.png';
// import course3 from '../assets/Images/course3.png';


function Home() {

  // const categories = [
  //   { title: "Graphics Design", courses: 30, icon: "fa-brain" },
  //   { title: "Web Development", courses: 20, icon: "fa-code" },
  //   { title: "Photography", courses: 25, icon: "fa-camera" },
  //   { title: "Business Analysis", courses: 35, icon: "fa-chart-line" },
  //   { title: "Digital Marketing", courses: 40, icon: "fa-bullhorn" },
  //   { title: "Data Science", courses: 15, icon: "fa-database" },
  //   { title: "Health & Fitness", courses: 10, icon: "fa-dumbbell" },
  //   { title: "Dance & Music", courses: 25, icon: "fa-music" },
  // ];

  return (
    <>
      {/* HERO */}
      <div className="container-fluid bg-[#d9f6ee]">
        <div className="container pt-5">
          <div className="row">
            <div className="col-lg-6 mt-5">
              <p className='text-[#07A169]'>WELCOME TO STUDY</p>
              <p className='text-5xl font-bold'>Discover <span className='text-[#ffb800]'>2700+</span></p>
              <p className='text-5xl font-bold'>Online Courses</p>
              <p className='text-5xl font-bold'>available in the world</p>
              <p className='text-gray-500 pt-3'>They are not liable for any offense caused by those who fail to carry out their duties.</p>

              <button className='bg-[#07A169] text-white px-5 py-3 rounded mt-3'>Find Courses</button>
              <button className='ms-3 text-[#ffb800]'>
                <i className="fa-solid fa-play"></i> Watch Video
              </button>
            </div>

            <div className="col-lg-6">
              <img src={banner} alt="banner" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      {/* GREEN FEATURES */}
      <section className="bg-emerald-600 py-8">
        <div className="container">
          <div className="row text-white">

            <div className="col-lg-4 d-flex align-items-center gap-3 mb-3">
              <div className="bg-white rounded-circle p-3">
                <i className="fa-solid fa-laptop text-success fs-3"></i>
              </div>
              <p>Gain expertise with access to over <b>24,000 video courses</b></p>
            </div>

            <div className="col-lg-4 d-flex align-items-center gap-3 mb-3">
              <div className="bg-white rounded-circle p-3">
                <i className="fa-solid fa-user-graduate text-success fs-3"></i>
              </div>
              <p>Learn from <b>industry experts</b></p>
            </div>

            <div className="col-lg-4 d-flex align-items-center gap-3 mb-3">
              <div className="bg-white rounded-circle p-3">
                <i className="fa-solid fa-mobile text-success fs-3"></i>
              </div>
              <p>Learn anytime anywhere</p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* TOP CATEGORIES SECTION */}
      {/* ========================= */}

      <div style={{ background: "#f3f4f6", padding: "80px 0" }}>
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold" style={{ fontSize: "42px", color: "#063b2e" }}>
              Top Categories
            </h2>
            <div style={{
              width: "140px",
              height: "8px",
              background: "#facc15",
              borderRadius: "20px",
              margin: "10px auto"
            }}></div>
          </div>

          <div className="row g-4">
            {Categories.map((item, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div className="bg-white border rounded-4 p-4 d-flex align-items-center gap-3 h-100 categoryCard">

                  <div className="iconBox">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>

                  <div>
                    <h5 className="fw-semibold mb-1">{item.title}</h5>
                    <p className="text-muted mb-0">{item.courses} course</p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ================= ABOUT SECTION ================= */}

      <div className="about-section py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* LEFT IMAGES */}
            <div className="col-lg-6 position-relative mb-5 mb-lg-0">

              {/* Yellow box background */}
              <div className="yellow-box"></div>

              {/* Main Image */}
              <img src={banner1} alt="" className="img-fluid rounded main-img" />

              {/* Small Image */}
              <img src={banner2} alt="" className="img-fluid rounded small-img shadow" />
            </div>

            {/* RIGHT CONTENT */}
            <div className="col-lg-6 text-white">
              <p className="text-warning fw-semibold mb-2">ABOUT US</p>
              <h1 className="fw-bold mb-3">
                A New Different Way To <br />
                Improve Your <span className="highlight">Skills</span>
              </h1>

              <p className="opacity-75 mb-4 border-start ps-3">
                Education is one of the most essential and valuable assets that an
                individual can possess. It plays a pivotal role in shaping
              </p>

              {/* ITEM 1 */}
              <div className="d-flex mb-4">
                <div className="icon-circle me-3">
                  <i className="fa-solid fa-book"></i>
                </div>
                <div>
                  <h6 className="fw-bold">Flexible Classes</h6>
                  <p className="small opacity-75 mb-0">
                    The Flexible Classes feature allows students to customize their learning schedule
                  </p>
                </div>
              </div>

              {/* ITEM 2 */}
              <div className="d-flex mb-4">
                <div className="icon-circle me-3">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div>
                  <h6 className="fw-bold">Expert Trainers</h6>
                  <p className="small opacity-75 mb-0">
                    All trainers hold relevant certifications and advanced degrees, guaranteeing that you are learning from qualified experts
                  </p>
                </div>
              </div>

              {/* ITEM 3 */}
              <div className="d-flex mb-4">
                <div className="icon-circle me-3">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <div>
                  <h6 className="fw-bold">Build Your Career</h6>
                  <p className="small opacity-75 mb-0">
                    All trainers hold relevant certifications and advanced degrees, guaranteeing that you are learning from qualified experts
                  </p>
                </div>
              </div>

              <button className="btn btn-warning px-4 py-2 mt-2">
                Know More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center mt-5 mb-5">
        <p className='text-green-500'>TRENDING COURSES</p>
        <p className='text-5xl font-bold'>Find Your Course</p>
      </div>


      <div className="container py-5">
        <div className="row g-4">

          {courses.map((c, i) => (
            <div className="col-lg-4" key={i}>
              <div className="course-card">

                {/* NORMAL */}
                <div className="card-front">
                  <div className="position-relative">
                    <img src={c.img} className="w-100 rounded-top" />
                    <span className="badge bg-warning position-absolute top-0 end-0 m-3">
                      {c.badge}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="d-flex justify-content-between small text-muted mb-2">
                      <span>{c.lessons} Lessons</span>
                      <span>{c.students} Students</span>
                    </div>

                    <h5 className="fw-bold">{c.title}</h5>
                    <p className="text-muted">{c.desc}</p>

                    <div className="text-warning mb-3" aria-label={`Rating ${c.rating} out of 5`}>
                      &#9733;&#9733;&#9733;&#9733;&#9733; ({c.rating})
                    </div>

                    <button className="btn btn-outline-success w-100">
                      Enroll Now
                    </button>
                  </div>
                </div>


                {/* HOVER */}
                <div className="card-hover p-4">
                  <span className="badge bg-success mb-3">Certificate Badge</span>

                  <h5 className="fw-bold">{c.hoverTitle}</h5>

                  <p>Level : <span className="text-success">{c.level}</span></p>

                  <p className=''>{c.desc1}</p>

                  <h5>
                    {c.price}
                    <del className="text-muted fs-6 ms-2">{c.oldPrice}</del>
                  </h5>

                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-success">View Details</button>
                    <button className="btn btn-warning">
                      <i className="fa fa-heart"></i>
                    </button>
                    <button className="btn btn-info">
                      <i className="fa fa-share"></i>
                    </button>
                  </div>

                  <button className="btn btn-outline-success w-100 mt-3">
                    Enroll Now
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

    </>
  )
}

export default Home;