import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container my-5">
      {/* Header Section */}
      <div className="mb-5">
        <h2 className="fw-bold text-dark mb-1">Admin Dashboard</h2>
        <p className="text-muted mb-0">Overview and management panel for system-wide operations.</p>
      </div>

      {/* Grid Row */}
      <div className="row g-4">
        
        {/* Users Card */}
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 border-start border-primary border-4 shadow-sm h-100 rounded-3 bg-white">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold text-dark mb-1">Users</h5>
                <p className="text-muted small mb-0">Manage all system users</p>
              </div>
              {/* Opaque side icon */}
              <div className="text-primary opacity-50">
                <i className="bi bi-people fs-2"></i>
              </div>
            </div>
            <div className="card-footer bg-transparent border-0 p-4 pt-0">
              <Link to="/admin/users" className="btn btn-primary btn-sm w-100 py-2 fw-semibold rounded-2">
                View Users <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Courses Card */}
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 border-start border-warning border-4 shadow-sm h-100 rounded-3 bg-white">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold text-dark mb-1">Courses</h5>
                <p className="text-muted small mb-0">Manage all courses</p>
              </div>
              {/* Opaque side icon */}
              <div className="text-warning opacity-50">
                <i className="bi bi-book fs-2"></i>
              </div>
            </div>
            <div className="card-footer bg-transparent border-0 p-4 pt-0">
              <Link to="/courses" className="btn btn-warning btn-sm w-100 py-2 fw-semibold rounded-2 text-warning-emphasis">
                View Courses <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Analytics Card */}
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 border-start border-info border-4 shadow-sm h-100 rounded-3 bg-white">
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <h5 className="fw-bold text-dark mb-1">Analytics</h5>
                <p className="text-muted small mb-0">View system analytics</p>
              </div>
              {/* Opaque side icon */}
              <div className="text-info opacity-50">
                <i className="bi bi-graph-up fs-2"></i>
              </div>
            </div>
            <div className="card-footer bg-transparent border-0 p-4 pt-0">
              <Link to="/admin/analytics" className="btn btn-info btn-sm w-100 py-2 fw-semibold rounded-2 text-info-emphasis">
                View Analytics <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}