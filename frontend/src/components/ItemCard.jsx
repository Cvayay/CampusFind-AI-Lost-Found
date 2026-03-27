export default function ItemCard({ item }) {
  const itemType = typeof item?.type === 'string' ? item.type : 'unknown';
  const safeTitle = item?.title || 'Untitled item';
  
  // Construct image URL safely
  const imageSrc = item?.imageUrl ? `http://localhost:4000${item.imageUrl}` : null;

  return (
    <article className="card item-card">
      {/* 1. Image at the top for better visual appeal */}
      {imageSrc && (
        <div style={{ margin: '-32px -32px 20px -32px', overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
          <img 
            className="item-image" 
            src={imageSrc} 
            alt={safeTitle} 
            style={{ margin: 0, height: '200px' }} 
          />
        </div>
      )}

      {/* 2. Badges */}
      <div className="badge-row">
        <span className={`badge ${itemType}`}>{itemType.toUpperCase()}</span>
        <span className="badge neutral">{item?.category || 'Uncategorized'}</span>
      </div>

      {/* 3. Content */}
      <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{safeTitle}</h3>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px', lineHeight: '1.6' }}>
        {item?.description || 'No description provided.'}
      </p>

      {/* 4. Meta Information with cleaner icons/styling */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
        <div className="meta-grid" style={{ fontSize: '13px', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94a3b8' }}>📍 Location</span>
            <span style={{ fontWeight: '600' }}>{item?.location || 'Unknown'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94a3b8' }}>👤 Contact</span>
            <span style={{ fontWeight: '600' }}>{item?.contactName || 'N/A'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#94a3b8' }}>✉️ Info</span>
            <span style={{ fontWeight: '600', color: '#6366f1' }}>{item?.contactInfo || 'N/A'}</span>
          </div>
        </div>
      </div>
    </article>
  );
}