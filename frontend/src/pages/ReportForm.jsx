import { useState } from "react";

const initialState = {
  title: "",
  category: "Keys",
  description: "",
  location: "",
  contactName: "",
  contactInfo: "",
  image: null,
};

export default function ReportForm({ type }) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => {
        if (key !== 'image') formData.append(key, form[key]);
      });
      formData.append("type", type);
      formData.append("status", "open");
      if (form.image) formData.append("image", form.image);

      const response = await fetch("http://localhost:4000/api/items", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit.");

      setStatus("✨ Report submitted successfully!");
      setForm(initialState);
    } catch (error) {
      setStatus("❌ " + error.message);
    }
  };

  const styles = {
    wrapper: {
      maxWidth: "800px",
      margin: "60px auto",
      padding: "48px",
      background: "#ffffff",
      borderRadius: "32px",
      border: "1px solid #f0f0f0",
      boxShadow: "0 20px 40px rgba(0,0,0,0.03)",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    header: { marginBottom: "40px" },
    title: { fontSize: "32px", fontWeight: "800", letterSpacing: "-0.03em", color: "#111" },
    subtitle: { color: "#666", marginTop: "8px", fontSize: "16px" },
    label: { display: "block", fontSize: "14px", fontWeight: "600", color: "#444", marginBottom: "8px" },
    input: {
      width: "100%",
      padding: "14px 18px",
      borderRadius: "12px",
      border: "1.5px solid #eee",
      fontSize: "15px",
      background: "#f9f9f9",
      transition: "all 0.2s ease",
      outline: "none",
      boxSizing: "border-box",
    },
    button: {
      background: "#000",
      color: "white",
      border: "none",
      padding: "16px 32px",
      borderRadius: "12px",
      fontWeight: "600",
      fontSize: "16px",
      cursor: "pointer",
      transition: "transform 0.2s ease, opacity 0.2s ease",
      opacity: isHovered ? 0.8 : 1,
      transform: isHovered ? "scale(0.98)" : "scale(1)",
    },
    status: {
      fontSize: "14px",
      fontWeight: "500",
      color: status.includes("✨") ? "#059669" : "#111",
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {type === "lost" ? "Report Lost Item" : "Report Found Item"}
        </h2>
        <p style={styles.subtitle}>Provide details to help our AI match this item across campus.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "24px", marginBottom: "24px" }}>
          <div>
            <label style={styles.label}>Item Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required placeholder="e.g., iPhone 13 with blue case" style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} style={styles.input}>
              {["Keys", "Wallet", "ID Card", "Bag", "Phone", "Charger", "Other"].map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={styles.label}>Detailed Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows="4" placeholder="Mention specific marks, stickers, or wallpaper..." style={{ ...styles.input, resize: "none" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
          <div>
            <label style={styles.label}>Location</label>
            <input type="text" name="location" value={form.location} onChange={handleChange} required placeholder="e.g., Block E Cafeteria" style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>Upload Photo</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} style={{ ...styles.input, padding: "10px" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
          <div>
            <label style={styles.label}>Your Name</label>
            <input type="text" name="contactName" value={form.contactName} onChange={handleChange} placeholder="Full Name" style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>Contact Info</label>
            <input type="text" name="contactInfo" value={form.contactInfo} onChange={handleChange} placeholder="Email or Phone Number" style={styles.input} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #eee", paddingTop: "32px" }}>
          <span style={styles.status}>{status}</span>
          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
}