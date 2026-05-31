import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/enroll/my-courses");
      setCourses(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load your enrolled courses directory.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container my-5 text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger border-0 shadow-sm rounded-4" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      
      {/* Student Catalog Header Module */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-5 gap-3">
        <div>
          <h2 className="fw-extrabold text-dark tracking-tight mb-1">My Enrolled Courses</h2>
          <p className="text-muted small mb-0">Track your educational benchmarks, jump back into modules, and monitor study progress.</p>
        </div>
        {courses.length > 0 && (
          <Link to="/courses" className="btn btn-outline-primary px-3 py-2 fw-semibold rounded-3 small align-self-start">
            <i className="bi bi-search me-1.5"></i> Explore More
          </Link>
        )}
      </div>

      {/* Empty State vs. Course Grid Presentations */}
      {courses.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto" style={{ width: "64px", height: "64px" }}>
            <i className="bi bi-journal-bookmark-fill fs-3"></i>
          </div>
          <h5 className="fw-bold text-dark mb-2">Your learning desk is clear</h5>
          <p className="text-secondary small mb-4 mx-auto" style={{ maxWidth: "420px" }}>
            You are not actively enrolled in any training tracks yet. Join a community of professionals and choose your next discipline path.
          </p>
          <Link to="/courses" className="btn btn-primary fw-semibold rounded-3 px-4 py-2 small shadow-sm">
            Browse Available Courses
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {courses.map((enrollment) => {
            const courseProgress = enrollment.progress || 0;
            return (
              <div key={enrollment._id} className="col-md-6 col-lg-4 ">
                <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden bg-white d-flex flex-column transition-card">
                  
                  {/* Card Content Top Segment */}
                  <div className="card-body p-4">
                    {/* Category Label Pin Pill */}
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-2.5 py-1.5 fw-semibold text-uppercase font-monospace" style={{ fontSize: "0.65rem" }}>
                        <i className="bi bi-tag-fill me-1"></i>
                        {enrollment.course.category || "General"}
                      </span>
                      {courseProgress === 100 && (
                        <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2.5 py-1.5 fw-semibold small">
                          <i className="bi bi-patch-check-fill me-1"></i>Completed
                        </span>
                      )}
                    </div>

                    {/* Course Title */}
                    <h5 className="card-title fw-bold text-dark text-line-clamp-2 mb-2" style={{ minHeight: "48px", lineHeight: "1.4" }}>
                      {enrollment.course.title}
                    </h5>

                    {/* Course Summary Description Abstract */}
                    <p className="card-text text-secondary small text-line-clamp-3 mb-4" style={{ minHeight: "60px" }}>
                      {enrollment.course.description 
                        ? `${enrollment.course.description.substring(0, 85)}...` 
                        : "No course abstract overview documented for this track."}
                    </p>

                    {/* Instructor Information Metadata Badge */}
                    <div className="bg-light rounded-3 p-2.5 mb-4 d-flex align-items-center gap-2">
                      <div className="bg-secondary bg-opacity-10 text-secondary rounded-circle d-flex align-items-center justify-content-center small fw-bold" style={{ width: "28px", height: "28px", fontSize: "0.75rem" }}>
                        {(enrollment.course.instructor?.name || "U").charAt(0).toUpperCase()}
                      </div>
                      <div className="small text-muted truncate-text">
                        By <span className="fw-semibold text-dark">{enrollment.course.instructor?.name || "Anonymous Expert"}</span>
                      </div>
                    </div>

                    {/* Progress Bar Group Indicators */}
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-1.5">
                        <span className="text-secondary small fw-semibold">Course Progress</span>
                        <span className="text-dark font-monospace small fw-bold">{courseProgress}%</span>
                      </div>
                      <div className="progress rounded-pill shadow-xsm" style={{ height: "7px" }}>
                        <div
                          className={`progress-bar rounded-pill transition-bar ${
                            courseProgress === 100 
                              ? "bg-success" 
                              : courseProgress > 50 
                              ? "bg-primary" 
                              : "bg-info"
                          }`}
                          role="progressbar"
                          style={{ width: `${courseProgress}%` }}
                          aria-valuenow={courseProgress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>

                  </div>

                  {/* Card Navigation Footer Segment */}
                  <div className="card-footer bg-white border-0 p-4 pt-0 mt-auto">
                    <Link
                      to={`/course/${enrollment.course._id}`}
                      className={`btn btn-sm w-100 py-2 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-2 ${
                        courseProgress === 100 ? "btn-outline-success" : "btn-primary shadow-sm"
                      }`}
                    >
                      <span>{courseProgress > 0 ? (courseProgress === 100 ? "Review Content" : "Resume Learning") : "Start Course"}</span>
                      <i className="bi bi-arrow-right small"></i>
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