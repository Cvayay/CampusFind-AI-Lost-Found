import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard.jsx';

export default function ViewItems() {
  const [items, setItems] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matching, setMatching] = useState(false);
  const [error, setError] = useState('');

  const loadItems = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/items');
      const data = await response.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setError('Backend connection lost. Ensure port 4000 is active.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadItems(); }, []);

  const runMatching = async () => {
    setMatching(true);
    try {
      const response = await fetch('http://localhost:4000/api/items/match', { method: 'POST' });
      const data = await response.json();
      setMatches(Array.isArray(data) ? data : []);
    } catch {
      setError('AI matching failed.');
    } finally {
      setMatching(false);
    }
  };

  const s = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: '-apple-system, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
    title: { fontSize: '32px', fontWeight: '800', letterSpacing: '-1px' },
    aiBtn: {
      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      color: 'white', border: 'none', padding: '12px 24px', borderRadius: '12px',
      fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 15px rgba(168, 85, 247, 0.2)'
    },
    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' },
    statCard: { background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid #f0f0f0', textAlign: 'center' },
    statNum: { display: 'block', fontSize: '28px', fontWeight: '800', color: '#111' },
    statLabel: { fontSize: '14px', color: '#666', fontWeight: '500', marginTop: '4px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' },
    matchSection: { background: '#f8fafc', padding: '32px', borderRadius: '24px', marginBottom: '40px', border: '1px solid #e2e8f0' }
  };

  return (
    <section style={s.container}>
      <div style={s.header}>
        <h2 style={s.title}>Live Reports</h2>
        <button style={s.aiBtn} onClick={runMatching} disabled={matching}>
          {matching ? '✨ Analyzing...' : '✨ Find Matches with AI'}
        </button>
      </div>

      {error && <div style={{ color: '#ef4444', marginBottom: '20px' }}>{error}</div>}

      <div style={s.statsRow}>
        <div style={s.statCard}>
          <span style={s.statNum}>{items.filter(i => i.type === 'lost').length}</span>
          <span style={s.statLabel}>Lost Items</span>
        </div>
        <div style={s.statCard}>
          <span style={s.statNum}>{items.filter(i => i.type === 'found').length}</span>
          <span style={s.statLabel}>Found Items</span>
        </div>
        <div style={s.statCard}>
          <span style={s.statNum}>{matches.length}</span>
          <span style={s.statLabel}>AI Potential Matches</span>
        </div>
      </div>

      {matches.length > 0 && (
        <div style={s.matchSection}>
          <h3 style={{ marginBottom: '20px', fontWeight: '700' }}>AI Suggested Matches</h3>
          <div style={{ display: 'grid', gap: '16px' }}>
            {matches.map((match, idx) => (
              <div key={idx} style={{ background: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#6366f1' }}>MATCH FOUND</span>
                  <p style={{ margin: '4px 0' }}><strong>{match.lostItem.title}</strong> ↔️ <strong>{match.foundItem.title}</strong></p>
                  <p style={{ fontSize: '13px', color: '#666' }}>{match.reason}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '20px', fontWeight: '800' }}>{match.confidence}%</span>
                  <p style={{ fontSize: '11px', color: '#94a3b8' }}>Confidence</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={s.grid}>
        {loading ? (
          <p>Loading the latest reports...</p>
        ) : items.length === 0 ? (
          <p>No reports found. Be the first to post one!</p>
        ) : (
          items.map((item) => <ItemCard key={item.id} item={item} />)
        )}
      </div>
    </section>
  );
}