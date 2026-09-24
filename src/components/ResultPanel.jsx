import React from 'react';
import { VERDICT_LABELS } from '../constants.js';

const isAccepted = (verdict) => String(verdict) === 'ACCEPTED';

export default function ResultPanel({ error, executing, result }) {
  if (error) {
    return (
      <div className="result-pane">
        <pre className="error-box">{error}</pre>
      </div>
    );
  }

  if (executing) {
    return (
      <div className="result-pane">
        <div className="loading">Executing...</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-pane">
        <div className="placeholder-text">
          Press Run or Submit to see results here.
        </div>
      </div>
    );
  }

  const accepted = isAccepted(result.verdict);

  return (
    <div className="result-pane">
      <div className="result-head">
        <span className={`verdict-badge ${accepted ? 'v-accepted' : 'v-rejected'}`}>
          {VERDICT_LABELS[result.verdict] || result.verdict}
        </span>
        <span className="result-meta">
          {result.executionTime} ms · {result.memoryUsed} MB
        </span>
      </div>

      {!!result.stdout && (
        <div className="io-block">
          <div className="io-label">stdout</div>
          <pre className="io">{result.stdout}</pre>
        </div>
      )}
      {!!result.stderr && (
        <div className="io-block">
          <div className="io-label">stderr</div>
          <pre className="io err">{result.stderr}</pre>
        </div>
      )}

      {result.testCases && result.testCases.length > 0 && (
        <div className="tc-results">
          <div className="tc-results-head">
            <span>Cases</span>
            <span>
              <strong>{result.passed}</strong> / {result.total} passed
            </span>
          </div>

          {result.testCases.map((t) => {
            const ok = isAccepted(t.verdict);
            return (
              <div className={`tc-result ${ok ? 'ok' : 'fail'}`} key={t.order}>
                <div className="tc-result-top">
                  <span className="mini-badge">
                    {VERDICT_LABELS[t.verdict] || t.verdict}
                  </span>
                  <span className="tc-result-meta">
                    {t.executionTime} ms · {t.memoryUsed} MB
                  </span>
                </div>
                <div className="tc-result-body">
                  <div>
                    <span className="field-label">Input</span>
                    <pre>{t.input}</pre>
                  </div>
                  <div>
                    <span className="field-label">Expected</span>
                    <pre>{t.expected}</pre>
                  </div>
                  <div>
                    <span className="field-label">Actual</span>
                    <pre className={ok ? '' : 'err'}>{t.actual}</pre>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}