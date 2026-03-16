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
      setItems(data);
    } catch {
      setError('Unable to load items. Make sure backend is running on port 4000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const runMatching = async () => {
    setMatching(true);
    setError('');
    try {
      const response = await fetch('http://localhost:4000/api/items/match', { method: 'POST' });
      const data = await response.json();
      setMatches(data);
    } catch {
      setError('AI matching failed.');
    } finally {
      setMatching(false);
    }
  };

  return (
    <section className="view-layout">
      <div className="actions-row">
        <h2>All Reports</h2>
        <button className="button primary" onClick={runMatching} disabled={matching}>
          {matching ? 'Checking Matches...' : 'Find Possible Matches with AI'}
        </button>
      </div>

      {error ? <div className="card error-card">{error}</div> : null}

      <div className="stats-row">
        <div className="card"><strong>{items.filter((i) => i.type === 'lost').length}</strong><span>Lost Reports</span></div>
        <div className="card"><strong>{items.filter((i) => i.type === 'found').length}</strong><span>Found Reports</span></div>
        <div className="card"><strong>{matches.length}</strong><span>AI Matches</span></div>
      </div>

      {matches.length > 0 ? (
        <div className="card">
          <h3>Suggested Matches</h3>
          <div className="match-list">
            {matches.map((match) => (
              <div className="match-card" key={`${match.lostItem.id}-${match.foundItem.id}`}>
                <p><strong>Lost:</strong> {match.lostItem.title}</p>
                <p><strong>Found:</strong> {match.foundItem.title}</p>
                <p><strong>Confidence:</strong> {match.confidence}</p>
                <p><strong>Reason:</strong> {match.reason}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {loading ? (
        <div className="card">Loading items...</div>
      ) : (
        <div className="item-grid">
          {items.length === 0 ? <div className="card">No reports yet. Add one from the report pages.</div> : null}
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
