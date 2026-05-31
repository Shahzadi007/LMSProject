import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/me");
      setUser(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to extract clean profile initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
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

  if (!user) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning border-0 shadow-sm" role="alert">
          <i className="bi bi-exclamation-circle-fill me-2"></i> Profile not found
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ maxWidth: "550px" }}>
      <div className="card border-0 shadow rounded-4 overflow-hidden bg-white">
        
        {/* Modern Graphic Header Banner */}
        <div 
          style={{ 
            height: "120px", 
            background: "linear-gradient(135deg, #4f46e5, #06b6d4)" 
          }}
          className="position-relative"
        >
          {/* Subtle absolute badge overlay */}
          <div className="position-absolute top-0 end-0 m-3">
            <span 
              className={`badge shadow-sm rounded-pill px-3 py-2 fw-bold text-uppercase tracking-wider font-monospace ${
                user.role === "admin"
                  ? "bg-danger text-white"
                  : user.role === "instructor"
                  ? "bg-warning text-dark"
                  : "bg-white text-primary"
              }`}
              style={{ fontSize: "0.72rem" }}
            >
              <i className="bi bi-shield-lock-fill me-1"></i> {user.role}
            </span>
          </div>
        </div>

        {/* Profile Identity Card Section */}
        <div className="text-center px-4 pb-4 position-relative" style={{ marginTop: "-50px" }}>
          {/* Circular Glassmorphic Initials Avatar */}
          <div 
            className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center shadow border border-4 border-white text-primary fw-bold mb-3 font-monospace"
            style={{ width: "100px", height: "100px", fontSize: "2rem" }}
          >
            {getInitials(user.name)}
          </div>
          
          <h3 className="fw-bold text-dark mb-1">{user.name}</h3>
          <p className="text-muted small mb-4">{user.email}</p>

          {/* Clean Informational Stack */}
          <div className="text-start bg-light rounded-4 p-3 border border-light">
            
            {/* Full Name Info Strip */}
            <div className="d-flex align-items-center justify-content-between p-2.5 rounded-3 bg-white mb-2 shadow-xsm">
              <div className="d-flex align-items-center gap-3">
                <div className="text-secondary bg-light p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: "38px", height: "38px" }}>
                  <i className="bi bi-person-bounding-box text-primary fs-5"></i>
                </div>
                <div>
                  <small className="text-muted d-block" style={{ fontSize: "0.72rem" }}>Full Name</small>
                  <span className="text-dark fw-semibold small">{user.name}</span>
                </div>
              </div>
            </div>

            {/* Email Info Strip */}
            <div className="d-flex align-items-center justify-content-between p-2.5 rounded-3 bg-white mb-2 shadow-xsm">
              <div className="d-flex align-items-center gap-3">
                <div className="text-secondary bg-light p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: "38px", height: "38px" }}>
                  <i className="bi bi-envelope-at text-success fs-5"></i>
                </div>
                <div>
                  <small className="text-muted d-block" style={{ fontSize: "0.72rem" }}>Email Address</small>
                  <span className="text-dark fw-semibold small">{user.email}</span>
                </div>
              </div>
            </div>

            {/* Registration Date Info Strip */}
            <div className="d-flex align-items-center justify-content-between p-2.5 rounded-3 bg-white shadow-xsm">
              <div className="d-flex align-items-center gap-3">
                <div className="text-secondary bg-light p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: "38px", height: "38px" }}>
                  <i className="bi bi-calendar-check text-info fs-5"></i>
                </div>
                <div>
                  <small className="text-muted d-block" style={{ fontSize: "0.72rem" }}>Member Since</small>
                  <span className="text-dark fw-semibold small">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}