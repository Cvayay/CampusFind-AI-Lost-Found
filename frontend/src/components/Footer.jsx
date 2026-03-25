export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "40px",
        padding: "20px",
        background: "#0f172a",
        color: "white",
        textAlign: "center",
      }}
    >
      <p style={{ margin: "5px 0", fontWeight: "bold" }}>
        CampusFind - AI Powered Lost & Found
      </p>

      <p style={{ margin: "5px 0", fontSize: "14px" }}>
        Made with ❤️ using <b>Google GenAI (Gemini)</b>
      </p>

      <p style={{ margin: "5px 0", fontSize: "13px", opacity: 0.8 }}>
        Created for Chandigarh University • Uttar Pradesh
      </p>

      <p style={{ marginTop: "8px", fontSize: "12px", opacity: 0.6 }}>
        © {new Date().getFullYear()} CampusFind
      </p>
    </footer>
  );
}