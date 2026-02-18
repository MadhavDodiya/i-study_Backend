import React, { useState } from 'react'
import bg from "../assets/Images/imgi_47_breadcrumb-bg-2.png";
import avatar from "../assets/Images/imgi_50_avatar.png";
import instructorThumb from "../assets/Images/imgi_52_instructor-thumb-01.png";
// import reviewAvatar2 from "../assets/Images/instructor-thumb-04.webp";
import { Link, useParams } from "react-router-dom";
import coursesData from "../Data/Courses";

export default function CourseDetail() {
    const { id } = useParams();
    const [showReviewForm, setShowReviewForm] = useState(false);
    const selectedCourse = coursesData.find((course) => course.id === Number(id)) || coursesData[0];
    const curriculumItems = [
        "Introduction to Web Development",
        "Building Your First Web Page",
        "JavaScript Basics",
        "JavaScript DOM Manipulation",
        "Advanced JavaScript: ES6+",
        "React Basics",
        "Full-Stack Development with Node.js"
    ];

    return (
        <>
            <div className="w-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
                style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", height: "300px" }}>
                <div className="text-center">
                    <h1 className="display-4 fw-bold mt-4" style={{ color: "#0b2c2c" }}>
                        {selectedCourse.title}
                    </h1>

                    <div className="d-flex align-items-center justify-content-center gap-2 text-secondary">
                        <Link to="/" className="text-decoration-none text-black d-flex align-items-center gap-2">
                            <i className="bi bi-house-door-fill"></i>
                            <span>iStudy</span>
                        </Link>
                        <span className="mx-1"> - </span>
                        <span className="fw-medium text-black">{selectedCourse.title}</span>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="container py-5">
                    <div className="row g-4">
                        <div className="col-lg-8">
                            <div className="border border-2 rounded px-3 py-3 h-100">
                                <div className="row">
                            <p className="mb-3" style={{ fontWeight: 600, fontSize: "48px" }}>{selectedCourse.title}</p>
                            <p className='text-gray-500'>{selectedCourse.desc}</p>
                            <p className='text-gray-500'>{selectedCourse.rating}(1230 Review)</p>

                            <div className="mt-3 pt-4 pb-4 border-top border-bottom">
                                <div className="row g-0 align-items-center">
                                    <div className="col-md-3 d-flex align-items-center gap-3 px-3">
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-circle"
                                            style={{ width: "60px", height: "60px", backgroundColor: "#f2f4f7" }}>
                                            <img src={avatar} alt="Instructor" className="rounded-circle" style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                                        </div>
                                        <div>
                                            <p className="mb-1" style={{ color: "#7d7d7d", fontSize: "16px" }}>Created by</p>
                                            <p className="mb-0 fw-bold" style={{ color: "#0b2c2c", fontSize: "15px", lineHeight: "1.2" }}>{selectedCourse.instructor}</p>
                                        </div>
                                    </div>

                                    <div className="col-md-3 px-4 border-start">
                                        <p className="mb-1" style={{ color: "#7d7d7d", fontSize: "16px" }}>Total Enrolled</p>
                                        <p className="mb-0 fw-bold" style={{ color: "#0b2c2c", fontSize: "15px", lineHeight: "1.2" }}>
                                            {selectedCourse.students?.toLocaleString("en-US")}
                                        </p>
                                    </div>

                                    <div className="col-md-3 px-4 border-start">
                                        <p className="mb-1" style={{ color: "#7d7d7d", fontSize: "16px" }}>Last Update</p>
                                        <p className="mb-0 fw-bold" style={{ color: "#0b2c2c", fontSize: "15px", lineHeight: "1.2" }}>15 September 2024</p>
                                    </div>

                                    <div className="col-md-3 px-4 border-start">
                                        <p className="mb-1" style={{ color: "#7d7d7d", fontSize: "16px" }}>Category</p>
                                        <p className="mb-0 fw-bold" style={{ color: "#0b2c2c", fontSize: "15px", lineHeight: "1.2" }}>{selectedCourse.category}</p>
                                    </div>
                                </div>
                            </div>

                            <h4 className='mt-3'>Description</h4>
                            <p className='text-gray-500'>This comprehensive course covers all aspects of web development from the basics of HTML, CSS, and JavaScript to advanced topics like React, Node.js, and database integration. Whether you're a complete beginner or an experienced developer looking to hone your skills, this course has everything you need to master web development. Learn best practices and gain hands-on experience with real-world projects.</p>

                            <h2 className="fw-bold mt-4 mb-3" style={{ color: "#0b2c2c", fontSize: "25px" }}>What you'll learn</h2>
                            <div className="rounded-4 overflow-hidden" style={{ backgroundColor: "#f3f3f3" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 p-4 p-md-5">
                                        <div className="d-flex gap-3 mb-4">
                                            <span
                                                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                                                style={{ width: "20px", height: "20px", backgroundColor: "#b8f0c6", color: "#0bbf53" }}>
                                                <i className="bi bi-check-lg"></i>
                                            </span>
                                            <p className="mb-0" style={{ color: "#6c757d", fontSize: "16px", lineHeight: "1.5" }}>
                                                Build fully responsive websites using HTML, CSS, and JavaScript
                                            </p>
                                        </div>

                                        <div className="d-flex gap-3 mb-4">
                                            <span
                                                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                                                style={{ width: "20px", height: "20px", backgroundColor: "#b8f0c6", color: "#0bbf53" }}>
                                                <i className="bi bi-check-lg"></i>
                                            </span>
                                            <p className="mb-0" style={{ color: "#6c757d", fontSize: "16px", lineHeight: "1.5" }}>
                                                Develop web applications using modern JavaScript frameworks like React
                                            </p>
                                        </div>

                                        <div className="d-flex gap-3">
                                            <span
                                                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                                                style={{ width: "20px", height: "20px", backgroundColor: "#b8f0c6", color: "#0bbf53" }}>
                                                <i className="bi bi-check-lg"></i>
                                            </span>
                                            <p className="mb-0" style={{ color: "#6c757d", fontSize: "16px", lineHeight: "1.5" }}>
                                                Implement back-end services with Node.js and Express
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-md-6 p-4 p-md-5 border-start">
                                        <div className="d-flex gap-3 mb-4">
                                            <span
                                                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                                                style={{ width: "20px", height: "20px", backgroundColor: "#b8f0c6", color: "#0bbf53" }}>
                                                <i className="bi bi-check-lg"></i>
                                            </span>
                                            <p className="mb-0" style={{ color: "#6c757d", fontSize: "16px", lineHeight: "1.5" }}>
                                                Understand RESTful APIs and connect front-end to back-end
                                            </p>
                                        </div>

                                        <div className="d-flex gap-3 mb-4">
                                            <span
                                                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                                                style={{ width: "20px", height: "20px", backgroundColor: "#b8f0c6", color: "#0bbf53" }}>
                                                <i className="bi bi-check-lg"></i>
                                            </span>
                                            <p className="mb-0" style={{ color: "#6c757d", fontSize: "16px", lineHeight: "1.5" }}>
                                                Work with databases like MongoDB and MySQL for full-stack applications
                                            </p>
                                        </div>

                                        <div className="d-flex gap-3">
                                            <span
                                                className="rounded-circle d-inline-flex align-items-center justify-content-center flex-shrink-0"
                                                style={{ width: "20px", height: "20px", backgroundColor: "#b8f0c6", color: "#0bbf53" }}>
                                                <i className="bi bi-check-lg"></i>
                                            </span>
                                            <p className="mb-0" style={{ color: "#6c757d", fontSize: "16px", lineHeight: "1.5" }}>
                                                Learn how to deploy web applications to the cloud
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 className="fw-bold mt-5 mb-3" style={{ color: "#0b2c2c", fontSize: "25px" }}>Requirements</h2>
                            <ul className="list-unstyled mb-0">
                                <li className="d-flex align-items-start gap-3 mb-3">
                                    <span
                                        className="rounded-circle flex-shrink-0 mt-2"
                                        style={{ width: "11px", height: "11px", backgroundColor: "#10a66d" }}></span>
                                    <p className="mb-0" style={{ color: "#7a7a7a", fontSize: "16px", lineHeight: "1.5" }}>
                                        Basic understanding of computer usage and internet browsing
                                    </p>
                                </li>

                                <li className="d-flex align-items-start gap-3 mb-3">
                                    <span
                                        className="rounded-circle flex-shrink-0 mt-2"
                                        style={{ width: "11px", height: "11px", backgroundColor: "#10a66d" }}></span>
                                    <p className="mb-0" style={{ color: "#7a7a7a", fontSize: "16px", lineHeight: "1.5" }}>
                                        No prior programming knowledge is required
                                    </p>
                                </li>

                                <li className="d-flex align-items-start gap-3">
                                    <span
                                        className="rounded-circle flex-shrink-0 mt-2"
                                        style={{ width: "11px", height: "11px", backgroundColor: "#10a66d" }}></span>
                                    <p className="mb-0" style={{ color: "#7a7a7a", fontSize: "16px", lineHeight: "1.5" }}>
                                        A computer with access to the internet
                                    </p>
                                </li>
                            </ul>

                            <h2 className="fw-bold mt-5 mb-3" style={{ color: "#0b2c2c", fontSize: "25px" }}>Curriculum</h2>
                            <p className="mb-4" style={{ color: "#334155", fontSize: "16px" }}>40 lectures | 10h 15m</p>

                            <div className="d-flex flex-column gap-1">
                                {curriculumItems.map((item) => (
                                    <div
                                        key={item}
                                        className="d-flex align-items-center justify-content-between rounded-3 border px-3 px-md-4 py-3 py-md-2"
                                        style={{ borderColor: "#d8d8d8" }}>
                                        <div className="d-flex align-items-center gap-3 pe-3">
                                            <span className="fw-bold" style={{ color: "#10a66d", fontSize: "18px" }}>Q.</span>
                                            <p className="mb-0 fw-bold" style={{ color: "#0b2219", fontSize: "16px", lineHeight: "1.35" }}>
                                                {item}
                                            </p>
                                        </div>
                                        <i className="bi bi-chevron-down fw-bold flex-shrink-0" style={{ color: "#0b2219", fontSize: "16px" }}></i>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 p-3 p-md-4 rounded-3" style={{ backgroundColor: "#f3f3f3" }}>
                                <h2 className="fw-bold mb-4" style={{ color: "#0b2c2c", fontSize: "25px" }}>Instructors</h2>

                                <div className="row g-4 align-items-start">
                                    <div className="col-12 col-md-4">
                                        <img
                                            src={instructorThumb}
                                            alt="Instructor"
                                            className="w-100 rounded-3"
                                            style={{ objectFit: "cover", maxHeight: "230px" }}
                                        />
                                    </div>

                                    <div className="col-12 col-md-8">
                                        <h3 className="fw-bold mb-1" style={{ color: "#0b2219", fontSize: "25px" }}>John Doe</h3>
                                        <p className="mb-2" style={{ color: "#6b7280", fontSize: "16px" }}>Senior Full-Stack Developer, Topylo</p>

                                        <p className="mb-2 d-flex align-items-center gap-2" style={{ color: "#475569", fontSize: "16px" }}>
                                            <i className="bi bi-star-fill" style={{ color: "#f5b100" }}></i>
                                            4.9 (120 reviews)
                                        </p>

                                        <p className="mb-3 d-flex flex-wrap align-items-center gap-3" style={{ color: "#6b7280", fontSize: "16px" }}>
                                            <span><i className="bi bi-tv me-1"></i>5 Courses</span>
                                            <span><i className="bi bi-people me-1"></i>105,624 Students</span>
                                        </p>

                                        <div className="d-flex flex-wrap gap-2">
                                            <button type="button" className="btn instructor-social-btn"><i className="bi bi-facebook"></i></button>
                                            <button type="button" className="btn instructor-social-btn"><i className="bi bi-twitter-x"></i></button>
                                            <button type="button" className="btn instructor-social-btn"><i className="bi bi-linkedin"></i></button>
                                            <button type="button" className="btn instructor-social-btn"><i className="bi bi-instagram"></i></button>
                                            <button type="button" className="btn instructor-social-btn"><i className="bi bi-behance"></i></button>
                                        </div>
                                    </div>
                                </div>

                                <p className="mb-0 mt-4" style={{ color: "#6b7280", fontSize: "16px", lineHeight: "2" }}>
                                    With over 10 years of experience in web development, I have contributed to various projects ranging from small business websites to complex enterprise applications. As a Senior Full-Stack Developer at Topylo, I specialize in creating seamless user experiences using modern web technologies such as React, Node.js, and Tailwind CSS. My goal is to help you master the skills needed to succeed in the tech industry.
                                </p>
                            </div>

                            <h2 className="fw-bold mt-5 mb-3" style={{ color: "#0b2c2c", fontSize: "25px" }}>Student Feedback</h2>
                            <div className="border rounded-3 p-3 p-md-4" style={{ backgroundColor: "#f3f3f3", borderColor: "#dddddd" }}>
                                <div className="row g-4 align-items-center">
                                    <div className="col-12 col-md-3">
                                        <div className="border rounded-0 p-3 p-md-4 text-center h-100 d-flex flex-column align-items-center justify-content-center" style={{ borderColor: "#dddddd" }}>
                                            <h3 className="fw-semibold mb-2" style={{ color: "#02281e", fontSize: "88px", lineHeight: "1" }}>4.9</h3>
                                            <div className="d-flex align-items-center gap-1 mb-2" style={{ color: "#f5b100", fontSize: "20px" }}>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                                <i className="bi bi-star-fill"></i>
                                            </div>
                                            <p className="mb-0" style={{ color: "#334155", fontSize: "16px" }}>(234 Reviews)</p>
                                        </div>
                                    </div>

                                    <div className="col-12 col-md-9">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span className="fw-semibold" style={{ width: "18px", color: "#0b2219", fontSize: "17px" }}>5</span>
                                            <div className="flex-grow-1" style={{ height: "18px", backgroundColor: "#e7e7e7" }}>
                                                <div style={{ width: "82%", height: "100%", backgroundColor: "#05d314" }}></div>
                                            </div>
                                            <span className="fw-semibold text-end" style={{ width: "52px", color: "#475569", fontSize: "17px" }}>82%</span>
                                            <span className="fw-semibold text-end" style={{ width: "40px", color: "#0b2219", fontSize: "17px" }}>212</span>
                                        </div>

                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span className="fw-semibold" style={{ width: "18px", color: "#0b2219", fontSize: "17px" }}>4</span>
                                            <div className="flex-grow-1" style={{ height: "18px", backgroundColor: "#e7e7e7" }}>
                                                <div style={{ width: "75%", height: "100%", backgroundColor: "#f5b100" }}></div>
                                            </div>
                                            <span className="fw-semibold text-end" style={{ width: "52px", color: "#475569", fontSize: "17px" }}>12%</span>
                                            <span className="fw-semibold text-end" style={{ width: "40px", color: "#0b2219", fontSize: "17px" }}>28</span>
                                        </div>

                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span className="fw-semibold" style={{ width: "18px", color: "#0b2219", fontSize: "17px" }}>3</span>
                                            <div className="flex-grow-1" style={{ height: "18px", backgroundColor: "#e7e7e7" }}>
                                                <div style={{ width: "50%", height: "100%", backgroundColor: "#20b9d5" }}></div>
                                            </div>
                                            <span className="fw-semibold text-end" style={{ width: "52px", color: "#475569", fontSize: "17px" }}>4%</span>
                                            <span className="fw-semibold text-end" style={{ width: "40px", color: "#0b2219", fontSize: "17px" }}>9</span>
                                        </div>

                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span className="fw-semibold" style={{ width: "18px", color: "#0b2219", fontSize: "17px" }}>2</span>
                                            <div className="flex-grow-1" style={{ height: "18px", backgroundColor: "#e7e7e7" }}>
                                                <div style={{ width: "30%", height: "100%", backgroundColor: "#f5b100" }}></div>
                                            </div>
                                            <span className="fw-semibold text-end" style={{ width: "52px", color: "#475569", fontSize: "17px" }}>1%</span>
                                            <span className="fw-semibold text-end" style={{ width: "40px", color: "#0b2219", fontSize: "17px" }}>5</span>
                                        </div>

                                        <div className="d-flex align-items-center gap-2">
                                            <span className="fw-semibold" style={{ width: "18px", color: "#0b2219", fontSize: "17px" }}>1</span>
                                            <div className="flex-grow-1" style={{ height: "18px", backgroundColor: "#e7e7e7" }}>
                                                <div style={{ width: "10%", height: "100%", backgroundColor: "#ff0037" }}></div>
                                            </div>
                                            <span className="fw-semibold text-end" style={{ width: "52px", color: "#475569", fontSize: "17px" }}>1%</span>
                                            <span className="fw-semibold text-end" style={{ width: "40px", color: "#0b2219", fontSize: "17px" }}>1</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 className="fw-bold mt-5 mb-3" style={{ color: "#0b2c2c", fontSize: "25px" }}>Reviews</h2>

                            <div className="rounded-3 p-3 p-md-4 review-card my-3" style={{ backgroundColor: "#f3f3f3" }}>
                                <div className="d-flex flex-column flex-md-row gap-3 gap-md-4">
                                    <img
                                        src={instructorThumb}
                                        alt="James Smith"
                                        className="rounded-3"
                                        style={{ width: "126px", height: "126px", objectFit: "cover" }}
                                    />

                                    <div className="flex-grow-1 pe-md-5">
                                        <div className="d-flex align-items-center gap-1 mb-2" style={{ color: "#f5b100", fontSize: "22px" }}>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>

                                        <h3 className="fw-bold mb-1" style={{ color: "#0b2219", fontSize: "25px" }}>James Smith</h3>
                                        <p className="mb-2" style={{ color: "#64748b", fontSize: "16px" }}>July 14, 2024</p>
                                        <p className="mb-3" style={{ color: "#6b7280", fontSize: "16px", lineHeight: "1.6" }}>
                                            This course exceeded my expectations! The instructor&apos;s knowledge and delivery were excellent. Highly recommend for anyone interested in data science.
                                        </p>

                                        <button
                                            type="button"
                                            className="btn px-4 py-2 fw-semibold"
                                            style={{ border: "1px solid #d8d8d8", color: "#0b2219", fontSize: "16px", backgroundColor: "transparent" }}
                                        >
                                            Reply
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn rounded-2 d-inline-flex align-items-center justify-content-center review-like-btn"
                                        style={{ width: "46px", height: "46px", border: "1px solid #d8d8d8", color: "#0b2219", backgroundColor: "transparent" }}
                                    >
                                        <i className="bi bi-heart" style={{ fontSize: "20px" }}></i>
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-3 p-3 p-md-4 review-card my-3" style={{ backgroundColor: "#f3f3f3" }}>
                                <div className="d-flex flex-column flex-md-row gap-3 gap-md-4">
                                    <img
                                        src={instructorThumb}
                                        alt="James Smith"
                                        className="rounded-3"
                                        style={{ width: "126px", height: "126px", objectFit: "cover" }}
                                    />

                                    <div className="flex-grow-1 pe-md-5">
                                        <div className="d-flex align-items-center gap-1 mb-2" style={{ color: "#f5b100", fontSize: "22px" }}>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>

                                        <h3 className="fw-bold mb-1" style={{ color: "#0b2219", fontSize: "25px" }}>James Smith</h3>
                                        <p className="mb-2" style={{ color: "#64748b", fontSize: "16px" }}>July 14, 2024</p>
                                        <p className="mb-3" style={{ color: "#6b7280", fontSize: "16px", lineHeight: "1.6" }}>
                                            This course exceeded my expectations! The instructor&apos;s knowledge and delivery were excellent. Highly recommend for anyone interested in data science.
                                        </p>

                                        <button
                                            type="button"
                                            className="btn px-4 py-2 fw-semibold"
                                            style={{ border: "1px solid #d8d8d8", color: "#0b2219", fontSize: "16px", backgroundColor: "transparent" }}
                                        >
                                            Reply
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn rounded-2 d-inline-flex align-items-center justify-content-center review-like-btn"
                                        style={{ width: "46px", height: "46px", border: "1px solid #d8d8d8", color: "#0b2219", backgroundColor: "transparent" }}
                                    >
                                        <i className="bi bi-heart" style={{ fontSize: "20px" }}></i>
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-3 p-3 p-md-4 review-card my-3" style={{ backgroundColor: "#f3f3f3" }}>
                                <div className="d-flex flex-column flex-md-row gap-3 gap-md-4">
                                    <img
                                        src={instructorThumb}
                                        alt="James Smith"
                                        className="rounded-3"
                                        style={{ width: "126px", height: "126px", objectFit: "cover" }}
                                    />

                                    <div className="flex-grow-1 pe-md-5">
                                        <div className="d-flex align-items-center gap-1 mb-2" style={{ color: "#f5b100", fontSize: "22px" }}>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>

                                        <h3 className="fw-bold mb-1" style={{ color: "#0b2219", fontSize: "25px" }}>James Smith</h3>
                                        <p className="mb-2" style={{ color: "#64748b", fontSize: "16px" }}>July 14, 2024</p>
                                        <p className="mb-3" style={{ color: "#6b7280", fontSize: "16px", lineHeight: "1.6" }}>
                                            This course exceeded my expectations! The instructor&apos;s knowledge and delivery were excellent. Highly recommend for anyone interested in data science.
                                        </p>

                                        <button
                                            type="button"
                                            className="btn px-4 py-2 fw-semibold"
                                            style={{ border: "1px solid #d8d8d8", color: "#0b2219", fontSize: "16px", backgroundColor: "transparent" }}
                                        >
                                            Reply
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn rounded-2 d-inline-flex align-items-center justify-content-center review-like-btn"
                                        style={{ width: "46px", height: "46px", border: "1px solid #d8d8d8", color: "#0b2219", backgroundColor: "transparent" }}
                                    >
                                        <i className="bi bi-heart" style={{ fontSize: "20px" }}></i>
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-3 p-3 p-md-4 review-card my-3" style={{ backgroundColor: "#f3f3f3" }}>
                                <div className="d-flex flex-column flex-md-row gap-3 gap-md-4">
                                    <img
                                        src={instructorThumb}
                                        alt="James Smith"
                                        className="rounded-3"
                                        style={{ width: "126px", height: "126px", objectFit: "cover" }}
                                    />

                                    <div className="flex-grow-1 pe-md-5">
                                        <div className="d-flex align-items-center gap-1 mb-2" style={{ color: "#f5b100", fontSize: "22px" }}>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>

                                        <h3 className="fw-bold mb-1" style={{ color: "#0b2219", fontSize: "25px" }}>James Smith</h3>
                                        <p className="mb-2" style={{ color: "#64748b", fontSize: "16px" }}>July 14, 2024</p>
                                        <p className="mb-3" style={{ color: "#6b7280", fontSize: "16px", lineHeight: "1.6" }}>
                                            This course exceeded my expectations! The instructor&apos;s knowledge and delivery were excellent. Highly recommend for anyone interested in data science.
                                        </p>

                                        <button
                                            type="button"
                                            className="btn px-4 py-2 fw-semibold"
                                            style={{ border: "1px solid #d8d8d8", color: "#0b2219", fontSize: "16px", backgroundColor: "transparent" }}
                                        >
                                            Reply
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn rounded-2 d-inline-flex align-items-center justify-content-center review-like-btn"
                                        style={{ width: "46px", height: "46px", border: "1px solid #d8d8d8", color: "#0b2219", backgroundColor: "transparent" }}
                                    >
                                        <i className="bi bi-heart" style={{ fontSize: "20px" }}></i>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="btn review-open-btn px-4 py-3"
                                    onClick={() => setShowReviewForm((prev) => !prev)}
                                >
                                    Write A Review
                                </button>

                                {showReviewForm && (
                                    <div className="mt-4">
                                        <p className="mb-3" style={{ color: "#6b7280", fontSize: "16px" }}>
                                            Your email address will not be published. Required fields are marked *
                                        </p>

                                        <div className="d-flex align-items-center gap-1 mb-4" style={{ color: "#334e6f", fontSize: "28px" }}>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>

                                        <div className="row g-3 mb-3">
                                            <div className="col-12 col-md-6">
                                                <input
                                                    type="text"
                                                    className="form-control review-form-input"
                                                    placeholder="Name"
                                                />
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <input
                                                    type="email"
                                                    className="form-control review-form-input"
                                                    placeholder="Email"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <textarea
                                                className="form-control review-form-input"
                                                rows="7"
                                                placeholder="Your Comment Here..."
                                            ></textarea>
                                        </div>

                                        <div className="form-check mb-4">
                                            <input className="form-check-input" type="checkbox" id="saveReviewInfo" />
                                            <label className="form-check-label ms-2" htmlFor="saveReviewInfo" style={{ color: "#0f2a20", fontSize: "18px" }}>
                                                Save My Name, Email, And Website In This Browser For The Next Time I Comment.
                                            </label>
                                        </div>

                                        <button type="button" className="btn review-submit-btn px-4 py-3">
                                            Submit Review
                                        </button>
                                    </div>
                                )}
                            </div>

                            

                        </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="rounded-3 p-4" style={{ backgroundColor: "#f3f3f3", position: "sticky", top: "24px" }}>
                                <div className="position-relative overflow-hidden rounded-3">
                                    <img
                                        src={selectedCourse.img}
                                        alt={selectedCourse.title}
                                        className="w-100"
                                        style={{ height: "220px", objectFit: "cover" }}
                                    />
                                    <button
                                        type="button"
                                        className="btn border-0 rounded-circle position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center"
                                        style={{ width: "56px", height: "56px", backgroundColor: "#10a66d" }}>
                                        <i className="bi bi-play-fill text-white" style={{ fontSize: "28px", marginLeft: "3px" }}></i>
                                    </button>
                                </div>
                    

                                <div className="mt-4 mb-3">
                                    <h3 className="mb-0 fw-bold" style={{ color: "#0b2c2c", fontSize: "40px" }}>
                                        {selectedCourse.price}
                                        <span className="text-decoration-line-through ms-2" style={{ color: "#7d7d7d", fontSize: "16px" }}>
                                            {selectedCourse.oldPrice || selectedCourse.price}
                                        </span>
                                    </h3>
                                </div>

                                <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
                                    <p className="mb-0 d-flex align-items-center gap-2" style={{ color: "#8a8a8a", fontSize: "16px" }}>
                                        <i className="bi bi-funnel-fill"></i> Level
                                    </p>
                                    <p className="mb-0" style={{ color: "#7d7d7d", fontSize: "16px" }}>{selectedCourse.level || "Beginners"}</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
                                    <p className="mb-0 d-flex align-items-center gap-2" style={{ color: "#8a8a8a", fontSize: "16px" }}>
                                        <i className="bi bi-tv"></i> Lectures
                                    </p>
                                    <p className="mb-0" style={{ color: "#7d7d7d", fontSize: "16px" }}>{selectedCourse.lessons} Lectures</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
                                    <p className="mb-0 d-flex align-items-center gap-2" style={{ color: "#8a8a8a", fontSize: "16px" }}>
                                        <i className="bi bi-clock"></i> Duration
                                    </p>
                                    <p className="mb-0" style={{ color: "#7d7d7d", fontSize: "16px" }}>{selectedCourse.hours}h 30m 12s</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
                                    <p className="mb-0 d-flex align-items-center gap-2" style={{ color: "#8a8a8a", fontSize: "16px" }}>
                                        <i className="bi bi-grid-3x3-gap-fill"></i> Category
                                    </p>
                                    <p className="mb-0" style={{ color: "#7d7d7d", fontSize: "16px" }}>{selectedCourse.category}</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
                                    <p className="mb-0 d-flex align-items-center gap-2" style={{ color: "#8a8a8a", fontSize: "16px" }}>
                                        <i className="bi bi-globe"></i> Language
                                    </p>
                                    <p className="mb-0" style={{ color: "#7d7d7d", fontSize: "16px" }}>{selectedCourse.language}</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
                                    <p className="mb-0 d-flex align-items-center gap-2" style={{ color: "#8a8a8a", fontSize: "16px" }}>
                                        <i className="bi bi-bookmark-fill"></i> Access
                                    </p>
                                    <p className="mb-0" style={{ color: "#7d7d7d", fontSize: "16px" }}>Full Lifetime</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
                                    <p className="mb-0 d-flex align-items-center gap-2" style={{ color: "#8a8a8a", fontSize: "16px" }}>
                                        <i className="bi bi-award-fill"></i> Certificate
                                    </p>
                                    <p className="mb-0" style={{ color: "#7d7d7d", fontSize: "16px" }}>Yes</p>
                                </div>

                                <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
                                    <p className="mb-0 d-flex align-items-center gap-2" style={{ color: "#8a8a8a", fontSize: "16px" }}>
                                        <i className="bi bi-file-earmark-text-fill"></i> Recourse
                                    </p>
                                    <p className="mb-0" style={{ color: "#7d7d7d", fontSize: "16px" }}>5 Downloadable Files</p>
                                </div>

                                <button
                                    type="button"
                                    className="btn w-100 fw-semibold mt-4 py-3"
                                    style={{ backgroundColor: "#10a66d", color: "#ffffff", fontSize: "16px" }}>
                                    <i className="bi bi-cart3 me-2"></i> Add To Cart
                                </button>

                                <button
                                    type="button"
                                    className="btn w-100 fw-semibold mt-3 py-3 border"
                                    style={{ borderColor: "#10a66d", color: "#10a66d", fontSize: "16px", backgroundColor: "transparent" }}>
                                    <i className="bi bi-suit-heart me-2"></i> Add To Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
