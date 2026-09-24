import React from 'react';
import { LANGUAGES } from '../constants.js';

export default function Editor({
  language,
  code,
  executing,
  onLanguageChange,
  onCodeChange,
  onRun,
  onSubmit
}) {
  return (
    <div className="editor-box">
      <div className="editor-toolbar">
        <div className="lang-tabs">
          {LANGUAGES.map((l) => (
            <button
              key={l.value}
              className={`lang-tab ${language === l.value ? 'active' : ''}`}
              onClick={() => onLanguageChange(l.value)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="action-btns">
          <button className="btn btn-run" onClick={onRun} disabled={executing}>
            {executing ? '...' : '\u25B6 Run'}
          </button>
          <button className="btn btn-submit" onClick={onSubmit} disabled={executing}>
            {executing ? 'Judging...' : 'Submit'}
          </button>
        </div>
      </div>

      <textarea
        className="editor"
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
}