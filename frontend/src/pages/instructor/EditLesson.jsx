import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { getCurrentUserId } from "../../utils/auth";

export default function EditLesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    videoUrl: "",
  });
  const [courseTitle, setCourseTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/lessons/${id}`);
        const lesson = res.data;

        const currentUserId = getCurrentUserId();
        const lessonInstructorId =
          lesson.course?.instructor?._id || lesson.course?.instructor;

        if (lessonInstructorId !== currentUserId) {
          setError("You are not authorized to edit this content track resource.");
          return;
        }

        setForm({
          title: lesson.title || "",
          content: lesson.content || "",
          videoUrl: lesson.videoUrl || "",
        });
        setCourseTitle(lesson.course?.title || "");
        setCourseId(lesson.course?._id || "");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load lesson configurations");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  const validateForm = () => {
    const errorsMap = {};
    if (!form.title.trim()) errorsMap.title = "Lesson title headline is required";

    setFieldErrors(errorsMap);
    return Object.keys(errorsMap).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      setError(null);
      await api.put(`/lessons/${id}`, {
        title: form.title,
        content: form.content,
        videoUrl: form.videoUrl,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate(courseId ? `/course/${courseId}` : "/instructor/manage");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to push curriculum updates to storage");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelNavigation = () => {
    navigate(courseId ? `/course/${courseId}` : "/instructor/manage");
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


  if (error && !courseTitle) {
    return (
      <div className="container my-5" style={{ maxWidth: "720px" }}>
        <div className="card border-0 shadow-sm rounded-4 p-4 text-center bg-white">
          <div className="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto" style={{ width: "60px", height: "60px" }}>
            <i className="bi bi-shield-lock-fill fs-3"></i>
          </div>
          <h5 className="fw-bold text-dark">Access Configuration Revoked</h5>
          <p className="text-secondary small mb-4">{error}</p>
          <button className="btn btn-primary btn-sm fw-semibold rounded-3 px-4 py-2" onClick={() => navigate("/instructor/manage")}>
            <i className="bi bi-arrow-left me-1.5"></i>Return to Course Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ maxWidth: "720px" }}>
      <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">

        <div className="d-flex align-items-start gap-3 mb-4 pb-3 border-bottom border-light-subtle">
          <div className="bg-warning bg-opacity-10 text-warning-emphasis rounded-3 d-inline-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "46px", height: "46px" }}>
            <i className="bi bi-journal-plus fs-4"></i>
          </div>
          <div>
            <h3 className="fw-extrabold text-dark tracking-tight mb-1">Edit Lesson Content</h3>
            {courseTitle && (
              <p className="text-muted small mb-0 d-flex align-items-center gap-1.5 flex-wrap">
                <span className="fw-medium text-secondary">Belongs to Course Hierarchy:</span>
                <span className="badge bg-light text-dark border border-light-subtle rounded-2 px-2 py-1 fw-bold">{courseTitle}</span>
              </p>
            )}
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
            <div className="fw-medium">Lesson content compiled successfully! Synching module workspace...</div>
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()}>

          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">Lesson Headline Title</label>
            <div className="input-group">
              <span className={`input-group-text bg-light border-end-0 text-muted ${fieldErrors.title ? "border-danger text-danger" : "border-light-subtle"}`}>
                <i className="bi bi-bookmark-star"></i>
              </span>
              <input
                className={`form-control bg-light border-start-0 py-2.5 small ${fieldErrors.title ? "is-invalid" : "border-light-subtle"}`}
                placeholder="e.g. Setting up Context Inversion Containers"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                disabled={saving || success}
              />
              {fieldErrors.title && <div className="invalid-feedback d-block mt-1 small font-medium">{fieldErrors.title}</div>}
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">Hosting Video Resource Link <span className="text-muted fw-normal">(Optional)</span></label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted border-light-subtle">
                <i className="bi bi-play-btn-fill"></i>
              </span>
              <input
                type="url"
                className="form-control bg-light border-start-0 py-2.5 small border-light-subtle"
                placeholder="e.g. https://www.vimeo.com/your-lecture-id"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                disabled={saving || success}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-secondary small fw-semibold">Interactive Study Notes & Markdown Text Documentation</label>
            <textarea
              className="form-control bg-light py-2.5 small border-light-subtle"
              rows="7"
              placeholder="Write lecture curriculum summaries, code samples, references, or reading lists here..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              disabled={saving || success}
              style={{ resize: "none" }}
            />
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
                  <span>Updating Curriculums...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-cloud-check-fill fs-5"></i>
                  <span>Save Lesson Changes</span>
                </>
              )}
            </button>

            <button
              className="btn btn-white border border-light-subtle py-2.5 px-4 fw-medium text-secondary rounded-3 small"
              onClick={handleCancelNavigation}
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