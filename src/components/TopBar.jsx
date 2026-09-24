import React from 'react';

export default function TopBar({ activeNav, theme, onToggleTheme, onNavigate }) {
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

      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {theme === 'dark' ? '\u2600' : '\u263D'}
      </button>
    </header>
  );
}