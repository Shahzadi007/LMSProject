import { Link } from "react-router-dom";

export default function InstructorDashboard() {
  return (
    <div className="container my-5">
      {/* Header Panel Identity */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="fw-extrabold text-dark tracking-tight mb-1">Instructor Dashboard</h2>
          <p className="text-muted small mb-0">Create new syllabi, manage existing publications, and monitor student metrics.</p>
        </div>
        
        {/* Quick Actions Primary Bar */}
        <div className="d-flex gap-2 flex-wrap">
          <Link to="/instructor/manage" className="btn btn-outline-secondary px-3 py-2 fw-medium rounded-3 small">
            <i className="bi bi-grid-3x3-gap me-1.5"></i>Manage Courses
          </Link>
          <Link to="/instructor/create" className="btn btn-primary px-3 py-2 fw-semibold rounded-3 shadow-sm small">
            <i className="bi bi-plus-circle-fill me-1.5"></i>Create Course
          </Link>
        </div>
      </div>



      {/* Workspace Interactive Directory Grid Block */}
      <div className="row g-4">
        {/* Course Creation Helper Panel */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <div className="card-body d-flex flex-column align-items-start">
              <div className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center mb-3" style={{ width: "42px", height: "42px" }}>
                <i className="bi bi-journal-plus fs-5"></i>
              </div>
              <h5 className="fw-bold text-dark mb-2">Build New Curriculum</h5>
              <p className="text-secondary small mb-4">
                Launch a clean curriculum channel track complete with metadata categorization, custom pricing tiers, and embedded step-by-step modular lesson updates.
              </p>
              <Link to="/instructor/create" className="btn btn-light text-primary fw-semibold btn-sm rounded-2 mt-auto px-3 py-2">
                Launch Course Setup <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Course Directory Helper Panel */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
            <div className="card-body d-flex flex-column align-items-start">
              <div className="bg-secondary bg-opacity-10 text-secondary rounded-3 d-flex align-items-center justify-content-center mb-3" style={{ width: "42px", height: "42px" }}>
                <i className="bi bi-folder2-open fs-5"></i>
              </div>
              <h5 className="fw-bold text-dark mb-2">Manage Active Classes</h5>
              <p className="text-secondary small mb-4">
                Review your published list directory layout, view structural curriculum indexes, perform hot-fix line edits, or update live streaming content nodes.
              </p>
              <Link to="/instructor/manage" className="btn btn-light text-secondary fw-semibold btn-sm rounded-2 mt-auto px-3 py-2">
                Open Inventory Space <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}