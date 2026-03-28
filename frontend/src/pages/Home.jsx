import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  // State to track which element is being hovered
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const styles = {
    section: {
      padding: "60px 20px",
      maxWidth: "1600px",
      margin: "0 auto",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    hero: {
      textAlign: "center",
      padding: "80px 40px",
      background: "#e11b22", // Vibrant CU Red
      color: "#ffffff",
      borderRadius: "24px",
      marginBottom: "40px",
    },
    title: {
      fontSize: "48px",
      fontWeight: "800",
      letterSpacing: "-0.02em",
      marginBottom: "16px",
      lineHeight: "1.1",
    },
    subtitle: {
      fontSize: "20px",
      color: "#000000",
      fontWeight: "500",
      maxWidth: "600px",
      margin: "0 auto 32px auto",
      lineHeight: "1.6",
      opacity: 0.9,
    },
    buttonGroup: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    btn: (isHovered) => ({
      padding: "12px 24px",
      background: isHovered ? "#000000" : "transparent",
      color: isHovered ? "#ffffff" : "#000000",
      border: "2px solid #000000",
      borderRadius: "12px",
      textDecoration: "none",
      fontWeight: "700",
      fontSize: "15px",
      transition: "all 0.2s ease-in-out",
    }),
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
    },
    card: (isHovered) => ({
      background: "#fff",
      padding: "32px",
      borderRadius: "20px",
      border: "1px solid #efefef",
      transition: "all 0.3s ease",
      transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      boxShadow: isHovered 
        ? "0 12px 24px rgba(0, 0, 0, 0.1)" 
        : "0 2px 4px rgba(0, 0, 0, 0.02)",
    }),
    cardTitle: {
      fontSize: "20px",
      fontWeight: "700",
      marginBottom: "12px",
      color: "#111",
    },
    cardText: {
      fontSize: "15px",
      color: "#666",
      lineHeight: "1.6",
    }
  };

  const features = [
    { id: 1, icon: "⚡", title: "Report in Seconds", text: "Minimalist forms designed for speed. Get your item listed in under 30 seconds." },
    { id: 2, icon: "🤖", title: "AI-Powered Matching", text: "Our AI analyzes descriptions and images to suggest likely matches automatically." },
    { id: 3, icon: "🎓", title: "CU Exclusive", text: "Tailored specifically for the Chandigarh University community and campus blocks." },
  ];

  return (
    <section style={styles.section}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Find What You Lost <br/> Fast.</h1>
        <p style={styles.subtitle}>
          The smart lost and found assistant for Chandigarh University. 
          Powered by AI to match your items instantly.
        </p>

        <div style={styles.buttonGroup}>
          {['/report-lost', '/report-found', '/view-items'].map((path, idx) => (
            <Link 
              key={path}
              to={path} 
              style={styles.btn(hoveredBtn === idx)}
              onMouseEnter={() => setHoveredBtn(idx)}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              {path.replace('/', '').replace('-', ' ').toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div style={styles.grid}>
        {features.map((f) => (
          <div 
            key={f.id}
            style={styles.card(hoveredCard === f.id)}
            onMouseEnter={() => setHoveredCard(f.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{ fontSize: "32px", marginBottom: "16px" }}>{f.icon}</div>
            <h3 style={styles.cardTitle}>{f.title}</h3>
            <p style={styles.cardText}>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}