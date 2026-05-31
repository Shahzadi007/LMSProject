import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function CreateCourse() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    price: "",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Course title is required";
    if (!form.description.trim()) newErrors.description = "Course description is required";
    if (form.price && isNaN(form.price)) newErrors.price = "Price must be a valid number";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const create = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrors({});
      await api.post("/courses", {
        title: form.title,
        description: form.description,
        category: form.category,
        price: form.price ? parseFloat(form.price) : 0,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/instructor/manage");
      }, 1500);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || "Failed to compile new course entry" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "720px" }}>
      <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
        
        {/* Component Title Header Area */}
        <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom border-light-subtle">
          <div className="bg-primary bg-opacity-10 text-primary rounded-3 d-inline-flex align-items-center justify-content-center" style={{ width: "46px", height: "46px" }}>
            <i className="bi bi-journal-plus fs-4"></i>
          </div>
          <div>
            <h3 className="fw-extrabold text-dark tracking-tight mb-0">Create New Course</h3>
            <p className="text-muted small mb-0">Draft a fresh syllabus curriculum structure and configure pricing targets.</p>
          </div>
        </div>

        {/* Global Server Catch Alert Banner */}
        {errors.submit && (
          <div className="alert alert-danger border-0 rounded-3 small d-flex align-items-center gap-2 mb-4 shadow-sm" role="alert">
            <i className="bi bi-exclamation-triangle-fill fs-6"></i>
            <div className="fw-medium">{errors.submit}</div>
          </div>
        )}

        {/* Dynamic Inline Success Notification */}
        {success && (
          <div className="alert alert-success border-0 rounded-3 small d-flex align-items-center gap-2 mb-4 shadow-sm" role="alert">
            <i className="bi bi-check-circle-fill fs-6"></i>
            <div className="fw-medium">Course compiled successfully! Relocating to content manager...</div>
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          
          {/* Input Block: Course Title */}
          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">Course Title</label>
            <div className="input-group">
              <span className={`input-group-text bg-light border-end-0 text-muted ${errors.title ? "border-danger text-danger" : "border-light-subtle"}`}>
                <i className="bi bi-book"></i>
              </span>
              <input
                className={`form-control bg-light border-start-0 py-2.5 small ${errors.title ? "is-invalid" : "border-light-subtle"}`}
                placeholder="e.g. Android Clean Architecture Essentials"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                disabled={loading || success}
              />
              {errors.title && <div className="invalid-feedback d-block mt-1 small font-medium">{errors.title}</div>}
            </div>
          </div>

          {/* Input Block: Description Abstract */}
          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">Course Description Abstract</label>
            <textarea
              className={`form-control bg-light py-2.5 small ${errors.description ? "is-invalid" : "border-light-subtle"}`}
              placeholder="Provide an engaging summary detailing modular goals, technologies taught, and required project scopes..."
              rows="6"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              disabled={loading || success}
              style={{ resize: "none" }}
            />
            {errors.description && <div className="invalid-feedback d-block mt-1 small font-medium">{errors.description}</div>}
          </div>

          {/* Combined Secondary Settings Row */}
          <div className="row g-4 mb-4">
            
            {/* Category Dropdown Component */}
            <div className="col-md-6">
              <label className="form-label text-secondary small fw-semibold">Structural Category Mapping</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted border-light-subtle">
                  <i className="bi bi-tags"></i>
                </span>
                <select
                  className="form-select bg-light border-start-0 py-2.5 small border-light-subtle fw-medium"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  disabled={loading || success}
                >
                  <option value="General">General</option>
                  <option value="Programming">Programming — Engineering</option>
                  <option value="Design">Design — User Experience</option>
                  <option value="Business">Business — Management</option>
                  <option value="Marketing">Marketing — Growth</option>
                  <option value="Other">Other Category Paths</option>
                </select>
              </div>
            </div>

            {/* Price Metric Input Field */}
            <div className="col-md-6">
              <label className="form-label text-secondary small fw-semibold">Price Point Tier ($ USD)</label>
              <div className="input-group">
                <span className={`input-group-text bg-light border-end-0 text-muted ${errors.price ? "border-danger text-danger" : "border-light-subtle"}`}>
                  <i className="bi bi-currency-dollar"></i>
                </span>
                <input
                  type="text"
                  className={`form-control bg-light border-start-0 py-2.5 small ${errors.price ? "is-invalid" : "border-light-subtle"}`}
                  placeholder="0 or empty for Free Access"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  disabled={loading || success}
                />
                {errors.price && <div className="invalid-feedback d-block mt-1 small font-medium">{errors.price}</div>}
              </div>
            </div>

          </div>

          {/* Action Trigger Row Buttons */}
          <div className="d-flex align-items-center gap-2 pt-3 border-top border-light-subtle mt-4">
            <button
              className="btn btn-primary py-2.5 px-4 fw-semibold rounded-3 shadow-sm d-flex align-items-center gap-2"
              onClick={create}
              disabled={loading || success}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Compiling Structure...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-cloud-plus-fill fs-5"></i>
                  <span>Publish Course</span>
                </>
              )}
            </button>
            
            <button
              className="btn btn-white border border-light-subtle py-2.5 px-4 fw-medium text-secondary rounded-3 small"
              onClick={() => navigate("/instructor/manage")}
              disabled={loading || success}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}