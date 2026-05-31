import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = null }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4>Access Denied</h4>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
}