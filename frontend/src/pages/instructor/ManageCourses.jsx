import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { getCurrentUserId } from "../../utils/auth";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);


  const [actionMessage, setActionMessage] = useState({ type: "", text: "" });
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/courses");
      setCourses(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load your courses inventory");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const myCourses = courses.filter((course) => {
    const instructorId = course.instructor?._id || course.instructor;
    return instructorId === currentUserId;
  });

  const deleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this course and all its modules?")) return;

    try {
      setDeleting(id);
      await api.delete(`/courses/${id}`);
      showNotification("success", "Course deleted successfully");
      loadCourses();
    } catch (error) {
      showNotification("danger", error.response?.data?.message || "Failed to delete course");
    } finally {
      setDeleting(null);
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

  return (
    <div className="container my-5">
      {actionMessage.text && (
        <div className={`alert alert-${actionMessage.type} border-0 shadow rounded-3 fixed-top mx-auto mt-3 d-flex align-items-center gap-2`} style={{ maxWidth: "450px", zIndex: 1050 }}>
          <i className={`bi ${actionMessage.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-octagon-fill"}`}></i>
          <div className="small fw-semibold">{actionMessage.text}</div>
        </div>
      )}

      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-4 gap-3">
        <div>
          <h2 className="fw-extrabold text-dark tracking-tight mb-1">My Courses</h2>
          <p className="text-muted small mb-0">Organize curriculums, edit materials, or expand your instructional content footprints.</p>
        </div>
        <Link to="/instructor/create" className="btn btn-primary px-3 py-2 fw-semibold rounded-3 shadow-sm small align-self-start align-self-sm-center">
          <i className="bi bi-plus-lg me-1.5"></i>Create New Course
        </Link>
      </div>

      {myCourses.length === 0 ? (
        <div className="alert alert-info border-0 shadow-sm rounded-4 p-4 text-center" role="alert">
          <i className="bi bi-book text-primary fs-2 d-block mb-2"></i>
          <h6 className="fw-bold text-dark">No courses found</h6>
          <p className="text-secondary small mb-3">You haven't published or built any course structures yet.</p>
          <Link to="/instructor/create" className="btn btn-sm btn-primary fw-semibold rounded-2 px-3">
            Create Your First Course
          </Link>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light border-bottom border-light-subtle">
                <tr>
                  <th className="px-4 py-3 text-secondary text-uppercase font-monospace small" style={{ fontSize: "0.72rem" }}>Course Title</th>
                  <th className="py-3 text-secondary text-uppercase font-monospace small" style={{ fontSize: "0.72rem" }}>Category</th>
                  <th className="py-3 text-secondary text-uppercase font-monospace small" style={{ fontSize: "0.72rem" }}>Price</th>
                  <th className="py-3 text-secondary text-uppercase font-monospace small" style={{ fontSize: "0.72rem" }}>Overview Abstract</th>
                  <th className="px-4 py-3 text-end text-secondary text-uppercase font-monospace small" style={{ fontSize: "0.72rem" }}>Workspace Management Operations</th>
                </tr>
              </thead>
              <tbody>
                {myCourses.map((course) => (
                  <tr key={course._id}>
                    <td className="px-4 py-3">
                      <span className="fw-bold text-dark text-break">{course.title}</span>
                    </td>

                    <td className="py-3">
                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-2.5 py-1.5 fw-semibold text-uppercase font-monospace" style={{ fontSize: "0.68rem" }}>
                        {course.category || "General"}
                      </span>
                    </td>

                    <td className="py-3 fw-bold font-monospace text-dark">
                      {course.price ? `$${course.price}` : <span className="text-success small fw-semibold">Free</span>}
                    </td>

                    <td className="py-3 text-secondary small text-wrap" style={{ maxWidth: "220px" }}>
                      {course.description ? `${course.description.substring(0, 55)}...` : <em className="text-muted">No description provided</em>}
                    </td>

                    <td className="px-4 py-3 text-end">
                      <div className="d-inline-flex gap-1.5 flex-wrap justify-content-end">
                        <Link to={`/course/${course._id}`} className="btn btn-white btn-sm text-primary border border-light-subtle rounded-2 px-2.5 shadow-xsm small" title="View Course Details">
                          <i className="bi bi-eye me-1"></i>View
                        </Link>

                        <Link to={`/instructor/edit-course/${course._id}`} className="btn btn-white btn-sm text-secondary border border-light-subtle rounded-2 px-2.5 shadow-xsm small" title="Modify General Meta properties">
                          <i className="bi bi-pencil"></i>
                        </Link>

                        <Link to={`/instructor/upload-lesson?courseId=${course._id}`} className="btn btn-light-warning btn-sm text-warning-emphasis bg-warning bg-opacity-10 border border-warning border-opacity-10 rounded-2 px-2.5 fw-medium small" title="Append New Module Lesson Track">
                          <i className="bi bi-plus-circle-fill me-1"></i>Add Lesson
                        </Link>

                        <button
                          className="btn btn-white btn-sm text-danger border border-light-subtle rounded-2 px-2.5 shadow-xsm small"
                          onClick={() => deleteCourse(course._id)}
                          disabled={deleting === course._id}
                          title="Purge From System Storage"
                        >
                          {deleting === course._id ? (
                            <span className="spinner-border spinner-border-sm" role="status"></span>
                          ) : (
                            <i className="bi bi-trash3"></i>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}