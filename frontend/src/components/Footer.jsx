export default function Footer() {
  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      marginTop: "auto",
      padding: "60px 20px",
      background: "#000000", // Solid Bold Black
      color: "#FFFFFF",
      textAlign: "center",
      fontFamily: 'Inter, -apple-system, sans-serif',
      borderTop: '8px solid #E11B22', // Thick CU Red signature border
    },
    brand: {
      color: "#ffffff",
      fontSize: "22px",
      fontWeight: "900", // Extra bold
      letterSpacing: "-1px",
      marginBottom: "8px",
      display: "block",
      textTransform: "uppercase",
    },
    cuAccent: {
      color: "#E11B22",
    },
    divider: {
      width: "60px",
      height: "4px",
      background: "#E11B22", 
      margin: "24px auto",
    },
    tagline: {
      fontSize: "14px",
      fontWeight: "700",
      letterSpacing: "1px",
      textTransform: "uppercase",
      opacity: 0.9,
      margin: "0"
    },
    link: {
      color: "#E11B22",
      textDecoration: "none",
      fontWeight: "800",
      borderBottom: "2px solid #E11B22"
    },
    copyright: {
      fontSize: "12px",
      fontWeight: "600",
      opacity: 0.6,
      marginTop: "20px",
      letterSpacing: "0.5px"
    }
  };

  return (
    <footer style={styles.footer}>
      <span style={styles.brand}>
        CU <span style={styles.cuAccent}>campusFind</span>
      </span>
      
      <p style={styles.tagline}>
        Official Student Support Portal
      </p>

      <div style={styles.divider}></div>

      <p style={{ fontSize: "15px", marginBottom: "12px", fontWeight: "500" }}>
        Smart Matching Powered by <span style={styles.link}>GEMINI AI</span>
      </p>

      <p style={styles.copyright}>
        © {currentYear} CHANDIGARH UNIVERSITY • BUILT FOR THE COMMUNITY
      </p>
    </footer>
  );
}