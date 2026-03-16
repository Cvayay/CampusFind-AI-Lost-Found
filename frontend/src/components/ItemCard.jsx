export default function ItemCard({ item }) {
  return (
    <article className="card item-card">
      <div className="badge-row">
        <span className={`badge ${item.type}`}>{item.type.toUpperCase()}</span>
        <span className="badge neutral">{item.category}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="meta-grid">
        <span><strong>Location:</strong> {item.location}</span>
        <span><strong>Contact:</strong> {item.contactName}</span>
        <span><strong>Info:</strong> {item.contactInfo}</span>
      </div>
      {item.imageUrl ? <img className="item-image" src={`http://localhost:4000${item.imageUrl}`} alt={item.title} /> : null}
    </article>
  );
}
