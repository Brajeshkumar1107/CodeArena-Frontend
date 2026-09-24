import React from 'react';
import { PROBLEMS } from '../problems.js';

export default function TopBar({ problemId, onSelectProblem }) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="logo">CA</span>
        <span className="brand-name">CodeArena</span>
      </div>

      <div className="topbar-navigation">
        <span className="nav-item active">Problems</span>
        <span className="nav-item">Problemset</span>
      </div>

      <div className="topbar-spacer" />

      <select
        className="problem-picker"
        value={problemId}
        onChange={(e) => onSelectProblem(e.target.value)}
      >
        {PROBLEMS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title}
          </option>
        ))}
      </select>
    </header>
  );
}