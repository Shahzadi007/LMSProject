import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container my-5">
      
      {/* Platform Branding Hero Header Area */}
      <div className="text-center py-5 mb-5 bg-light rounded-4 shadow-sm position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-5" style={{ zIndex: 0 }}></div>
        <div className="position-relative" style={{ zIndex: 1 }}>
          <div className="bg-primary text-white rounded-3 d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{ width: "60px", height: "60px" }}>
            <i className="bi bi-layers-half fs-2"></i>
          </div>
          <h1 className="fw-extrabold text-white tracking-tight mb-2 display-5">About EduStream</h1>
          <p className="text-white mx-auto lead" style={{ maxWidth: "600px" }}>
            Bridging the gap between knowledge creators and ambitious learners worldwide through modern digital design.
          </p>
        </div>
      </div>

      <div className="row g-5">
        <div className="col-lg-8">
          
          {/* Section: Platform Abstract */}
          <section className="mb-5">
            <div className="d-flex align-items-center gap-3 mb-3">
              <i className="bi bi-question-square text-primary fs-4"></i>
              <h3 className="fw-bold text-dark mb-0">What is EduStream?</h3>
            </div>
            <p className="text-secondary leading-relaxed">
              EduStream is a comprehensive online learning ecosystem designed to connect instructors and students in a highly seamless, responsive digital classroom. Our platform enables educators to craft dynamic curriculums and publish modular lessons while providing students with an immersive, self-paced workspace to track milestones, build technical skills, and succeed.
            </p>
          </section>

          {/* Section: Core Corporate Mission */}
          <section className="mb-5">
            <div className="d-flex align-items-center gap-3 mb-3">
              <i className="bi bi-compass text-primary fs-4"></i>
              <h3 className="fw-bold text-dark mb-0"> Our Mission</h3>
            </div>
            <p className="text-secondary leading-relaxed">
              We are committed to making industry-grade knowledge accessible to everyone, everywhere. Our ongoing mission is to empower both independent learners and professional instructors with highly interactive structural tools that foster real-world portfolio collaboration, intellectual creativity, and continuous career growth.
            </p>
          </section>

          {/* Section: Modern Technology Architecture Stack */}
          <section className="mb-5">
            <div className="d-flex align-items-center gap-3 mb-3">
              <i className="bi bi-cpu text-primary fs-4"></i>
              <h3 className="fw-bold text-dark mb-0"> The Core Engine Stack</h3>
            </div>
            <p className="text-secondary small mb-3">EduStream is engineered using industry-standard, high-performance web modern frameworks:</p>
            
            <div className="row g-3">
              {[
                { label: "Frontend Interface", tech: "React JS ecosystem, React Router, Bootstrap layout logic" },
                { label: "Backend Environment", tech: "Node.js execution runtime, Express.js micro-framework architecture" },
                { label: "Data Persistence", tech: "MongoDB ecosystem paired with Mongoose object modeling layers" },
                { label: "Identity Protocols", tech: "Stateless JSON Web Tokens (JWT) encrypted with native Bcrypt security" },
                { label: "Interface Standard", tech: "Clean RESTful API patterns and JSON routing payloads" }
              ].map((item, idx) => (
                <div className="col-12" key={idx}>
                  <div className="d-flex align-items-start gap-2 bg-light p-3 rounded-3 border-start border-primary border-3">
                    <div className="fw-bold text-dark text-nowrap small" style={{ width: "160px" }}>{item.label}:</div>
                    <div className="text-secondary small">{item.tech}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Strategic Functional Capabilities */}
          <section className="mb-5">
            <div className="d-flex align-items-center gap-2.5 mb-4">
              <i className="bi bi-lightning-charge text-primary fs-4"></i>
              <h3 className="fw-bold text-dark mb-0">Key Features</h3>
            </div>
            <div className="row g-3">
              {[
                "Secure multi-tiered registration with explicit role-based access tokens",
                "Intuitive course creation modules with pricing targets and category indexing",
                "Granular lesson uploads and responsive learning material management",
                "Fluid course enrollment flows and dynamic linear student progress bars",
                "Advanced analytic insights and administrative operational dashboards",
                "Fully fluid mobile-first responsive view across all smartphone and desktop devices"
              ].map((feat, idx) => (
                <div className="col-md-6" key={idx}>
                  <div className="d-flex gap-3  ">
                    <i className="bi bi-patch-check-fill text-success fs-5"></i> 
                    <span className="text-secondary small fw-medium"> {feat}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Explicit Architecture Profiles */}
          <section className="mb-5">
            <div className="d-flex align-items-center gap-3 mb-4">
              <i className="bi bi-people text-primary fs-4"></i>
              <h3 className="fw-bold text-dark mb-0">Tailored Ecosystem Roles</h3>
            </div>
            <div className="row g-3">
              {[
                { role: "Students", text: "Explore open directories, register for active tracks, and review linear module progress.", icon: "bi-mortarboard" },
                { role: "Instructors", text: "Design syllabus structures, upload multi-media lectures, and govern active class enrollments.", icon: "bi-person-workspace" },
                { role: "Administrators", text: "Moderate site-wide courses, audits platform user profiles, and inspect analytical operational vectors.", icon: "bi-shield-lock" }
              ].map((profile, idx) => (
                <div className="col-md-4" key={idx}>
                  <div className="card border-0 bg-light p-3 h-100 text-center rounded-4">
                    <div className="text-primary fs-3 mb-2"><i className={profile.icon}></i></div>
                    <h6 className="fw-bold text-dark mb-1">{profile.role}</h6>
                    <p className="text-muted small mb-0 lh-base">{profile.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Platform Contacts */}
          <section className="bg-light p-4 rounded-4 border-0">
            <div className="d-flex align-items-center gap-2 mb-2">
              <i className="bi bi-headset text-primary fs-5"></i>
              <h5 className="fw-bold text-dark mb-0">Contact & Support</h5>
            </div>
            <p className="text-secondary small mb-0 lh-base">
              Have systemic integration questions, curriculum migration needs, or general support concerns? Our core engineering and support staff are here to help guide your classroom experience. Reach out at any time.
            </p>
          </section>

        </div>

        {/* Sidebar Sticky Quick-Action Card Block */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 bg-white sticky-top p-2" style={{ top: "30px" }}>
            <div className="card-body p-4">
              <h5 className="fw-bold text-dark mb-3 pb-2 border-bottom border-light-subtle">Quick Navigation</h5>
              <div className="d-flex flex-column gap-2.5">
                <Link to="/courses" className="btn btn-primary w-100 py-2.5 fw-semibold rounded-3 shadow-sm text-center d-flex align-items-center justify-content-center gap-2 small">
                  <i className="bi bi-grid-fill"></i>
                  <span>Browse Catalog</span>
                </Link>
                <Link to="/register" className="btn btn-light border border-light-subtle w-100 py-2.5 fw-semibold text-dark rounded-3 text-center small">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-link text-decoration-none text-muted text-center py-2 fs-7 fw-medium">
                  Existing Member? Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}