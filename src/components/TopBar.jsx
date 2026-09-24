import React from 'react';

export default function TopBar({ activeNav, onNavigate }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="logo">CA</span>
        <span className="brand-name">CodeArena</span>
      </div>

      <nav className="topbar-navigation">
        <button
          className={`nav-item ${activeNav === 'problem' ? 'active' : ''}`}
          onClick={() => onNavigate('problem')}
        >
          Problems
        </button>
        <button
          className={`nav-item ${activeNav === 'problemset' ? 'active' : ''}`}
          onClick={() => onNavigate('problemset')}
        >
          Problemset
        </button>
      </nav>

      <div className="topbar-spacer" />
    </header>
  );
}