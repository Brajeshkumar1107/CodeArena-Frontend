import React from 'react';
import { DIFFICULTY, PROBLEMS } from '../problems.js';

export default function Problemset({ onSelectProblem }) {
  return (
    <main className="problemset-page">
      <div className="problemset-header">
        <h2>Problemset</h2>
        <span className="problemset-count">{PROBLEMS.length} problems</span>
      </div>

      <div className="problemset-table">
        <div className="ps-row ps-head">
          <span>Title</span>
          <span>Difficulty</span>
          <span>Tags</span>
          <span />
        </div>

        {PROBLEMS.map((p) => (
          <button
            key={p.id}
            className="ps-row ps-item"
            onClick={() => onSelectProblem(p.id)}
          >
            <span className="ps-title">{p.title}</span>
            <span className={`difficulty dif-${p.difficulty.toLowerCase()}`}>
              {DIFFICULTY[p.difficulty]}
            </span>
            <span className="ps-tags">
              {p.tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </span>
            <span className="ps-open">Open ▸</span>
          </button>
        ))}
      </div>
    </main>
  );
}