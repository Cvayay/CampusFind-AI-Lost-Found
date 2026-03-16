import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero">
      <div className="card hero-card">
        <h2>Recover lost items faster on campus</h2>
        <p>
          Students can report lost or found items, browse all active reports, and use AI-assisted matching
          to discover likely pairs instantly.
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/report-lost">Report Lost Item</Link>
          <Link className="button secondary" to="/report-found">Report Found Item</Link>
          <Link className="button ghost" to="/view-items">Browse Reports</Link>
        </div>
      </div>

      <div className="feature-grid">
        <div className="card"><h3>Fast Reporting</h3><p>Create lost or found posts in seconds.</p></div>
        <div className="card"><h3>AI Match Suggestions</h3><p>Gemini or smart fallback logic suggests likely matches.</p></div>
        <div className="card"><h3>Chandigarh University</h3><p>Designed an Application for lost and found items.</p></div>
      </div>
    </section>
  );
}
