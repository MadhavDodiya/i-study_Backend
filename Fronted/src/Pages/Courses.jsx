import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/Images/imgi_47_breadcrumb-bg-2.png";
import course1 from "../assets/Images/course1.png";
import course2 from "../assets/Images/course2.png";
import course3 from "../assets/Images/course3.png";
import course4 from "../assets/Images/course4.png";
import course5 from "../assets/Images/course5.png";
import course6 from "../assets/Images/course6.png";

const ratingOptions = [5, 4, 3, 2, 1];
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const courseImageMap = {
  course1,
  course2,
  course3,
  course4,
  course5,
  course6,
};

function getUniqueValues(data, key) {
  return [...new Set(data.map((item) => item[key]).filter(Boolean))];
}

function Courses() {
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [view, setView] = useState("grid");
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        // ✅ FIXED: Correct API endpoint
        const response = await fetch(`${API_BASE}/api/courses`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const jsonData = await response.json();
        
        // ✅ FIXED: Handle both direct array and wrapped response
        let courses = [];
        if (Array.isArray(jsonData)) {
          courses = jsonData;
        } else if (jsonData.data && Array.isArray(jsonData.data)) {
          courses = jsonData.data;
        } else if (jsonData.courses && Array.isArray(jsonData.courses)) {
          courses = jsonData.courses;
        }

        if (isMounted) {
          setCoursesData(courses);
          setErrorMessage("");
          console.log("✅ Courses loaded:", courses.length);
        }
      } catch (error) {
        console.error("Courses fetch error:", error);
        if (isMounted) {
          setErrorMessage("Unable to load courses. Please check backend server.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ FIXED: Enhanced course mapping with fallback values
  const hydratedCourses = useMemo(
    () =>
      coursesData.map((course) => ({
        ...course,
        img: courseImageMap[course.imageKey] || course1,
        title: course.title || "Untitled Course",
        desc: course.desc || course.description || "No description",
        rating: Number(course.rating) || 0,
        lessons: course.lessons || 0,
        hours: course.hours || 0,
        students: course.students || 0,
        price: course.price || "$0",
        priceValue: course.priceValue || 0,
        category: course.category || "General",
        level: course.level || "Beginner",
        instructor: course.instructor || "Unknown",
        language: course.language || "English",
      })),
    [coursesData]
  );

  const categories = useMemo(() => getUniqueValues(hydratedCourses, "category"), [hydratedCourses]);
  const levels = useMemo(() => getUniqueValues(hydratedCourses, "level"), [hydratedCourses]);
  const instructors = useMemo(() => getUniqueValues(hydratedCourses, "instructor"), [hydratedCourses]);
  const languages = useMemo(() => getUniqueValues(hydratedCourses, "language"), [hydratedCourses]);

  // ✅ FIXED: Improved count calculations
  const counts = useMemo(() => {
    const categoryCounts = {};
    const levelCounts = {};
    const instructorCounts = {};
    const languageCounts = {};

    hydratedCourses.forEach((course) => {
      const cat = course.category || "General";
      const lev = course.level || "Beginner";
      const inst = course.instructor || "Unknown";
      const lang = course.language || "English";

      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      levelCounts[lev] = (levelCounts[lev] || 0) + 1;
      instructorCounts[inst] = (instructorCounts[inst] || 0) + 1;
      languageCounts[lang] = (languageCounts[lang] || 0) + 1;
    });

    const freeCount = hydratedCourses.filter((course) => Number(course.priceValue) === 0).length;
    const paidCount = hydratedCourses.length - freeCount;

    const ratingCounts = ratingOptions.reduce((acc, rating) => {
      acc[rating] = hydratedCourses.filter((course) => Math.floor(Number(course.rating) || 0) === rating).length;
      return acc;
    }, {});

    return {
      categoryCounts,
      levelCounts,
      instructorCounts,
      languageCounts,
      freeCount,
      paidCount,
      ratingCounts,
    };
  }, [hydratedCourses]);

  // ✅ FIXED: Improved filtering logic
  const filteredCourses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return hydratedCourses.filter((course) => {
      const searchMatch =
        normalizedSearch.length === 0 ||
        [
          course.title,
          course.desc,
          course.category,
          course.level,
          course.instructor,
          course.language,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      if (!searchMatch) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(course.category)) return false;
      if (selectedLevels.length > 0 && !selectedLevels.includes(course.level)) return false;
      if (selectedInstructors.length > 0 && !selectedInstructors.includes(course.instructor)) return false;
      if (selectedLanguages.length > 0 && !selectedLanguages.includes(course.language)) return false;

      if (selectedPrices.length > 0) {
        const isFree = Number(course.priceValue) === 0;
        const priceMatch =
          (selectedPrices.includes("free") && isFree) ||
          (selectedPrices.includes("paid") && !isFree);

        if (!priceMatch) return false;
      }

      if (selectedRatings.length > 0 && !selectedRatings.includes(Math.floor(Number(course.rating) || 0))) {
        return false;
      }

      return true;
    });
  }, [
    hydratedCourses,
    searchTerm,
    selectedCategories,
    selectedLevels,
    selectedPrices,
    selectedRatings,
    selectedInstructors,
    selectedLanguages,
  ]);

  const toggleFilterValue = (current, setter, value) => {
    if (current.includes(value)) {
      setter(current.filter((item) => item !== value));
      return;
    }

    setter([...current, value]);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedPrices([]);
    setSelectedRatings([]);
    setSelectedInstructors([]);
    setSelectedLanguages([]);
  };

  if (isLoading) {
    return <div className="container py-5 text-center">Loading courses...</div>;
  }

  if (errorMessage) {
    return <div className="container py-5 text-center text-danger">{errorMessage}</div>;
  }

  return (
    <>
      <div
        className="w-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center", height: "300px" }}
      >
        <div className="text-center">
          <h1 className="display-4 fw-bold mt-4" style={{ color: "#0b2c2c" }}>
            Advanced Course Filter
          </h1>

          <div className="d-flex align-items-center justify-content-center gap-2 text-secondary">
            <Link to="/" className="text-decoration-none text-black d-flex align-items-center gap-2">
              <i className="bi bi-house-door-fill"></i>
              <span>iStudy</span>
            </Link>
            <span className="mx-1"> - </span>
            <span className="fw-medium text-black">Advanced Course Filter</span>
          </div>
        </div>
      </div>

      <div>
        <div className="w-100 bg-light border-bottom">
          <div className="container py-4 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
            <h2 className="fs-5 fw-semibold mb-0">
              We found <span className="text-success fw-bold">{filteredCourses.length}</span> courses available for you
            </h2>

            <div className="d-flex align-items-center gap-3 flex-wrap justify-content-start course-toolbar-controls">
              <span className="fw-medium">Grid</span>

              <button
                onClick={() => setView("grid")}
                className={`btn d-flex align-items-center justify-content-center ${
                  view === "grid" ? "btn-success text-white" : "btn-outline-secondary"
                }`}
                style={{ width: "45px", height: "45px" }}
              >
                <i className="bi bi-grid-fill fs-5"></i>
              </button>

              <button
                onClick={() => setView("list")}
                className={`btn d-flex align-items-center justify-content-center ${
                  view === "list" ? "btn-success text-white" : "btn-outline-secondary"
                }`}
                style={{ width: "45px", height: "45px" }}
              >
                <i className="bi bi-list-ul fs-5"></i>
              </button>

              <button
                onClick={() => setShowFilter(!showFilter)}
                className="btn btn-light border d-flex align-items-center gap-2 btn1"
                style={{ height: "45px" }}
              >
                <i className="bi bi-sliders"></i>
                Filters
                <i className={`bi ${showFilter ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
              </button>
            </div>
          </div>
        </div>

        {showFilter && (
          <div className="filter-panel container-fluid py-4 border-bottom bg-light">
            <div className="container">
              <div className="row mb-4 align-items-center">
                <div className="col-12 col-md-8">
                  <input
                    type="text"
                    placeholder="Search courses, category, instructor..."
                    className="form-control form-control-lg rounded-3 shadow-sm"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
                <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0">
                  <button className="btn btn-outline-secondary" onClick={clearFilters}>
                    Clear All Filters
                  </button>
                </div>
              </div>

              <div className="row g-4 filter-groups">
                <div className="col-12 col-sm-6 col-xl-2">
                  <h5 className="fw-bold mb-3">Categories</h5>
                  <div className="d-flex flex-column gap-3">
                    {categories.map((category) => (
                      <label key={category} className="d-flex align-items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleFilterValue(selectedCategories, setSelectedCategories, category)}
                        />
                        {category} ({counts.categoryCounts[category] || 0})
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-xl-2">
                  <h5 className="fw-bold mb-3">Level</h5>
                  <div className="d-flex flex-column gap-3">
                    {levels.map((level) => (
                      <label key={level} className="d-flex gap-2 align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedLevels.includes(level)}
                          onChange={() => toggleFilterValue(selectedLevels, setSelectedLevels, level)}
                        />
                        {level} ({counts.levelCounts[level] || 0})
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-xl-2">
                  <h5 className="fw-bold mb-3">Price</h5>
                  <div className="d-flex flex-column gap-3">
                    <label className="d-flex gap-2 align-items-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedPrices.includes("free")}
                        onChange={() => toggleFilterValue(selectedPrices, setSelectedPrices, "free")}
                      />
                      Free ({counts.freeCount})
                    </label>
                    <label className="d-flex gap-2 align-items-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedPrices.includes("paid")}
                        onChange={() => toggleFilterValue(selectedPrices, setSelectedPrices, "paid")}
                      />
                      Paid ({counts.paidCount})
                    </label>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-xl-2">
                  <h5 className="fw-bold mb-3">Ratings</h5>
                  <div className="d-flex flex-column gap-3">
                    {ratingOptions.map((rating) => (
                      <label key={rating} className="d-flex align-items-center gap-2">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedRatings.includes(rating)}
                          onChange={() => toggleFilterValue(selectedRatings, setSelectedRatings, rating)}
                        />
                        {rating} Stars ({counts.ratingCounts[rating] || 0})
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-xl-2">
                  <h5 className="fw-bold mb-3">Instructors</h5>
                  <div className="d-flex flex-column gap-3">
                    {instructors.map((instructor) => (
                      <label key={instructor} className="d-flex gap-2 align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedInstructors.includes(instructor)}
                          onChange={() => toggleFilterValue(selectedInstructors, setSelectedInstructors, instructor)}
                        />
                        {instructor} ({counts.instructorCounts[instructor] || 0})
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-xl-2">
                  <h5 className="fw-bold mb-3">Language</h5>
                  <div className="d-flex flex-column gap-3">
                    {languages.map((language) => (
                      <label key={language} className="d-flex gap-2 align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedLanguages.includes(language)}
                          onChange={() => toggleFilterValue(selectedLanguages, setSelectedLanguages, language)}
                        />
                        {language} ({counts.languageCounts[language] || 0})
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container py-5">
          {filteredCourses.length === 0 && (
            <div className="alert alert-warning border-0 shadow-sm" role="alert">
              No courses found for the selected filters.
            </div>
          )}

          {view === "grid" && (
            <div className="row g-4">
              {filteredCourses.map((course) => (
                <div key={course.id || course._id} className="col-12 col-md-6 col-lg-4">
                  <div className="border rounded-4 overflow-hidden shadow-sm h-100">
                    <img src={course.img} alt={course.title} className="img-fluid w-100" style={{ height: "250px", objectFit: "cover" }} />
                    <div className="p-3">
                      <p className="text-secondary mb-1">Lessons {course.lessons}</p>
                      <h5 className="fw-bold mb-2">{course.title}</h5>
                      <p className="text-muted mb-2">{course.desc}</p>
                      <p className="mb-0">({course.rating}/5 Ratings)</p>
                    </div>
                    <hr className="m-0" />
                    <div className="p-3">
                      <Link to={`/coursedetail/${course.id}`} className="btn btn-outline-success w-100">
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === "list" && (
            <div className="d-flex flex-column gap-4">
              {filteredCourses.map((course) => (
                <div
                  key={course.id || course._id}
                  className="border-0 rounded-4 shadow-sm overflow-hidden"
                  style={{ background: "#f8f9fa" }}
                >
                  <div className="d-flex flex-column flex-lg-row align-items-stretch">
                    <div className="position-relative course-list-media">
                      <img
                        src={course.img}
                        alt={course.title}
                        className="w-100 h-100"
                        style={{ objectFit: "cover", minHeight: "250px", maxHeight: "260px" }}
                      />
                    </div>

                    <div className="p-3 p-md-4 flex-grow-1 d-flex flex-column justify-content-between">
                      <div>
                        <h2 className="fw-bold mb-2" style={{ fontSize: "clamp(1.25rem, 2.8vw, 1.75rem)" }}>
                          {course.title}
                        </h2>

                        <p className="text-muted mb-3" style={{ maxWidth: "600px" }}>
                          {course.desc}
                        </p>

                        <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                          <img src={course.img} alt={course.instructor} className="rounded-circle" width="40" height="40" />
                          <span className="fw-semibold">{course.instructor}</span>
                          <span className="text-muted small">{course.level}</span>
                        </div>

                        <div className="d-flex flex-wrap gap-4 text-muted small mb-3">
                          <span>{course.lessons} Lessons</span>
                          <span>{course.hours} Hours</span>
                          <span>{course.language}</span>
                        </div>
                      </div>

                      <h3 className="fw-bold text-success mb-0">{course.price}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Courses;