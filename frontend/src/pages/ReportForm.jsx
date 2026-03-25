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
      formData.append("type", type);
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("contactName", form.contactName);
      formData.append("contactInfo", form.contactInfo);
      formData.append("status", "open");

      if (form.image) {
        formData.append("image", form.image);
      }

      const response = await fetch("http://localhost:4000/api/items", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit report.");
      }

      setStatus("Report submitted successfully!");
      setForm(initialState);
    } catch (error) {
      setStatus(error.message || "Failed to submit report.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "32px auto",
        padding: "24px",
        background: "#f8fafc",
        borderRadius: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        {type === "lost" ? "Report Lost Item" : "Report Found Item"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={inputStyle}
            >
              <option>Keys</option>
              <option>Wallet</option>
              <option>ID Card</option>
              <option>Bag</option>
              <option>Phone</option>
              <option>Charger</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: "18px" }}>
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="5"
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginTop: "18px" }}>
          <div>
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label>Contact Name</label>
            <input
              type="text"
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginTop: "18px" }}>
          <div>
            <label>Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              value={form.contactInfo}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ marginTop: "22px", display: "flex", alignItems: "center", gap: "16px" }}>
          <button type="submit" style={buttonStyle}>
            Submit Report
          </button>
          <span>{status}</span>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid #cbd5e1",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  fontWeight: "bold",
  cursor: "pointer",
};