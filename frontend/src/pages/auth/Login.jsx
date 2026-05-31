import { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Clean local state instead of disruptive alert()

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!email.includes("@")) newErrors.email = "Valid email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      setSuccess(true);
      
      // Give the user a brief moment to see the success state before redirecting
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "Login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "440px" }}>
      <div className="card border-0 shadow rounded-4 p-4 bg-white">
        
        {/* Brand Icon & Heading */}
        <div className="text-center mb-4">
          <div className="bg-primary bg-opacity-10 text-primary rounded-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "48px", height: "48px" }}>
            <i className="bi bi-shield-lock-fill fs-4"></i>
          </div>
          <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
          <p className="text-muted small">Sign in to resume your EduStream learning path</p>
        </div>

        {/* Global Error Banner */}
        {errors.submit && (
          <div className="alert alert-danger border-0 rounded-3 small d-flex align-items-center gap-2 mb-3" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <div>{errors.submit}</div>
          </div>
        )}

        {/* Local Success Banner */}
        {success && (
          <div className="alert alert-success border-0 rounded-3 small d-flex align-items-center gap-2 mb-3" role="alert">
            <i className="bi bi-check-circle-fill"></i>
            <div>Login successful! Redirecting...</div>
          </div>
        )}

        <form onSubmit={handleLogin}>
          
          {/* Email Address Input Field */}
          <div className="mb-3">
            <label className="form-label text-secondary small fw-semibold">Email Address</label>
            <div className="input-group">
              <span className={`input-group-text bg-light border-end-0 text-muted ${errors.email ? "border-danger text-danger" : "border-light-subtle"}`}>
                <i className="bi bi-envelope"></i>
              </span>
              <input
                className={`form-control bg-light border-start-0 py-2.5 small ${errors.email ? "is-invalid" : "border-light-subtle"}`}
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || success}
              />
              {errors.email && (
                <div className="invalid-feedback d-block mt-1 small">{errors.email}</div>
              )}
            </div>
          </div>

          {/* Password Input Field */}
          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">Password</label>
            <div className="input-group">
              <span className={`input-group-text bg-light border-end-0 text-muted ${errors.password ? "border-danger text-danger" : "border-light-subtle"}`}>
                <i className="bi bi-lock"></i>
              </span>
              <input
                className={`form-control bg-light border-start-0 py-2.5 small ${errors.password ? "is-invalid" : "border-light-subtle"}`}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || success}
              />
              {errors.password && (
                <div className="invalid-feedback d-block mt-1 small">{errors.password}</div>
              )}
            </div>
          </div>

          {/* Action Submission Button */}
          <button
            className="btn btn-primary w-100 py-2.5 fw-semibold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
            type="submit"
            disabled={loading || success}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <i className="bi bi-arrow-right-short fs-5"></i>
              </>
            )}
          </button>
        </form>

        <div className="position-relative my-4">
          <hr className="text-black-50 opacity-10" />
          <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small" style={{ fontSize: "0.75rem" }}>NEW TO EDUSTREAM?</span>
        </div>

        <p className="text-center mb-0 small text-secondary">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary fw-semibold text-decoration-none">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}