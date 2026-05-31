import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { getCurrentUserId } from "../../utils/auth";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);


  const [actionMessage, setActionMessage] = useState({ type: "", text: "" });

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const courseRes = await api.get(`/courses/${id}`);
      setCourse(courseRes.data);

      const lessonsRes = await api.get(`/lessons/course/${id}`);
      setLessons(lessonsRes.data);

      if (token && role === "student") {
        const enrollmentRes = await api.get("/enroll/my-courses");
        const enrolled = enrollmentRes.data.some((e) => e.course._id === id);
        setIsEnrolled(enrolled);
      }

      setError(null);
    } catch (err) {
      setError("Failed to load course details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isInstructorOwner =
    role === "instructor" &&
    currentUserId &&
    course?.instructor?._id === currentUserId;

  const handleEnroll = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setEnrolling(true);
      await api.post("/enroll", {
        courseId: id,
      });

      setIsEnrolled(true);
      showNotification("success", "Enrolled successfully! Enjoy your learning path.");
    } catch (error) {
      showNotification("danger", error.response?.data?.message || "Failed to enroll");
    } finally {
      setEnrolling(false);
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      await api.delete(`/lessons/${lessonId}`);
      setLessons((prev) => prev.filter((lesson) => lesson._id !== lessonId));
      showNotification("success", "Lesson deleted successfully");
    } catch (error) {
      showNotification("danger", error.response?.data?.message || "Failed to delete lesson");
    }
  };

  const showNotification = (type, text) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage({ type: "", text: "" }), 4000);
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

  if (!course) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning border-0 shadow-sm rounded-4" role="alert">
          <i className="bi bi-exclamation-circle-fill me-2"></i> Course not found
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {actionMessage.text && (
        <div className={`alert alert-${actionMessage.type} border-0 shadow-sm rounded-3 fixed-top mx-auto mt-3 d-flex align-items-center gap-2`} style={{ maxWidth: "500px", zIndex: 1050 }}>
          <i className={`bi ${actionMessage.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-octagon-fill"}`}></i>
          <div className="small fw-semibold">{actionMessage.text}</div>
        </div>
      )}

      <div className="bg-light rounded-4 p-4 p-md-5 mb-4 border border-light-subtle position-relative overflow-hidden shadow-xsm">
        <div className="position-absolute top-0 end-0 p-4 opacity-10 d-none d-md-block">
          <i className="bi bi-journal-code text-primary" style={{ fontSize: "12rem" }}></i>
        </div>

        <div className="position-relative z-1" style={{ maxWidth: "750px" }}>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2 fw-semibold text-uppercase font-monospace" style={{ fontSize: "0.72rem" }}>
              <i className="bi bi-tags-fill me-1"></i> {course.category || "General"}
            </span>
            {course.price && (
              <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 fw-bold font-monospace" style={{ fontSize: "0.72rem" }}>
                ${course.price}
              </span>
            )}
          </div>

          <h1 className="fw-extrabold text-dark tracking-tight mb-2 display-6">{course.title}</h1>

          <p className="text-secondary mb-0 d-flex align-items-center gap-2 small">
            <span className="bg-secondary bg-opacity-10 text-secondary rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: "28px", height: "28px" }}>
              <i className="bi bi-person-fill"></i>
            </span>
            <span>Lead Instructor: <strong className="text-dark">{course.instructor?.name || "Unknown"}</strong></span>
          </p>

          {isInstructorOwner && (
            <div className="mt-4 pt-3 border-top border-light-subtle d-flex gap-2 flex-wrap">
              <Link to={`/instructor/edit-course/${id}`} className="btn btn-outline-secondary btn-sm fw-medium rounded-3 px-3">
                <i className="bi bi-pencil-square me-1"></i> Edit Settings
              </Link>
              <Link to={`/instructor/upload-lesson?courseId=${id}`} className="btn btn-warning btn-sm fw-semibold text-dark rounded-3 px-3">
                <i className="bi bi-plus-circle-fill me-1"></i> Add New Lesson
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">

          <div className="card border-0 shadow-sm rounded-4 p-2 bg-white mb-4">
            <div className="card-body">
              <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                <i className="bi bi-file-text text-primary"></i> Course Overview
              </h5>
              <p className="text-secondary lh-lg mb-0 small" style={{ whiteSpace: "pre-line" }}>{course.description}</p>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-2 bg-white">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                  <i className="bi bi-layers-half text-primary"></i> Curriculum Structure
                </h5>
                <span className="badge bg-light text-secondary rounded-pill px-3 py-2 fw-medium font-monospace small">
                  {lessons.length} Modules Loaded
                </span>
              </div>

              {lessons.length === 0 ? (
                <div className="text-center py-4 bg-light rounded-3 border border-dashed border-light-subtle">
                  <i className="bi bi-book-half text-muted fs-3 d-block mb-2"></i>
                  <p className="text-muted small mb-0">Syllabus timeline draft ongoing. Check back shortly!</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {lessons.map((lesson, index) => (
                    <div key={lesson._id} className="p-3 bg-light rounded-3 border border-light-subtle transition-all">
                      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-2">
                        <div className="d-flex gap-3 align-items-start">
                          <div className="bg-white rounded-3 shadow-xsm text-muted fw-bold d-flex align-items-center justify-content-center border" style={{ width: "36px", height: "36px", minWidth: "36px" }}>
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <h6 className="fw-bold text-dark mb-1">{lesson.title}</h6>
                            <p className="text-secondary small mb-0 text-break">
                              {lesson.content.substring(0, 90)}...
                            </p>
                          </div>
                        </div>

                        {isInstructorOwner && (
                          <div className="btn-group shadow-xsm rounded-3 overflow-hidden ms-auto ms-md-0">
                            <Link to={`/instructor/edit-lesson/${lesson._id}`} className="btn btn-white btn-sm text-secondary border border-light-subtle px-2.5">
                              <i className="bi bi-pencil small"></i>
                            </Link>
                            <button className="btn btn-white btn-sm text-danger border border-light-subtle px-2.5" onClick={() => deleteLesson(lesson._id)}>
                              <i className="bi bi-trash small"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 sticky-top p-2 bg-white" style={{ top: "100px" }}>
            <div className="card-body">
              {isEnrolled ? (
                <div className="bg-success bg-opacity-10 text-success rounded-4 p-4 text-center border border-success border-opacity-10">
                  <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: "48px", height: "48px" }}>
                    <i className="bi bi-patch-check-fill fs-4"></i>
                  </div>
                  <h6 className="fw-bold text-dark mb-1">Access Granted</h6>
                  <p className="text-secondary small mb-0">You are actively enrolled. All interactive syllabus modules are unlocked below.</p>
                </div>
              ) : (
                <div>
                  <h5 className="fw-bold text-dark mb-3">Course Registration</h5>
                  <p className="text-secondary small mb-4">Gain dynamic entry access immediately to learn from industry experts.</p>

                  {token ? (
                    <button
                      className="btn btn-success w-100 py-2.5 fw-semibold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                      onClick={handleEnroll}
                      disabled={enrolling}
                    >
                      {enrolling ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status"></span>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Enroll in Course</span>
                          <i className="bi bi-arrow-right-short fs-4"></i>
                        </>
                      )}
                    </button>
                  ) : (
                    <button className="btn btn-primary w-100 py-2.5 fw-semibold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2" onClick={() => navigate("/login")}>
                      <i className="bi bi-box-arrow-in-right"></i>
                      <span>Login to Enroll</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}