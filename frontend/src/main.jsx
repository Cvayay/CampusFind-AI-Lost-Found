import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unknown error' };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={errorStyles.overlay}>
          <div style={errorStyles.card}>
            <div style={errorStyles.icon}>⚠️</div>
            <h2 style={errorStyles.title}>System Interruption</h2>
            <p style={errorStyles.text}>{this.state.message}</p>
            <div style={errorStyles.hint}>
              Please verify your backend is active on <strong>port 4000</strong> and refresh.
            </div>
            <button 
              onClick={() => window.location.reload()} 
              style={errorStyles.button}
            >
              Retry Connection
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const errorStyles = {
  overlay: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
    fontFamily: '-apple-system, sans-serif',
    color: '#fff'
  },
  card: {
    textAlign: 'center',
    padding: '40px',
    maxWidth: '400px',
    background: '#111',
    borderRadius: '24px',
    border: '1px solid #222',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
  },
  icon: { fontSize: '40px', marginBottom: '20px' },
  title: { fontSize: '24px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px' },
  text: { color: '#888', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' },
  hint: { fontSize: '12px', color: '#555', marginBottom: '24px', padding: '12px', background: '#0a0a0a', borderRadius: '12px' },
  button: {
    padding: '12px 24px',
    background: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '700',
    cursor: 'pointer'
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <App />
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);