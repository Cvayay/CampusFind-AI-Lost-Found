import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ReportLost from "./pages/ReportLost.jsx";
import ReportFound from "./pages/ReportFound.jsx";
import ViewItems from "./pages/ViewItems.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div
      className="app-shell"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header className="topbar">
        <div>
          <h1>CampusFind</h1>
          <p>AI-powered lost and found for universities</p>
        </div>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/report-lost">Report Lost</NavLink>
          <NavLink to="/report-found">Report Found</NavLink>
          <NavLink to="/view-items">View Items</NavLink>
        </nav>
      </header>

      <main className="page-container" style={{ flex: 1 }}>
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