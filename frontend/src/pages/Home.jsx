import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section style={{ padding: "32px" }}>
      <div style={{ background: "#fff", padding: "24px", borderRadius: "20px", marginBottom: "24px" }}>
        <h2>Recover lost items faster on campus</h2>
        <p>
          Students can report lost or found items, browse all active reports, and use AI-assisted
          matching to discover likely pairs instantly.
        </p>

        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <Link to="/report-lost">Report Lost Item</Link>
          <Link to="/report-found">Report Found Item</Link>
          <Link to="/view-items">Browse Reports</Link>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        <div style={{ background: "#fff", padding: "20px", borderRadius: "16px" }}>
          <h3>Fast Reporting</h3>
          <p>Create lost or found posts in seconds.</p>
        </div>

        <div style={{ background: "#fff", padding: "20px", borderRadius: "16px" }}>
          <h3>AI Match Suggestions</h3>
          <p>Gemini or smart fallback logic suggests likely matches.</p>
        </div>

        <div style={{ background: "#fff", padding: "20px", borderRadius: "16px" }}>
          <h3>Chandigarh University</h3>
          <p>Designed for a smarter campus lost and found experience.</p>
        </div>
      </div>
    </section>
  );
}