export default function Footer() {
  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      marginTop: "auto", // Pushes footer to bottom if page content is short
      padding: "48px 20px",
      background: "#0a1128", // Matches the header "Tech Navy"
      color: "#94a3b8", // Muted text for a premium feel
      textAlign: "center",
      fontFamily: '-apple-system, sans-serif',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    },
    brand: {
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "800",
      letterSpacing: "-0.5px",
      marginBottom: "12px",
      display: "block"
    },
    divider: {
      width: "40px",
      height: "2px",
      background: "#6366f1", // Using your indigo accent color
      margin: "20px auto",
      borderRadius: "2px",
      opacity: 0.6
    },
    link: {
      color: "#6366f1",
      textDecoration: "none",
      fontWeight: "600"
    }
  };

  return (
    <footer style={styles.footer}>
      <span style={styles.brand}>Campus<span style={{color: '#6366f1'}}>Find</span></span>
      
      <p style={{ fontSize: "14px", margin: "4px 0" }}>
        Smart Lost & Found for <strong>Chandigarh University</strong>
      </p>

      <div style={styles.divider}></div>

      <p style={{ fontSize: "12px", opacity: 0.8, marginBottom: "8px" }}>
        Powered by <span style={styles.link}>Google Gemini AI</span>
      </p>

      <p style={{ fontSize: "11px", opacity: 0.5 }}>
        © {currentYear} CampusFind • Built with ❤️ for the CU Community
      </p>
    </footer>
  );
}