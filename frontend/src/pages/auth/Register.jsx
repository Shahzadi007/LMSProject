import { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Local state for dynamic alert banner
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const validateForm = () => {

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email is required";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      setSuccess(true);

      // Short delay so the user clearly sees the success banner before navigating
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "480px" }}>
      <div className="card border-0 shadow rounded-4 p-4 bg-white">

        {/* Header Header Brand Identity */}
        <div className="text-center mb-4">
          <div className="bg-primary bg-opacity-10 text-primary rounded-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "48px", height: "48px" }}>
            <i className="bi bi-person-plus-fill fs-4"></i>
          </div>
          <h3 className="fw-bold text-dark mb-1">Create Your Account</h3>
          <p className="text-muted small">Join EduStream to begin taking professional training lines</p>
        </div>

        {/* Global Structural Errors Banner */}
        {errors.submit && (
          <div className="alert alert-danger border-0 rounded-3 small d-flex align-items-center gap-2 mb-3" role="alert">
            <i className="bi bi-exclamation-triangle-fill"></i>
            <div>{errors.submit}</div>
          </div>
        )}

        {/* Dynamic Success Redirect Banner */}
        {success && (
          <div className="alert alert-success border-0 rounded-3 small d-flex align-items-center gap-2 mb-3" role="alert">
            <i className="bi bi-check-circle-fill"></i>
            <div>Registration successful! Redirecting to login...</div>
          </div>
        )}

        <form onSubmit={submit}>

          {/* Full Name Input Block */}
          <div className="mb-3">
            <label className="form-label text-secondary small fw-semibold">Full Name</label>
            <div className="input-group">
              <span className={`input-group-text bg-light border-end-0 text-muted ${errors.name ? "border-danger text-danger" : "border-light-subtle"}`}>
                <i className="bi bi-person"></i>
              </span>
              <input
                className={`form-control bg-light border-start-0 py-2.5 small ${errors.name ? "is-invalid" : "border-light-subtle"}`}
                placeholder="John Doe"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                disabled={loading || success}
              />
              {errors.name && <div className="invalid-feedback d-block mt-1 small">{errors.name}</div>}
            </div>
          </div>

          {/* Email Address Input Block */}
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
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                disabled={loading || success}
              />
              {errors.email && <div className="invalid-feedback d-block mt-1 small">{errors.email}</div>}
            </div>
          </div>

          {/* Password Input Block */}
          <div className="mb-3">
            <label className="form-label text-secondary small fw-semibold">Password</label>
            <div className="input-group">
              <span className={`input-group-text bg-light border-end-0 text-muted ${errors.password ? "border-danger text-danger" : "border-light-subtle"}`}>
                <i className="bi bi-lock"></i>
              </span>
              <input
                className={`form-control bg-light border-start-0 py-2.5 small ${errors.password ? "is-invalid" : "border-light-subtle"}`}
                type="password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                disabled={loading || success}
              />
              {errors.password && <div className="invalid-feedback d-block mt-1 small">{errors.password}</div>}
            </div>
          </div>

          {/* Confirm Password Input Block */}
          <div className="mb-3">
            <label className="form-label text-secondary small fw-semibold">Confirm Password</label>
            <div className="input-group">
              <span className={`input-group-text bg-light border-end-0 text-muted ${errors.confirmPassword ? "border-danger text-danger" : "border-light-subtle"}`}>
                <i className="bi bi-shield-lock"></i>
              </span>
              <input
                className={`form-control bg-light border-start-0 py-2.5 small ${errors.confirmPassword ? "is-invalid" : "border-light-subtle"}`}
                type="password"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmPassword: e.target.value,
                  })
                }
                disabled={loading || success}
              />
              {errors.confirmPassword && <div className="invalid-feedback d-block mt-1 small">{errors.confirmPassword}</div>}
            </div>
          </div>

          {/* Role Account Categorization Selector */}
          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">Account Type</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted border-light-subtle">
                <i className="bi bi-briefcase"></i>
              </span>
              <select
                className="form-select bg-light border-start-0 py-2.5 small border-light-subtle fw-medium"
                value={form.role}
                onChange={(e) => {
                  const selectedRole = e.target.value;

                  if (selectedRole === "admin") {
                    const confirmed = window.confirm(
                      "Admin accounts have elevated privileges and should only be used for testing or system administration.\n\nDo you want to continue?"
                    );

                    if (!confirmed) {
                      return;
                    }
                  }

                  setForm({
                    ...form,
                    role: selectedRole,
                  });
                }}
                disabled={loading || success}
              >
                <option value="student">Student — Want to learn skills</option>
                <option value="instructor">Instructor — Want to build courses</option>
                <option value="admin" style={{ color: "red", fontWeight: "bold" }}>Admin — Just for testing purposes</option>

              </select>
            </div>
            <div className="form-text text-muted mt-1.5" style={{ fontSize: '0.72rem' }}>
              <i className="bi bi-info-circle me-1"></i> Admin permissions can only be granted by existing system administrators.
            </div>
          </div>

          {/* Form Action Submit Button Trigger */}
          <button
            className="btn btn-primary w-100 py-2.5 fw-semibold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 mb-3"
            type="submit"
            disabled={loading || success}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Register</span>
                <i className="bi bi-check-lg fs-5"></i>
              </>
            )}
          </button>

          <div className="position-relative my-4">
            <hr className="text-black-50 opacity-10" />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small" style={{ fontSize: "0.75rem" }}>HAVE AN ACCOUNT?</span>
          </div>

          <p className="text-center mb-0 small text-secondary">
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-semibold text-decoration-none">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}