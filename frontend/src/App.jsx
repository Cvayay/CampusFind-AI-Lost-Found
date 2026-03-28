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
        backgroundColor: "#FFFFFF",
        fontFamily: 'Inter, -apple-system, sans-serif',
      }}
    >
      {/* BOLD TOP BAR */}
      <div style={{ background: "#000", color: "#fff", padding: "8px 5%", fontSize: "12px", fontWeight: "700", textAlign: "right" }}>
        CHANDIGARH UNIVERSITY • STUDENT SUPPORT PORTAL
      </div>

      <header
        style={{
          background: "#FFFFFF",
          padding: "20px 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          borderBottom: "6px solid #E11B22", // Extra thick bold underline
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: "#E11B22", color: "#fff", padding: "10px", fontWeight: "900", fontSize: "24px", lineHeight: "1" }}>
            CU
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "900", letterSpacing: "-1px", color: "#000" }}>
              campusFind
            </h1>
          </div>
        </div>

        <nav style={{ display: "flex", gap: "10px", alignItems: 'center' }}>
          <NavLink to="/" style={navItem}>HOME</NavLink>
          <NavLink to="/report-lost" style={navItem}>REPORT LOST</NavLink>
          <NavLink to="/report-found" style={navItem}>REPORT FOUND</NavLink>
          
          <NavLink 
            to="/view-items" 
            style={({ isActive }) => ({ 
              ...navItem({ isActive }),
              background: "#E11B22", 
              color: "white", 
              padding: "12px 24px", 
              border: "none",
              marginLeft: "10px"
            })}
          >
            BROWSE ALL
          </NavLink>
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

// BOLD NAV LINK STYLE
const navItem = ({ isActive }) => ({
  color: "#000",
  textDecoration: "none",
  fontWeight: "800", // Extra bold
  fontSize: "13px",
  padding: "10px 15px",
  transition: "all 0.2s ease",
  borderBottom: isActive ? "4px solid #E11B22" : "4px solid transparent",
});