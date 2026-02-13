import React, { useEffect, useState } from "react";
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
import testi1 from '../assets/Images/imgi_49_avatar3.png';
import testi2 from '../assets/Images/imgi_50_avatar.png';
import testi3 from '../assets/Images/imgi_51_avatar2.png';
import team1 from '../assets/Images/imgi_52_instructor-thumb-01.png';
import team2 from '../assets/Images/imgi_53_instructor-thumb-02.png';
import team3 from '../assets/Images/imgi_54_instructor-thumb-03.png';
import team4 from '../assets/Images/instructor-thumb-04.webp';
import logo1 from '../assets/Images/imgi_62_partner-01.png';
import logo2 from '../assets/Images/imgi_63_partner-02.png';
import logo3 from '../assets/Images/imgi_64_partner-03.png';
import logo4 from '../assets/Images/imgi_65_partner-04.png';
import logo5 from '../assets/Images/imgi_66_partner-05.png';
import logo6 from '../assets/Images/imgi_67_partner-06.png';
import logo7 from '../assets/Images/imgi_68_partner-07.png';
import logo8 from '../assets/Images/imgi_69_partner-08.png';
import img1 from "../assets/Images/blog-thumb-01.webp";
import img2 from "../assets/Images/blog-thumb-02.webp";
import img3 from "../assets/Images/blog-thumb-03.webp";


function Counter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}+</span>;
}

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
      name: "Sarah Jhonson",
      text: "The courses on iStudy have transformed my career. The practical projects and expert instructors made learning seamless and enjoyable. Highly recommend it!",
      img: testi1,
    },
    {
      name: "James Parker",
      text: "iStudy is a game-changer! The flexible schedules and top-notch content allowed me to upskill while managing my busy routine.",
      img: testi2,
    },
    {
      name: "Emily Davis",
      text: "Joining iStudy was the best decision I made this year. The course variety and personalized learning paths helped me achieve my goals.",
      img: testi3,
    },
  ];

  const team = [
    { name: "Brendan Fraser", role: "Graphics Designer", img: team1 },
    { name: "Michaels Leonel", role: "Web Designer", img: team2 },
    { name: "Jenny Wilson", role: "Digital Marketer", img: team3 },
    { name: "John Wick", role: "WordPress Expert", img: team4 },
  ];

  const statsData = [
    { number: 1009, label: "Courses Available" },
    { number: 9313, label: "Active Learners" },
    { number: 2015, label: "Expert Instructors" },
    { number: 1105, label: "Awards Received" },
  ];


  const logos = [
    { img: logo1 },
    { img: logo2 },
    { img: logo3 },
    { img: logo4 },
    { img: logo5 },
    { img: logo6 },
    { img: logo7 },
    { img: logo8 },
  ];

  const blogs = [
    {
      img: img1,
      name: "Alice Johnson",
      date: "November 10 2024",
      title: "How to Stay Motivated and Succeed in Online Courses",
      desc: "Discover the must-have books of the season, from thrilling mysteries to inspiring biographies.",
    },
    {
      img: img2,
      name: "Michael Smith",
      date: "November 10 2024",
      title: "Choosing the Right Online Course for Your Goals",
      desc: "Discover the must-have books of the season, inspiring biographies.",
    },
    {
      img: img3,
      name: "Emma Brown",
      date: "November 10 2024",
      title: "Essential Tech Tools for Online Course Success",
      desc: "Books of the season, from thrilling mysteries to inspiring biographies.",
    },
  ];


  return (
    <>
      <div className="container-fluid hero-bg">
        <div className="container pt-5">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6 mt-3 mt-lg-5 text-center text-lg-start">
              <p className="hero-welcome fw-semibold">WELCOME TO STUDY</p>
              <p className="hero-title fw-bold mb-0">Discover <span className="hero-accent">2700+</span></p>
              <p className="hero-title fw-bold mb-0">Online Courses</p>
              <p className="hero-title fw-bold">available in the world</p>
              <p className="hero-muted pt-3">They are not liable for any offense caused by those who fail to carry out their duties.</p>

              <div className="hero-actions d-flex flex-wrap align-items-center gap-3 mt-3 justify-content-center justify-content-lg-start">
                <button className="btn1">Find Courses</button>
                <button className="btn btn-link p-0 hero-accent text-decoration-none hero-video-btn">
                  <i className="fa-solid fa-play"></i> Watch Video
                </button>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img src={banner} alt="Learning banner" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      <section className="features-section py-4">
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

      <div className="top-categories-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="top-categories-title fw-bold">Top Categories</h2>
            <div className="title-bar"></div>
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

      <div className="about-section py-5">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6 position-relative mb-5 mb-lg-0">
              <div className="yellow-box"></div>
              <img src={banner1} alt="About study" className="img-fluid rounded main-img" />
              <img src={banner2} alt="Student with books" className="img-fluid rounded small-img shadow" />
            </div>

            <div className="col-lg-6 text-white about-content">
              <p className="text-warning fw-semibold mb-2">ABOUT US</p>
              <h1 className="fw-bold mb-3 about-title">
                A New Different Way To <br />
                Improve Your <span className="highlight">Skills</span>
              </h1>

              <p className="opacity-75 mb-4 border-start ps-3">
                Education is one of the most essential and valuable assets that an individual can possess.
              </p>

              <div className="d-flex mb-4">
                <div className="icon-circle me-3"><i className="fa-solid fa-book"></i></div>
                <div>
                  <h6 className="fw-bold">Flexible Classes</h6>
                  <p className="small opacity-75 mb-0">The Flexible Classes feature allows students to customize their learning schedule.</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="icon-circle me-3"><i className="fa-solid fa-user"></i></div>
                <div>
                  <h6 className="fw-bold">Expert Trainers</h6>
                  <p className="small opacity-75 mb-0">All trainers hold relevant certifications and advanced degrees.</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="icon-circle me-3"><i className="fa-solid fa-chart-line"></i></div>
                <div>
                  <h6 className="fw-bold">Build Your Career</h6>
                  <p className="small opacity-75 mb-0">Learn practical skills to grow faster in your professional career.</p>
                </div>
              </div>

              <button className="btn btn-warning px-4 py-2 mt-2">Know More</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center mt-5 mb-5">
        <p className="text-success">TRENDING COURSES</p>
        <p className="trending-title fw-bold">Find Your Course</p>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {courses.map((c, i) => (
            <div className="col-12 col-md-6 col-xl-4" key={i}>
              <div className="course-card h-100">
                <div className="card-front">
                  <div className="position-relative">
                    <img src={c.img} className="w-100 rounded-top" alt={c.title} />
                    {c.badge && <span className="badge bg-warning position-absolute top-0 end-0 m-3">{c.badge}</span>}
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

                    <button className="btn btn-outline-success w-100">Enroll Now</button>
                  </div>
                </div>

                <div className="card-hover p-4">
                  <span className="badge bg-success mb-3">Certificate Badge</span>
                  <h5 className="fw-bold">{c.hoverTitle}</h5>
                  <p>Level : <span className="text-success">{c.level}</span></p>

                  <p className="text-muted">{c.desc1}</p>
                  <p className="text-muted"><span className="text-success px-2 fs-5"><i className="bi bi-check"></i></span>{c.p1}</p>
                  <p className="text-muted"><span className="text-success px-2 fs-5"><i className="bi bi-check"></i></span>{c.p2}</p>
                  <p className="text-muted"><span className="text-success px-2 fs-5"><i className="bi bi-check"></i></span>{c.p3}</p>
                  <p className="text-muted"><span className="text-success px-2 fs-5"><i className="bi bi-check"></i></span>{c.p4}</p>

                  <h5>
                    {c.price}
                    <del className="text-muted fs-6 ms-2">{c.oldPrice}</del>
                  </h5>

                  <div className="d-flex gap-2 mt-3 flex-wrap card-hover-actions">
                    <button className="btn btn-success">View Details</button>
                    <button className="btn btn-warning"><i className="fa fa-heart"></i></button>
                    <button className="btn btn-info"><i className="fa fa-share"></i></button>
                  </div>

                  <button className="btn btn-outline-success w-100 mt-3">Enroll Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container text-center py-4 pb-5 see-more-wrap">
        <button className="btn1 btn1-lg">See More Courses</button>
      </div>

      <div className="container text-center mt-5 mb-5">
        <p className="text-success m-0">CHOOSE YOUR PERFECT PLAN</p>
        <p className="trending-title fw-bold">Flexible Learning Options</p>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {plans.map((plan, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div className="plan-card rounded-4 overflow-hidden border h-100">
                <div className="position-relative">
                  <img src={plan.img} className="w-100 plan-image object-fit-cover" alt={plan.title} />

                  <div className="position-absolute bottom-0 start-0 w-100 plan-overlay p-2">
                    <h2 className="text-white fs-4 fw-semibold m-0">{plan.title}</h2>
                  </div>

                  <div className="position-absolute end-0 bottom-0 bg-success text-white px-4 py-2 text-center">
                    <div className="fs-3 fw-bold">{plan.courses}</div>
                    <div className="small">Courses</div>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-muted mb-4">{plan.desc}</p>

                  <ul className="list-unstyled mb-4">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2 mb-2">
                        <span className="text-success">&#10003;</span> {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-4">
                    <p className="small text-muted mb-1">START FROM</p>
                    <p className="fs-2 fw-bold text-success mb-0">
                      {plan.price}
                      <span className="small text-dark"> /MONTH</span>
                    </p>
                  </div>

                  <button className="btn btn-link p-0 fw-semibold text-decoration-none text-success">View Plans &rarr;</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-fluid px-0">
        <div className="row g-0">
          <div className="col-12 col-lg-6 position-relative">
            <img
              src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b"
              className="w-100 testimonial-media-img object-fit-cover"
              alt="Student testimonial"
            />

            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
              <div className="play-ring-outer border border-2 border-white rounded-circle d-flex align-items-center justify-content-center">
                <div className="play-ring-inner border border-2 border-white rounded-circle d-flex align-items-center justify-content-center">
                  <i className="bi bi-play-fill text-white fs-4"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 testimonial-gradient text-white p-4 p-md-5 d-flex align-items-center">
            <div className="testimonial-content-wrap">
              <p className="text-warning fw-semibold mb-2">TESTIMONIALS</p>
              <h2 className="fs-1 fw-bold mb-4">What Our Students Saying</h2>

              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="pb-4"
              >
                {testimonials.map((t, i) => (
                  <SwiperSlide key={i}>
                    <div>
                      <div className="text-warning fs-5 mb-4">&#9733;&#9733;&#9733;&#9733;&#9733;</div>

                      <p className="fs-5 opacity-90 mb-4">{t.text}</p>

                      <div className="d-flex align-items-center gap-3">
                        <img src={t.img} className="rounded-circle testimonial-avatar" alt={t.name} />
                        <span className="fw-semibold">{t.name}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid text-center pt-5 bg-light">
        <p className="text-success small py-0 m-0">INSTRUCTOR</p>
        <p className="trending-title fw-bold py-0 m-0">Our Course Instructor</p>
      </div>

      <div className="bg-light py-5">
        <div className="container">
          <div className="row g-4">
            {team.map((t, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3 text-center">
                <div className="position-relative rounded-4 overflow-hidden instructor-card">
                  <img src={t.img} className="w-100 instructor-img object-fit-cover" alt={t.name} />

                  <div className="instructor-overlay position-absolute top-0 start-0 w-100 h-100 z-1"></div>

                  <div className="instructor-social position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center gap-3 z-2">
                    <button className="social-btn border border-white rounded-circle text-white"><i className="fa-brands fa-facebook-f"></i></button>
                    <button className="social-btn border border-white rounded-circle text-white"><i className="fa-brands fa-x-twitter"></i></button>
                    <button className="social-btn border border-white rounded-circle text-white"><i className="fa-brands fa-linkedin-in"></i></button>
                    <button className="social-btn border border-white rounded-circle text-white"><i className="fa-brands fa-instagram"></i></button>
                  </div>
                </div>
                <h5 className="mt-3 fw-semibold">{t.name}</h5>
                <p className="text-muted small">{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container text-center py-4">
          <button className="btn1 btn1-lg">View More</button>
        </div>
      </div>

      <div className="stats-section bg-light py-5">
        <div className="container">
          <div className="stats-wrap position-relative text-white rounded-4 overflow-hidden">
            <div className="stats-shape stats-shape-left"></div>
            <div className="stats-shape stats-shape-right"></div>

            <div className="row g-0 text-center">
              {statsData.map((item, i) => (
                <div key={i} className="col-12 col-sm-6 col-lg-3">
                  <div className="stats-card px-3 py-5">
                    <h2 className="stats-number fw-bold mb-2">
                      <Counter target={item.number} />
                    </h2>
                    <p className="stats-label mb-0">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="partners-section py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* LEFT TEXT */}
            <div className="col-lg-5 mb-4">
              <h1 className="fw-bold display-6">
                Our Global Honorable <br /> Partners
              </h1>

              <p className="text-muted mt-3">
                Global partners has been publish the course you want, in the way you want always have of control.
              </p>

              <p className="fw-bold text-success mt-3">
                9,500+ <span className="text-muted fw-normal">businesses & students around the world</span>
              </p>
            </div>

            {/* LOGO GRID */}
            <div className="col-lg-7">
              <div className="row g-0 border">

                {logos.map((logo, i) => (
                  <div key={i} className="col-6 col-md-3 p-0">

                    <div className="logo-box">
                      <span className="left"></span>
                      <span className="right"></span>

                      <div className="logo-inner">
                        <img src={logo.img} alt="" className="img-fluid" />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid text-center pt-5 bg-light">
        <p className="text-success small py-0 m-0">NEWS & UPDATE</p>
        <p className="trending-title fw-bold py-0 m-0">Latest News</p>
      </div>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">

            {blogs.map((b, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <div className="blog-card">

                  {/* IMAGE */}
                  <div className="blog-img">
                    <img src={b.img} alt="" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">

                    <div className="text-muted small mb-2">
                      👤 {b.name} &nbsp;&nbsp; 📅 {b.date}
                    </div>

                    <h5 className="fw-bold">{b.title}</h5>
                    <p className="text-muted">{b.desc}</p>

                    {/* READ MORE */}
                    <div className="read-more">
                      →
                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
