import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Shared structural layout rules for our link tags
  const baseNavLinkClass = "nav-link px-3 py-2 rounded-3 d-flex align-items-center gap-1.5 fw-semibold transition-all";

  // Dynamic style engine to apply highlighting logic based on selection state
  const handleActiveState = ({ isActive }) => {
    return isActive
      ? `${baseNavLinkClass} bg-primary bg-opacity-10 text-primary shadow-xsm`
      : `${baseNavLinkClass} text-secondary hover-bg-light`;
  };

  return (
    <>
      {/* Micro-Animation Injection Stylesheet */}
      <style>{`
        .transition-all {
          transition: all 0.22s ease-in-out !important;
        }
        .hover-bg-light:hover {
          background-color: var(--bs-gray-100) !important;
          color: var(--bs-dark) !important;
          transform: translateY(-1px);
        }
        .transition-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
        .transition-card:hover {
          transform: translateY(-3px) !important;
          box-shadow: var(--bs-box-shadow) !important;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-white bg-white border-bottom py-3 sticky-top shadow-sm px-4">
        <div className="container-fluid p-0">

          {/* Brand Identity */}
          <Link className="navbar-brand fw-bold text-dark d-flex align-items-center gap-2 fs-4 transition-all hover-bg-light p-1.5 rounded-3" to="/">
            <div className="bg-primary rounded-3 text-white d-flex align-items-center justify-content-center" style={{ width: "34px", height: "34px" }}>
              <i className="bi bi-mortarboard-fill small"></i>
            </div>
            <span style={{ letterSpacing: "-0.5px" }}>EduStream<span className="text-primary font-monospace">.</span></span>
          </Link>

          {/* Mobile Responsive Hamburger Menu Button */}
          <button
            className="navbar-toggler border-0 shadow-none p-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list fs-2 text-dark"></i>
          </button>

          {/* Navbar Containment */}
          <div className="collapse navbar-collapse" id="navbarContent">

            {/* Core Animated Navigation Items (Left Side) */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-1.5">
              <li className="nav-item">
                <NavLink className={handleActiveState} to="/">
                  <i className="bi bi-house fs-6"></i>
                  <span> Home</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={handleActiveState} to="/courses">
                  <i className="bi bi-journal-text fs-6"></i>
                  <span> Courses</span>
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className={handleActiveState} to="/about">
                  <i className="bi bi-info-circle fs-6"></i>
                  <span> About</span>
                </NavLink>
              </li>
            </ul>

            {/* Dynamic User Profile Status Links (Right Side) */}
            <div className="d-flex align-items-center mt-3 mt-lg-0 gap-2">

              {/* 1. ANONYMOUS GUEST VISITOR ACTIONS */}
              {!token && (
                <>
                  <Link className="btn btn-outline-primary fw-semibold px-3 py-2 rounded-3 small transition-all hover-bg-light" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-success fw-semibold px-3 py-2 rounded-3 shadow-sm small transition-all style-boost" to="/register" style={{ transform: 'none' }}>
                    Register
                  </Link>
                </>
              )}

              {/* 2. AUTHENTICATED USER DROPDOWN PORTAL */}
              {token && (
                <div className="dropdown">
                  <button
                    className="btn border-0 p-0 d-flex align-items-center gap-2 dropdown-toggle hide-caret shadow-none transition-all"
                    type="button"
                    id="userProfileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ transform: "scale(1)" }}
                  >
                    <div
                      className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm border border-primary border-opacity-20 hover-bg-light transition-all"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <i className="bi bi-person-fill fs-5"></i>
                    </div>
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow rounded-4 mt-2 p-2 transition-card" aria-labelledby="userProfileDropdown" style={{ minWidth: "200px" }}>

                    <li className="px-3 py-1.5 border-bottom border-light mb-1.5">
                      <span className="badge bg-primary bg-opacity-10 text-primary text-uppercase font-monospace fw-bold" style={{ fontSize: "0.65rem", letterSpacing: "0.5px" }}>
                        {role} Role
                      </span>
                    </li>

                    {/* Student View Options */}
                    {role === "student" && (
                      <>
                        <li>
                          <Link className="dropdown-item rounded-3 py-2 text-secondary d-flex align-items-center gap-2 small transition-all" to="/student/my-courses">
                            <i className="bi bi-collection-play text-info fs-6"></i> Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item rounded-3 py-2 text-secondary d-flex align-items-center gap-2 small transition-all" to="/student/profile">
                            <i className="bi bi-person-gear text-secondary fs-6"></i> Profile Settings
                          </Link>
                        </li>
                      </>
                    )}

                    {/* Instructor View Options */}
                    {role === "instructor" && (
                      <>
                        <li>
                          <Link className="dropdown-item rounded-3 py-2 text-secondary d-flex align-items-center gap-2 small transition-all" to="/instructor/dashboard">
                            <i className="bi bi-speedometer2 text-warning fs-6"></i> Dashboard Portal
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item rounded-3 py-2 text-secondary d-flex align-items-center gap-2 small transition-all" to="/student/profile">
                            <i className="bi bi-person-gear text-secondary fs-6"></i> Profile Settings
                          </Link>
                        </li>
                      </>
                    )}

                    {/* Administrator View Options */}
                    {role === "admin" && (
                      <>
                        <li>
                          <Link className="dropdown-item rounded-3 py-2 text-secondary d-flex align-items-center gap-2 small transition-all" to="/admin/dashboard">
                            <i className="bi bi-shield-lock-fill text-danger fs-6"></i> Admin Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item rounded-3 py-2 text-secondary d-flex align-items-center gap-2 small transition-all" to="/student/profile">
                            <i className="bi bi-person-gear text-secondary fs-6"></i> Profile Settings
                          </Link>
                        </li>
                      </>
                    )}

                    <li><hr className="dropdown-divider bg-light my-2" /></li>

                    <li>
                      <button className="dropdown-item rounded-3 py-2 text-danger d-flex align-items-center gap-2 small fw-bold transition-all" onClick={logout}>
                        <i className="bi bi-box-arrow-right fs-6"></i> Close Session
                      </button>
                    </li>
                  </ul>
                </div>
              )}

            </div>

          </div>
        </div>
      </nav>
    </>
  );
}