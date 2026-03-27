import { Link } from "react-router-dom";

export default function Home() {
  const styles = {
    section: {
      padding: "60px 20px",
      maxWidth: "1100px",
      margin: "0 auto",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    hero: {
      textAlign: "center",
      padding: "80px 40px",
      background: "#000",
      color: "#fff",
      borderRadius: "24px",
      marginBottom: "40px",
    },
    title: {
      fontSize: "48px",
      fontWeight: "800",
      letterSpacing: "-0.02em",
      marginBottom: "16px",
    },
    subtitle: {
      fontSize: "18px",
      color: "#a1a1a1",
      maxWidth: "600px",
      margin: "0 auto 32px auto",
      lineHeight: "1.6",
    },
    buttonGroup: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    primaryBtn: {
      padding: "12px 24px",
      background: "#fff",
      color: "#000",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "15px",
    },
    secondaryBtn: {
      padding: "12px 24px",
      background: "transparent",
      color: "#fff",
      border: "1px solid #333",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "15px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
    card: {
      background: "#fff",
      padding: "32px",
      borderRadius: "20px",
      border: "1px solid #efefef",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "700",
      marginBottom: "12px",
      color: "#111",
    },
    cardText: {
      fontSize: "15px",
      color: "#666",
      lineHeight: "1.5",
    }
  };

  return (
    <section style={styles.section}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Recover lost items <br/> faster on campus.</h1>
        <p style={styles.subtitle}>
          The smart lost and found assistant for Chandigarh University. 
          Powered by AI to match your items instantly.
        </p>

        <div style={styles.buttonGroup}>
          <Link to="/report-lost" style={styles.primaryBtn}>Report Lost Item</Link>
          <Link to="/report-found" style={styles.secondaryBtn}>Report Found Item</Link>
          <Link to="/view-items" style={styles.secondaryBtn}>Browse Reports</Link>
        </div>
      </div>

      {/* Features Grid */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={{ fontSize: "24px", marginBottom: "12px" }}>⚡</div>
          <h3 style={styles.cardTitle}>Fast Reporting</h3>
          <p style={styles.cardText}>Minimalist forms designed for speed. Get your item listed in under 30 seconds.</p>
        </div>

        <div style={styles.card}>
          <div style={{ fontSize: "24px", marginBottom: "12px" }}>🤖</div>
          <h3 style={styles.cardTitle}>AI Match Suggestions</h3>
          <p style={styles.cardText}>Our AI analyzes descriptions and images to suggest likely matches automatically.</p>
        </div>

        <div style={styles.card}>
          <div style={{ fontSize: "24px", marginBottom: "12px" }}>🎓</div>
          <h3 style={styles.cardTitle}>CU Exclusive</h3>
          <p style={styles.cardText}>Tailored specifically for the Chandigarh University community and campus locations.</p>
        </div>
      </div>
    </section>
  );
}