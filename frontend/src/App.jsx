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
        background: "#e9edf3",
      }}
    >
      <header
        style={{
          background: "#06143a",
          color: "white",
          padding: "24px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>CampusFind</h1>
          <p style={{ margin: "8px 0 0" }}>AI-powered lost and found for universities</p>
        </div>

        <nav style={{ display: "flex", gap: "16px" }}>
          <NavLink to="/" style={linkStyle}>Home</NavLink>
          <NavLink to="/report-lost" style={linkStyle}>Report Lost</NavLink>
          <NavLink to="/report-found" style={linkStyle}>Report Found</NavLink>
          <NavLink to="/view-items" style={linkStyle}>View Items</NavLink>
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report-lost" element={<ReportLost />} />
          <Route path="/report-found" element={<ReportFound />} />
          <Route path="/view-items" element={<ViewItems />} />
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
};