import React from 'react';
import TestCasesPanel from './TestCasesPanel.jsx';
import ResultPanel from './ResultPanel.jsx';

export default function Console(props) {
  return (
    <div className="console-box">
      <div className="console-tabs">
        <button
          className={`console-tab ${props.tab === 'testcases' ? 'active' : ''}`}
          onClick={() => props.onSwitchTab('testcases')}
        >
          Test cases
        </button>
        <button
          className={`console-tab ${props.tab === 'result' ? 'active' : ''}`}
          onClick={() => props.onSwitchTab('result')}
        >
          Result
        </button>
      </div>

      {props.tab === 'testcases' ? (
        <TestCasesPanel
          customCases={props.customCases}
          selectedCase={props.selectedCase}
          hiddenCount={props.hiddenCount}
          onSelectCase={props.onSelectCase}
          onAddCase={props.onAddCase}
          onRemoveCase={props.onRemoveCase}
          onUpdateCase={props.onUpdateCase}
        />
      ) : (
        <ResultPanel
          error={props.error}
          executing={props.executing}
          result={props.result}
        />
      )}
    </div>
  );
}