import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ReportLost from "./pages/ReportLost.jsx";
import ReportFound from "./pages/ReportFound.jsx";
import ViewItems from "./pages/ViewItems.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8fafc", // Softer, modern background
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <header
        style={{
          background: "#0a1128", // Deeper, more "tech" navy/black
          color: "white",
          padding: "16px 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}
      >
        <div style={{ cursor: 'pointer' }}>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px" }}>
            Campus<span style={{ color: "#6366f1" }}>Find</span>
          </h1>
          <p style={{ margin: 0, fontSize: "11px", opacity: 0.7, fontWeight: "500" }}>
            AI-powered lost & found
          </p>
        </div>

        <nav style={{ display: "flex", gap: "24px" }}>
          <NavLink to="/" style={({ isActive }) => ({ ...linkStyle, opacity: isActive ? 1 : 0.6 })}>Home</NavLink>
          <NavLink to="/report-lost" style={({ isActive }) => ({ ...linkStyle, opacity: isActive ? 1 : 0.6 })}>Report Lost</NavLink>
          <NavLink to="/report-found" style={({ isActive }) => ({ ...linkStyle, opacity: isActive ? 1 : 0.6 })}>Report Found</NavLink>
          <NavLink to="/view-items" style={({ isActive }) => ({ ...linkStyle, opacity: isActive ? 1 : 0.6 })}>View Items</NavLink>
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report-lost" element={<ReportLost />} />
          <Route path="/report-found" element={<ReportFound />} />
          <Route path="/view-items" element={<ViewItems />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "14px",
  transition: "opacity 0.2s ease",
};