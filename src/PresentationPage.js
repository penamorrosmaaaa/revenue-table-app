// PresentationPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const PresentationPage = () => {
  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar} aria-label="Main Navigation">
        <Link to="/dashboard" style={styles.navLink}>
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Page Title */}
      <h1 style={styles.title}>Google Presentation</h1>

      {/* Responsive Iframe Wrapper */}
      <div style={styles.iframeWrapper}>
        <iframe
          src="https://docs.google.com/presentation/d/e/2PACX-1vSwYUQfFeJExve0V7NNgc6EOxV0XVEmf0M5861aiRqHk66VVP30JJaCf9wCSwTD83mO0G6rzlpAD_Ro/embed?start=false&loop=false&delayms=3000"
          frameBorder="0"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          title="Google Presentation"
          style={styles.iframe}
        ></iframe>
      </div>
    </div>
  );
};

// Inline Styles for Simplicity
const styles = {
  container: {
    backgroundColor: '#1a1a1a',
    minHeight: '100vh',
    padding: '2rem',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  navbar: {
    width: '100%',
    maxWidth: '1200px',
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'flex-start', // Align link to the left
  },
  navLink: {
    color: '#82ca9d',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  title: {
    marginBottom: '2rem',
    color: '#ffffff',
    textAlign: 'center',
  },
  iframeWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '960px',
    paddingBottom: '56.25%', // 16:9 Aspect Ratio
    height: 0,
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
  },
};

export default PresentationPage;
