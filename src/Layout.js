// Layout.js
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const navLinkStyle = {
  margin: '0 1rem',
  color: '#82ca9d',
  textDecoration: 'none',
  fontSize: '1.1rem'
};

const activeNavLinkStyle = {
  borderBottom: '2px solid #82ca9d'
};

const Layout = () => {
  return (
    <div style={{ 
      backgroundColor: '#1a1a1a',
      minHeight: '100vh',
      padding: '2rem',
      color: '#ffffff'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid',
        gap: '2rem'
      }}>
        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Digital Revenue Dashboard</h1>
          {/* Navigation Links */}
          <nav style={{ marginBottom: '1.5rem' }}>
            <NavLink 
              to="/dashboard" 
              style={({ isActive }) => 
                isActive ? { ...navLinkStyle, ...activeNavLinkStyle } : navLinkStyle
              }
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/presentation" 
              style={({ isActive }) => 
                isActive ? { ...navLinkStyle, ...activeNavLinkStyle } : navLinkStyle
              }
            >
              Presentation
            </NavLink>
          </nav>
        </header>

        {/* Render the matched child route component */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
