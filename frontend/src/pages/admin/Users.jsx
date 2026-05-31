import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  
  // UI Notification State instead of native window alert popups
  const [actionMessage, setActionMessage] = useState({ type: "", text: "" });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load users data list");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to permanently remove this user account?")) return;

    try {
      setDeleting(id);
      await api.delete(`/users/${id}`);
      showNotification("success", "User account removed successfully");
      fetchUsers();
    } catch (error) {
      showNotification("danger", error.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleting(null);
    }
  };

  const showNotification = (type, text) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage({ type: "", text: "" }), 4000);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Quick Counter Metrics calculations
  const totalCount = users.length;
  const adminCount = users.filter(u => u.role === "admin").length;
  const instructorCount = users.filter(u => u.role === "instructor").length;

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
      
      {/* Top Banner Dynamic Notifications */}
      {actionMessage.text && (
        <div className={`alert alert-${actionMessage.type} border-0 shadow rounded-3 fixed-top mx-auto mt-3 d-flex align-items-center gap-2`} style={{ maxWidth: "450px", zIndex: 1050 }}>
          <i className={`bi ${actionMessage.type === "success" ? "bi-check-circle-fill" : "bi-exclamation-octagon-fill"}`}></i>
          <div className="small fw-semibold">{actionMessage.text}</div>
        </div>
      )}

      {/* Header Block Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
        <div>
          <h2 className="fw-extrabold text-dark tracking-tight mb-1">User Management</h2>
          <p className="text-muted small mb-0">Review, manage access properties, and control global user roles across the platform.</p>
        </div>
      </div>

      {/* Modern Dashboard Micro Metric Widgets */}
      {totalCount > 0 && (
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-3 bg-white p-2">
              <div className="card-body d-flex align-items-center gap-3 py-2">
                <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-2.5 fs-5 d-inline-flex"><i className="bi bi-people-fill"></i></div>
                <div>
                  <div className="text-secondary tracking-wide text-uppercase font-monospace" style={{ fontSize: "0.65rem" }}>Total Users</div>
                  <h5 className="fw-bold text-dark mb-0">{totalCount}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-3 bg-white p-2">
              <div className="card-body d-flex align-items-center gap-3 py-2">
                <div className="bg-danger bg-opacity-10 text-danger rounded-3 p-2.5 fs-5 d-inline-flex"><i className="bi bi-shield-lock-fill"></i></div>
                <div>
                  <div className="text-secondary tracking-wide text-uppercase font-monospace" style={{ fontSize: "0.65rem" }}>Admins</div>
                  <h5 className="fw-bold text-dark mb-0">{adminCount}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-3 bg-white p-2">
              <div className="card-body d-flex align-items-center gap-3 py-2">
                <div className="bg-warning bg-opacity-10 text-warning-emphasis rounded-3 p-2.5 fs-5 d-inline-flex"><i className="bi bi-person-workspace"></i></div>
                <div>
                  <div className="text-secondary tracking-wide text-uppercase font-monospace" style={{ fontSize: "0.65rem" }}>Instructors</div>
                  <h5 className="fw-bold text-dark mb-0">{instructorCount}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card border-0 shadow-sm rounded-3 bg-white p-2">
              <div className="card-body d-flex align-items-center gap-3 py-2">
                <div className="bg-success bg-opacity-10 text-success rounded-3 p-2.5 fs-5 d-inline-flex"><i className="bi bi-mortarboard-fill"></i></div>
                <div>
                  <div className="text-secondary tracking-wide text-uppercase font-monospace" style={{ fontSize: "0.65rem" }}>Students</div>
                  <h5 className="fw-bold text-dark mb-0">{totalCount - adminCount - instructorCount}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Core User Data Control Table Area */}
      {users.length === 0 ? (
        <div className="alert alert-info border-0 shadow-sm rounded-4 d-flex align-items-center gap-2" role="alert">
          <i className="bi bi-info-circle-fill"></i>
          <div>No platform user accounts registered currently.</div>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light border-bottom border-light-subtle">
                <tr>
                  <th className="px-4 py-3 text-secondary text-uppercase font-monospace small" style={{ fontSize: "0.72rem" }}>Profile Information</th>
                  <th className="py-3 text-secondary text-uppercase font-monospace small" style={{ fontSize: "0.72rem" }}>Email Address</th>
                  <th className="py-3 text-secondary text-uppercase font-monospace small" style={{ fontSize: "0.72rem" }}>System Role</th>
                  <th className="py-3 text-secondary text-uppercase font-monospace small" style={{ fontSize: "0.72rem" }}>Registration Date</th>
                  <th className="px-4 py-3 text-end text-secondary text-uppercase font-monospace small" style={{ fontSize: "0.72rem" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    {/* User Profile Cell */}
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="bg-light text-secondary rounded-circle d-flex align-items-center justify-content-center fw-bold border"
                          style={{ width: "36px", height: "36px", fontSize: "0.85rem" }}
                        >
                          {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <span className="fw-semibold text-dark text-break">{u.name}</span>
                      </div>
                    </td>

                    {/* Email Cell */}
                    <td className="py-3 text-secondary small text-break">{u.email}</td>

                    {/* Modern Dynamic Badge Row */}
                    <td className="py-3">
                      <span
                        className={`badge rounded-pill px-2.5 py-1.5 fw-semibold text-uppercase font-monospace ${
                          u.role === "admin"
                            ? "bg-danger bg-opacity-10 text-danger"
                            : u.role === "instructor"
                            ? "bg-warning bg-opacity-10 text-warning-emphasis"
                            : "bg-primary bg-opacity-10 text-primary"
                        }`}
                        style={{ fontSize: "0.68rem", letterSpacing: "0.3px" }}
                      >
                        <i className={`bi me-1 ${u.role === 'admin' ? 'bi-shield-fill-check' : u.role === 'instructor' ? 'bi-person-workspace' : 'bi-mortarboard-fill'}`}></i>
                        {u.role}
                      </span>
                    </td>

                    {/* Creation Date Format Cell */}
                    <td className="py-3 text-muted font-monospace small">
                      {new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>

                    {/* Operations Action Trigger Button Group */}
                    <td className="px-4 py-3 text-end">
                      <button
                        className="btn btn-sm btn-link text-danger text-decoration-none fw-semibold p-1 px-2 rounded-2 hover-bg-danger-subtle d-inline-flex align-items-center gap-1 small"
                        onClick={() => deleteUser(u._id)}
                        disabled={deleting === u._id}
                      >
                        {deleting === u._id ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="small">Removing...</span>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-trash3 small"></i>
                            <span>Delete</span>
                          </>
                        )}
                      </button>
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