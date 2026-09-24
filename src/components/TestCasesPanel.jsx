import React from 'react';

export default function TestCasesPanel({
  customCases,
  selectedCase,
  hiddenCount,
  onSelectCase,
  onAddCase,
  onRemoveCase,
  onUpdateCase
}) {
  return (
    <div className="testcases-pane">
      <div className="tc-list">
        {customCases.map((tc, i) => (
          <span
            key={i}
            className={`tc-chip ${selectedCase === i ? 'active' : ''}`}
            onClick={() => onSelectCase(i)}
          >
            Case {i + 1}
          </span>
        ))}
        <button className="tc-add" onClick={onAddCase}>+</button>
      </div>

      <div className="tc-editor">
        {customCases.map((tc, i) =>
          selectedCase === i ? (
            <div className="tc-fields" key={i}>
              <label>
                Input
                <textarea
                  className="tc-input"
                  rows={3}
                  value={tc.input}
                  onChange={(e) => onUpdateCase(i, 'input', e.target.value)}
                  spellCheck={false}
                />
              </label>
              <label>
                Expected output (optional)
                <textarea
                  className="tc-input"
                  rows={3}
                  value={tc.expectedOutput}
                  onChange={(e) => onUpdateCase(i, 'expectedOutput', e.target.value)}
                  spellCheck={false}
                />
              </label>
              {customCases.length > 1 && (
                <button className="tc-remove" onClick={() => onRemoveCase(i)}>
                  remove case
                </button>
              )}
            </div>
          ) : null
        )}
        <p className="hint">
          Run uses the selected case. Submit judges all {hiddenCount} hidden test cases.
        </p>
      </div>
    </div>
  );
}