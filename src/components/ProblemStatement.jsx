import React from 'react';
import { DIFFICULTY } from '../problems.js';

export default function ProblemStatement({ problem }) {
  return (
    <section className="col statement-col">
      <div className="problem-header">
        <h2>{problem.title}</h2>
        <span className={`difficulty dif-${problem.difficulty.toLowerCase()}`}>
          {DIFFICULTY[problem.difficulty]}
        </span>
      </div>

      <div className="problem-tags">
        {problem.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      <p className="problem-desc">{problem.description}</p>

      {problem.examples.map((ex, i) => (
        <div className="example" key={i}>
          <div className="example-title">Example {i + 1}</div>

          <div className="example-row">
            <span className="example-label">Input:</span>
            <pre className="example-block">{ex.input}</pre>
          </div>

          <div className="example-row">
            <span className="example-label">Output:</span>
            <pre className="example-block">{ex.output}</pre>
          </div>

          {!!ex.explanation && (
            <div className="example-row">
              <span className="example-label">Explanation:</span>
              <p className="example-text">{ex.explanation}</p>
            </div>
          )}
        </div>
      ))}

      <div className="constraints">
        <div className="constraints-title">Constraints</div>
        <ul>
          {problem.constraints.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}