import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { getCurrentUserId } from "../../utils/auth";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    price: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/courses/${id}`);
        const course = res.data;

        const currentUserId = getCurrentUserId();
        if (course.instructor?._id !== currentUserId) {
          setError("You are not authorized to modify this course asset.");
          return;
        }

        setForm({
          title: course.title || "",
          description: course.description || "",
          category: course.category || "General",
          price: course.price?.toString() || "",
        });
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const validateForm = () => {
    const errorsMap = {};
    if (!form.title.trim()) errorsMap.title = "Course title is required";
    if (!form.description.trim()) errorsMap.description = "Course description is required";
    if (form.price && isNaN(form.price)) errorsMap.price = "Price must be a valid number";

    setFieldErrors(errorsMap);
    return Object.keys(errorsMap).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      setError(null);
      await api.put(`/courses/${id}`, {
        title: form.title,
        description: form.description,
        category: form.category,
        price: form.price ? parseFloat(form.price) : 0,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/instructor/manage");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update course configurations");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container my-5 text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ maxWidth: "720px" }}>
      <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">

        <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom border-light-subtle">
          <div className="bg-secondary bg-opacity-10 text-secondary rounded-3 d-inline-flex align-items-center justify-content-center" style={{ width: "46px", height: "46px" }}>
            <i className="bi bi-pencil-square fs-4"></i>
          </div>
          <div>
            <h3 className="fw-extrabold text-dark tracking-tight mb-0">Edit Course</h3>
            <p className="text-muted small mb-0">Modify information parameters and adjust your pricing matrix model.</p>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger border-0 rounded-3 small d-flex align-items-center gap-2 mb-4 shadow-sm" role="alert">
            <i className="bi bi-exclamation-triangle-fill fs-6"></i>
            <div className="fw-medium">{error}</div>
          </div>
        )}

        {success && (
          <div className="alert alert-success border-0 rounded-3 small d-flex align-items-center gap-2 mb-4 shadow-sm" role="alert">
            <i className="bi bi-check-circle-fill fs-6"></i>
            <div className="fw-medium">Course updated successfully! Returning to inventory layout...</div>
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()}>

          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">Course Title</label>
            <div className="input-group">
              <span className={`input-group-text bg-light border-end-0 text-muted ${fieldErrors.title ? "border-danger text-danger" : "border-light-subtle"}`}>
                <i className="bi bi-journal-text"></i>
              </span>
              <input
                className={`form-control bg-light border-start-0 py-2.5 small ${fieldErrors.title ? "is-invalid" : "border-light-subtle"}`}
                placeholder="e.g. Advanced Kotlin Optimization Patterns"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                disabled={saving || success}
              />
              {fieldErrors.title && <div className="invalid-feedback d-block mt-1 small font-medium">{fieldErrors.title}</div>}
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">Course Overview Description</label>
            <textarea
              className={`form-control bg-light py-2.5 small ${fieldErrors.description ? "is-invalid" : "border-light-subtle"}`}
              rows="6"
              placeholder="Provide a thorough architectural overview abstract of your core course track lessons..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              disabled={saving || success}
              style={{ resize: "none" }}
            />
            {fieldErrors.description && <div className="invalid-feedback d-block mt-1 small font-medium">{fieldErrors.description}</div>}
          </div>

          <div className="row g-4 mb-4">
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
                  disabled={saving || success}
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

            <div className="col-md-6">
              <label className="form-label text-secondary small fw-semibold">Price Point Tiers ($ USD)</label>
              <div className="input-group">
                <span className={`input-group-text bg-light border-end-0 text-muted ${fieldErrors.price ? "border-danger text-danger" : "border-light-subtle"}`}>
                  <i className="bi bi-currency-dollar"></i>
                </span>
                <input
                  type="text"
                  className={`form-control bg-light border-start-0 py-2.5 small ${fieldErrors.price ? "is-invalid" : "border-light-subtle"}`}
                  placeholder="Leave 0 or empty for Free Access"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  disabled={saving || success}
                />
                {fieldErrors.price && <div className="invalid-feedback d-block mt-1 small font-medium">{fieldErrors.price}</div>}
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 pt-3 border-top border-light-subtle mt-4">
            <button
              className="btn btn-primary py-2.5 px-4 fw-semibold rounded-3 shadow-sm d-flex align-items-center gap-2"
              onClick={handleSave}
              disabled={saving || success}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Saving Updates...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-cloud-arrow-up-fill fs-5"></i>
                  <span>Save Changes</span>
                </>
              )}
            </button>

            <button
              className="btn btn-white border border-light-subtle py-2.5 px-4 fw-medium text-secondary rounded-3 small"
              onClick={() => navigate("/instructor/manage")}
              disabled={saving || success}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}