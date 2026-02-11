import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Categories from '../Data/Categories';
import courses from '../Data/Courses';
import banner from '../assets/Images/imgi_20_banner-img-1.png';
import banner1 from '../assets/Images/imgi_29_about-thumb-01.png';
import banner2 from '../assets/Images/imgi_30_about-thumb-small-01.png';
import plan1 from '../assets/Images/imgi_44_pricing_thumb01.png';
import plan2 from '../assets/Images/imgi_46_pricing_thumb02.png';
import plan3 from '../assets/Images/imgi_47_pricing_thumb03.png';


function Home() {

  const plans = [
    {
      title: "Basic Plan",
      courses: "10",
      desc: "Perfect for beginners, offering essential courses and community support.",
      price: "$15.00",
      features: [
        "Access to Free Courses",
        "Community Support",
        "1 Certificate",
        "Limited Resources",
      ],
      img: plan1,
    },
    {
      title: "Standard Plan",
      courses: "20",
      desc: "Great for advancing skills with diverse courses and added resources.",
      price: "$30.00",
      features: [
        "Access to All Courses",
        "Priority Support",
        "3 Certificates",
        "Downloadable Resources",
      ],
      img: plan2,
      highlight: true,
    },
    {
      title: "Premium Plan",
      courses: "Unlimited",
      desc: "Unlimited access with expert mentorship and exclusive perks.",
      price: "$50.00",
      features: [
        "All Access Pass",
        "1-on-1 Mentorship",
        "Unlimited Certificates",
        "Exclusive Webinars",
      ],
      img: plan3,
    },
  ];

  const testimonials = [
    {
      name: "Emily Davis",
      text: "Joining iStudy was the best decision I made this year. The course variety and personalized learning paths helped me achieve my professional goals with ease.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "John Smith",
      text: "Amazing platform! Courses are well structured and mentors are very helpful.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sophia Lee",
      text: "I improved my skills and got a job thanks to these courses.",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <>
      {/* HERO */}
      <div className="container-fluid bg-[#d9f6ee]">
        <div className="container pt-5">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6 mt-3 mt-lg-5 text-center text-lg-start">
              <p className='text-[#07A169] fw-semibold'>WELCOME TO STUDY</p>
              <p className='hero-title fw-bold mb-0'>Discover <span className='text-[#ffb800]'>2700+</span></p>
              <p className='hero-title fw-bold mb-0'>Online Courses</p>
              <p className='hero-title fw-bold'>available in the world</p>
              <p className='text-gray-500 pt-3'>They are not liable for any offense caused by those who fail to carry out their duties.</p>

              <div className="hero-actions d-flex flex-wrap align-items-center gap-3 mt-3 justify-content-center justify-content-lg-start">
                <button className='btn1'>Find Courses</button>
                <button className='btn btn-link p-0 text-[#ffb800] text-decoration-none hero-video-btn'>
                  <i className="fa-solid fa-play"></i> Watch Video
                </button>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img src={banner} alt="banner" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      {/* GREEN FEATURES */}
      <section className="bg-emerald-600 py-8">
        <div className="container">
          <div className="row text-white g-3">

            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-center gap-3 feature-item">
              <div className="bg-white rounded-circle p-3">
                <i className="fa-solid fa-laptop text-success fs-3"></i>
              </div>
              <p>Gain expertise with access to over <b>24,000 video courses</b></p>
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-center gap-3 feature-item">
              <div className="bg-white rounded-circle p-3">
                <i className="fa-solid fa-user-graduate text-success fs-3"></i>
              </div>
              <p>Learn from <b>industry experts</b></p>
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-center gap-3 feature-item">
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

      <div className="top-categories-section">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="top-categories-title fw-bold">
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
          <div className="row align-items-center gy-4">

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
            <div className="col-lg-6 text-white about-content">
              <p className="text-warning fw-semibold mb-2">ABOUT US</p>
              <h1 className="fw-bold mb-3 about-title">
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
        <p className='trending-title fw-bold'>Find Your Course</p>
      </div>


      <div className="container py-5">
        <div className="row g-4">

          {courses.map((c, i) => (
            <div className="col-12 col-md-6 col-xl-4" key={i}>
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

                  <p className='text-gray-500'>{c.desc1}</p>

                  <p className='text-gray-500'><span className='text-green-500 px-2 text-2xl'><i className="bi bi-check"></i></span>{c.p1}</p>
                  <p className='text-gray-500'><span className='text-green-500 px-2 text-2xl'><i className="bi bi-check"></i></span>{c.p2}</p>
                  <p className='text-gray-500'><span className='text-green-500 px-2 text-2xl'><i className="bi bi-check"></i></span>{c.p3}</p>
                  <p className='text-gray-500'><span className='text-green-500 px-2 text-2xl'><i className="bi bi-check"></i></span>{c.p4}</p>

                  <h5>
                    {c.price}
                    <del className="text-muted fs-6 ms-2">{c.oldPrice}</del>
                  </h5>

                  <div className="d-flex gap-2 mt-3 flex-wrap card-hover-actions">
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

      <div className="container items-center text-center py-4 pb-5 see-more-wrap">
        <button className="btn1 btn1-lg">
          see more courses
        </button>
      </div>

      <div className="container text-center mt-5 mb-5">
        <p className='text-green-500'>CHOOSE YOUR PERFECT PLAN</p>
        <p className='trending-title fw-bold'>Flexible Learning Options</p>
      </div>

      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <div key={i} className={'rounded-xl overflow-hidden transition border'}>
              {/* IMAGE */}
              <div className="relative">
                <img src={plan.img} className="w-full h-52 object-cover" alt="" />

                <div className="absolute bottom-0 left-0 w-full bg-black/20 p-2">
                  <h2 className="text-white text-xl font-semibold">
                    {plan.title}
                  </h2>
                </div>

                <div className="absolute right-0 bottom-0 bg-green-600 text-white px-6 py-3 text-center">
                  <div className="text-2xl font-bold">{plan.courses}</div>
                  <div className="text-sm">Courses</div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{plan.desc}</p>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-600">✔</span> {f}
                    </li>
                  ))}
                </ul>

                <div className="mb-4">
                  <p className="text-sm text-gray-500">START FROM</p>
                  <p className="text-3xl font-bold text-green-600">
                    {plan.price}
                    <span className="text-sm text-black"> /MONTH</span>
                  </p>
                </div>

                <button className="font-semibold hover:text-green-600">
                  View Plans →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <div className="grid lg:grid-cols-2">

          {/* LEFT IMAGE */}
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b" className="w-full h-[350px] md:h-[500px] lg:h-full object-cover" />

            {/* play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-14 h-14 border-2 border-white rounded-full flex items-center justify-center">
                  <i className="bi bi-play-fill text-white text-2xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="bg-gradient-to-br from-green-600 to-green-500 text-white p-8 md:p-14 flex items-center">
            <div className="max-w-xl">

              <p className="text-yellow-300 font-semibold mb-2">
                TESTIMONIALS
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Our Students Saying
              </h2>

              {/* SWIPER */}
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                loop={true}
                className="pb-10">
                {testimonials.map((t, i) => (
                  <SwiperSlide key={i}>
                    <div>
                      {/* stars */}
                      <div className="text-yellow-400 text-lg mb-4">
                        ⭐⭐⭐⭐⭐
                      </div>

                      <p className="text-lg opacity-90 mb-6">
                        {t.text}
                      </p>

                      <div className="flex items-center gap-3">
                        <img src={t.img} className="w-12 h-12 rounded-full"/>
                        <span className="font-semibold">{t.name}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;