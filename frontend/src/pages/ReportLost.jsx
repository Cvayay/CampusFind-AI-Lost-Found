import React, { useState } from 'react';

const ReportLost = () => {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    title: "", category: "", description: "", location: "",
    contactName: "", contactInfo: "", image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      formData.append("type", "lost");

      const response = await fetch("http://localhost:4000/api/items", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Submission failed.");
      setStatus("Success! Report posted.");
    } catch (err) {
      setStatus(err.message);
    }
  };

  // Minimalist Styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      width: '100%',
      maxWidth: '480px',
      border: '1px solid #eaeaea'
    },
    title: { fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#111' },
    subtitle: { fontSize: '14px', color: '#666', marginBottom: '24px' },
    input: {
      width: '100%',
      padding: '12px 16px',
      marginBottom: '16px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border 0.2s'
    },
    button: {
      width: '100%',
      padding: '14px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'opacity 0.2s'
    },
    status: {
      marginTop: '15px',
      textAlign: 'center',
      fontSize: '13px',
      color: status.includes("Success") ? "#059669" : "#dc2626"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Report Lost Item</h2>
        <p style={styles.subtitle}>Fill in the details to help the campus find your item.</p>
        
        <form onSubmit={handleSubmit}>
          <input style={styles.input} name="title" placeholder="What did you lose? (e.g. Blue Wallet)" onChange={handleChange} required />
          <input style={styles.input} name="category" placeholder="Category (Electronics, Keys, etc.)" onChange={handleChange} required />
          <textarea style={{...styles.input, height: '100px', resize: 'none'}} name="description" placeholder="Any specific marks or details?" onChange={handleChange} required />
          <input style={styles.input} name="location" placeholder="Last seen near..." onChange={handleChange} required />
          
          <div style={{display: 'flex', gap: '10px'}}>
            <input style={styles.input} name="contactName" placeholder="Your Name" onChange={handleChange} required />
            <input style={styles.input} name="contactInfo" placeholder="Phone/Email" onChange={handleChange} required />
          </div>

          <label style={{fontSize: '12px', color: '#888', marginBottom: '5px', display: 'block'}}>Upload Image (Optional)</label>
          <input type="file" name="image" onChange={handleChange} style={{marginBottom: '20px', fontSize: '12px'}} />
          
          <button 
            type="submit" 
            style={styles.button}
            onMouseOver={(e) => e.target.style.opacity = '0.8'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            Post Report
          </button>
        </form>
        
        {status && <p style={styles.status}>{status}</p>}
      </div>
    </div>
  );
};

export default ReportLost;