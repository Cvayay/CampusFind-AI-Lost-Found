export default function ItemCard({ item }) {
  const itemType = typeof item?.type === 'string' ? item.type : 'unknown';
  const safeTitle = item?.title || 'Untitled item';

  return (
    <article className="card item-card">
      <div className="badge-row">
        <span className={`badge ${itemType}`}>{itemType.toUpperCase()}</span>
        <span className="badge neutral">{item?.category || 'Uncategorized'}</span>
      </div>
      <h3>{safeTitle}</h3>
      <p>{item?.description || 'No description provided.'}</p>
      <div className="meta-grid">
        <span><strong>Location:</strong> {item?.location || 'Unknown'}</span>
        <span><strong>Contact:</strong> {item?.contactName || 'N/A'}</span>
        <span><strong>Info:</strong> {item?.contactInfo || 'N/A'}</span>
      </div>
      {item?.imageUrl ? <img className="item-image" src={`http://localhost:4000${item.imageUrl}`} alt={safeTitle} /> : null}
    </article>
  );
}
