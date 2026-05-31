import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await api.get("/analytics");
      setData(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load analytics");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className="container mt-5"><div className="spinner-border text-primary">Loading...</div></div>;
  if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
  if (!data)
    return <div className="container mt-5"><div className="alert alert-warning">No analytics data</div></div>;

  return (
    <div className="container my-5">
      <div className="row g-4">
        <h1 className="mb-4">Platform Analytics</h1>
        {/* Total Users */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 border-start border-primary border-4 shadow-sm h-100">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted text-uppercase fw-bold small mb-1">Total Users</p>
                <h2 className="display-6 fw-bold text-dark mb-0">{data.totalUsers}</h2>
              </div>
              <div className="text-primary opacity-50">
                <i className="bi bi-people-fill fs-2"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Students */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 border-start border-success border-4 shadow-sm h-100">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted text-uppercase fw-bold small mb-1">Students</p>
                <h2 className="display-6 fw-bold text-dark mb-0">{data.totalStudents}</h2>
              </div>
              <div className="text-success opacity-50">
                <i className="bi bi-mortarboard-fill fs-2"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Instructors */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 border-start border-warning border-4 shadow-sm h-100">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted text-uppercase fw-bold small mb-1">Instructors</p>
                <h2 className="display-6 fw-bold text-dark mb-0">{data.totalInstructors}</h2>
              </div>
              <div className="text-warning opacity-50">
                <i className="bi bi-person-badge-fill fs-2"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="col-md-6 col-lg-3">
          <div className="card border-0 border-start border-info border-4 shadow-sm h-100">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted text-uppercase fw-bold small mb-1">Courses</p>
                <h2 className="display-6 fw-bold text-dark mb-0">{data.totalCourses}</h2>
              </div>
              <div className="text-info opacity-50">
                <i className="bi bi-book-half fs-2"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollments */}
        <div className="col-md-6 col-lg-3 mx-auto"> {/* Centered layout if row spills over cleanly */}
          <div className="card border-0 border-start border-danger border-4 shadow-sm h-100">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted text-uppercase fw-bold small mb-1">Enrollments</p>
                <h2 className="display-6 fw-bold text-dark mb-0">{data.totalEnrollments}</h2>
              </div>
              <div className="text-danger opacity-50">
                <i className="bi bi-journal-check fs-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="card border-0 shadow-sm mt-5">
        <div className="card-body p-4">
          <h5 className="fw-bold text-dark mb-4">Key Performance Indicators</h5>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <p className="text-muted small mb-1">Avg. Students / Instructor</p>
              <h4 className="fw-bold text-secondary">
                {(data.totalStudents / (data.totalInstructors || 1)).toFixed(2)}
              </h4>
            </div>
            <div className="col-md-4 border-start-md">
              <p className="text-muted small mb-1">Avg. Enrollments / Course</p>
              <h4 className="fw-bold text-secondary">
                {(data.totalEnrollments / (data.totalCourses || 1)).toFixed(2)}
              </h4>
            </div>
            <div className="col-md-4 border-start-md">
              <p className="text-muted small mb-1">Student Enrollment Rate</p>
              <h4 className="fw-bold text-secondary">
                {((data.totalEnrollments / (data.totalStudents || 1)) * 100).toFixed(2)}%
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}