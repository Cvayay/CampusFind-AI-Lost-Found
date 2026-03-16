import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportForm({ type }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    location: '',
    contactName: '',
    contactInfo: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    const data = new FormData();
    data.append('type', type);
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (image) data.append('image', image);

    try {
      const response = await fetch('http://localhost:4000/api/items', {
        method: 'POST',
        body: data
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to submit report.');

      setMessage('Report submitted successfully.');
      navigate('/view-items');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card form-card">
      <h2>{type === 'lost' ? 'Report Lost Item' : 'Report Found Item'}</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} placeholder="Black wallet" required />
        </label>
        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Electronics</option>
            <option>ID Card</option>
            <option>Wallet</option>
            <option>Books</option>
            <option>Keys</option>
            <option>Bag</option>
            <option>Other</option>
          </select>
        </label>
        <label className="full-width">
          Description
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Add item color, brand, or any unique detail" required />
        </label>
        <label>
          Location
          <input name="location" value={form.location} onChange={handleChange} placeholder="Library 2nd floor" required />
        </label>
        <label>
          Contact Name
          <input name="contactName" value={form.contactName} onChange={handleChange} placeholder="Shivaji" required />
        </label>
        <label>
          Contact Info
          <input name="contactInfo" value={form.contactInfo} onChange={handleChange} placeholder="Phone or email" required />
        </label>
        <label>
          Upload Image
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        </label>
        <div className="full-width actions-row">
          <button className="button primary" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
          {message ? <span className="status-text">{message}</span> : null}
        </div>
      </form>
    </section>
  );
}
