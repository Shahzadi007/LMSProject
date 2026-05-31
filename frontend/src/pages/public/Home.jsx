import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <div>
      {/* Premium Hero Section */}
      <section 
        className="text-white py-5 position-relative overflow-hidden"
        style={{ 
          background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
          paddingTop: "6rem !important",
          paddingBottom: "6rem !important"
        }}
      >
        <div className="container text-center py-4 position-relative z-1">
          <h1 className="display-4 fw-extrabold mb-3 text-white tracking-tight">
            Welcome to EduStream<span className="text-warning">.</span>
          </h1>
          <p className="lead text-white-50 max-w-2xl mx-auto mb-4 fw-medium fs-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Your premium Learning Management System for expert-led online training and career growth paths.
          </p>
          
          {!token ? (
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Link to="/courses" className="btn btn-light btn-lg px-4 py-2.5 fw-semibold rounded-3 shadow-sm text-primary">
                Browse Courses <i className="bi bi-compass ms-1"></i>
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-lg px-4 py-2.5 fw-semibold rounded-3">
                Get Started
              </Link>
            </div>
          ) : (
            <div className="mt-4">
              <Link to={role === "admin" ? "/admin/dashboard" : role === "instructor" ? "/instructor/dashboard" : "/student/my-courses"} className="btn btn-light btn-lg px-4 py-2.5 fw-semibold rounded-3 shadow-sm text-primary">
                View Your Dashboard <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Modernized Features Section */}
      <section className="container my-5 py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark mb-2">Key Core Features</h2>
          <p className="text-muted small">Everything you need to succeed in your professional learning goals.</p>
        </div>
        
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="card-body text-center d-flex flex-column align-items-center">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: "60px", height: "60px" }}>
                  <i className="bi bi-collection-play fs-3"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Rich Course Library</h5>
                <p className="text-secondary small mb-0">
                  Access a highly curated range of paths and masterclasses built directly by leading industry veterans.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="card-body text-center d-flex flex-column align-items-center">
                <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: "60px", height: "60px" }}>
                  <i className="bi bi-person-workspace fs-3"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Expert Instructors</h5>
                <p className="text-secondary small mb-0">
                  Learn directly from verified professionals who have proven hands-on field experience.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-3 bg-white">
              <div className="card-body text-center d-flex flex-column align-items-center">
                <div className="bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: "60px", height: "60px" }}>
                  <i className="bi bi-speedometer fs-3"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Progress Tracking</h5>
                <p className="text-secondary small mb-0">
                  Keep tabs on your course progress metrics, scores, completion certificates, and career milestones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Re-imagined Call To Action (CTA) Section */}
      <section className="bg-light py-5 border-top border-bottom border-light-subtle">
        <div className="container text-center py-3">
          <h2 className="fw-bold text-dark mb-3">Ready to Start Learning?</h2>
          
          {!token ? (
            <>
              <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: "500px" }}>
                Join an active ecosystem of thousands of remote engineers and builders growing online today.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <Link to="/register" className="btn btn-primary px-4 py-2 fw-semibold rounded-3 shadow-sm">
                  Register Now
                </Link>
                <Link to="/login" className="btn btn-outline-secondary px-4 py-2 fw-semibold rounded-3">
                  Already a Member? Login
                </Link>
              </div>
            </>
          ) : role === "instructor" ? (
            <>
              <p className="text-secondary mb-4">Empower the network by building specialized interactive course content lines.</p>
              <Link to="/instructor/create" className="btn btn-primary px-4 py-2 fw-semibold rounded-3 shadow-sm">
                <i className="bi bi-plus-lg me-1.5"></i>Create a Course
              </Link>
            </>
          ) : (
            <>
              <p className="text-secondary mb-4">Pick up right where you left off in your professional dashboard tracking views.</p>
              <Link to="/courses" className="btn btn-primary px-4 py-2 fw-semibold rounded-3 shadow-sm">
                Explore Courses <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Minimalist Corporate Footer */}
      <footer className="bg-dark text-white-50 py-4 border-top border-secondary border-opacity-10">
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 small">
            <p className="mb-0">&copy; {new Date().getFullYear()} EduStream. All rights reserved.</p>
            <div className="d-flex gap-3">
              <span className="opacity-50">Privacy Policy</span>
              <span className="opacity-50">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}