import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/courses");
      setCourses(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load courses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to return a rich gradient & icon based on the course category
  const getCategoryStyle = (category) => {
    const cat = category?.toLowerCase() || "general";

    if (cat.includes("code") || cat.includes("develop") || cat.includes("web") || cat.includes("react")) {
      return {
        gradient: "linear-gradient(135deg, #2563eb, #1d4ed8)", // Blue
        icon: "bi-code-slash"
      };
    }
    if (cat.includes("design") || cat.includes("ui") || cat.includes("ux") || cat.includes("art")) {
      return {
        gradient: "linear-gradient(135deg, #ec4899, #be185d)", // Pink
        icon: "bi-palette-fill"
      };
    }
    if (cat.includes("business") || cat.includes("market") || cat.includes("finance")) {
      return {
        gradient: "linear-gradient(135deg, #0d9488, #115e59)", // Teal
        icon: "bi-graph-up-arrow"
      };
    }
    if (cat.includes("data") || cat.includes("ai") || cat.includes("math")) {
      return {
        gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)", // Purple
        icon: "bi-cpu-fill" // Fixed: Added the CPU processor icon class string
      };
    }

    return {
      gradient: "linear-gradient(135deg, #f97316, #ea580c)", // Orange fallback
      icon: "bi-journal-bookmark-fill"
    };
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger border-0 shadow-sm" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Header Section */}
      <div className="row align-items-center mb-5 g-3">
        <div className="col-md-7 col-lg-8">
          <h2 className="fw-bold text-dark mb-1">Explore Courses</h2>
          <p className="text-muted mb-0">Expand your knowledge base with expert-led training paths.</p>
        </div>
        {token && role === "instructor" && (
          <div className="col-md-5 col-lg-4 text-md-end">
            <Link to="/instructor/create" className="btn btn-primary px-4 py-2 fw-semibold shadow-sm rounded-3">
              <i className="bi bi-plus-lg me-2"></i>Create Course
            </Link>
          </div>
        )}
      </div>

      {/* Modern Search Wrapper */}
      <div className="row mb-5">
        <div className="col-lg-6">
          <div className="input-group shadow-sm rounded-3 overflow-hidden border">
            <span className="input-group-text bg-white border-0 text-muted ps-3">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-0 py-3 ps-2"
              placeholder="What do you want to learn today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ boxShadow: "none" }}
            />
          </div>
        </div>
      </div>

      {/* Course Catalog Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-4">
          <i className="bi bi-search text-muted fs-1 d-block mb-3 opacity-50"></i>
          <h5 className="fw-bold text-secondary mb-1">No courses match your search</h5>
          <p className="text-muted small">Try checking your spelling or use different keywords.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredCourses.map((course) => {
            const style = getCategoryStyle(course.category);
            // Inline safety check: fallback to a default book icon if the string is empty or blank
            const finalIcon = style.icon && style.icon.trim() !== "" ? style.icon : "bi-journal-bookmark-fill";

            return (
              <div key={course._id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-1 shadow-sm rounded-4 overflow-hidden bg-white">

                  {/* High-Contrast Gradient Banner Header */}
                  <div
                    className="p-5 text-center position-relative d-flex align-items-center justify-content-center"
                    style={{ background: style.gradient }}
                  >
                    {/* Changed text-white to text-dark so the icon inside stands out clearly */}
                    <div
                      className="bg-white bg-opacity-20 text-dark rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                      style={{ width: "64px", height: "64px", backdropFilter: "blur(4px)" }}
                    >
                      {/* Setting a specific color style fallback inline ensures visibility */}
                      <i className={`bi ${finalIcon} fs-3 text-${style.gradient}`}></i>
                    </div>

                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-white text-dark shadow-sm py-1.5 px-2.5 rounded-pill fw-bold text-uppercase" style={{ fontSize: "0.68rem", letterSpacing: "0.5px" }}>
                        {course.category || "General"}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fw-bold text-dark lh-base mb-2">{course.title}</h5>
                      <p className="text-secondary small mb-4" style={{ display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {course.description}
                      </p>
                    </div>

                    {/* Instructor & Pricing Row */}
                    <div className="d-flex align-items-center justify-content-between pt-3 border-top border-light">
                      <div className="d-flex align-items-center gap-2">
                        <div className="bg-light rounded-circle text-secondary d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
                          <i className="bi bi-person-fill small"></i>
                        </div>
                        <div className="lh-sm">
                          <span className="text-muted d-block" style={{ fontSize: "0.72rem" }}>Instructor</span>
                          <span className="text-dark fw-semibold small">{course.instructor?.name || "Unknown"}</span>
                        </div>
                      </div>

                      <div>
                        {course.price ? (
                          <span className="fs-5 fw-bold text-success font-monospace">${course.price}</span>
                        ) : (
                          <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill fw-bold px-2.5 py-1.5 small">Free</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="card-footer bg-white border-0 p-4 pt-0">
                    <Link to={`/course/${course._id}`} className="btn btn-outline-primary w-100 py-2 fw-semibold rounded-3">
                      View Course Details <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}