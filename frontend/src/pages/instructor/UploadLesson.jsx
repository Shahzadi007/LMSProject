import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";

export default function UploadLesson() {
  const navigate = useNavigate();
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [form, setForm] = useState({
    title: "",
    content: "",
    videoUrl: "",
    courseId: "",
  });

  const courseIdParam = new URLSearchParams(location.search).get("courseId");

  useEffect(() => {
    if (courseIdParam) {
      setForm((prev) => ({
        ...prev,
        courseId: courseIdParam,
      }));
    }
  }, [courseIdParam]);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseIdParam) return;

      try {
        const response = await api.get(`/courses/${courseIdParam}`);
        setCourseTitle(response.data.title || "");
      } catch (error) {
        setErrors({
          submit: error.response?.data?.message || "Failed to load course details",
        });
      }
    };

    fetchCourse();
  }, [courseIdParam]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Lesson title is required";
    if (!form.courseId.trim()) newErrors.courseId = "Course ID is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const upload = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await api.post("/lessons", {
        title: form.title,
        content: form.content,
        videoUrl: form.videoUrl,
        courseId: form.courseId,
      });

      alert("Lesson created successfully!");
      navigate("/instructor/manage");
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || "Failed to create lesson" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Add Lesson to Course</h2>

      {errors.submit && <div className="alert alert-danger">{errors.submit}</div>}

      <div className="mb-3">
        <label className="form-label">Course ID</label>
        <input
          className={`form-control ${errors.courseId ? "is-invalid" : ""}`}
          placeholder="Course ID"
          value={form.courseId}
          readOnly
        />
        {errors.courseId && <div className="invalid-feedback d-block">{errors.courseId}</div>}
        <small className="text-muted">
          {courseTitle
            ? `Adding lesson to: ${courseTitle}`
            : "Course ID is loaded from Manage Courses and cannot be edited."}
        </small>
      </div>

      <div className="mb-3">
        <label className="form-label">Lesson Title</label>
        <input
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          placeholder="Enter lesson title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />
        {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Lesson Content</label>
        <textarea
          className="form-control"
          placeholder="Enter lesson content (supports text and markdown)"
          rows="6"
          value={form.content}
          onChange={(e) =>
            setForm({
              ...form,
              content: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Video URL (Optional)</label>
        <input
          className="form-control"
          type="url"
          placeholder="Enter video URL (e.g., YouTube link)"
          value={form.videoUrl}
          onChange={(e) =>
            setForm({
              ...form,
              videoUrl: e.target.value,
            })
          }
        />
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-primary"
          onClick={upload}
          disabled={loading || !form.courseId}
        >
          {loading ? "Creating..." : "Create Lesson"}
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/instructor/manage")}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}