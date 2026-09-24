import React, { useMemo, useState } from 'react';
import { DIFFICULTY, PROBLEMS } from './problems.js';

const LANGUAGES = [
  { value: 'PYTHON', label: 'Python' },
  { value: 'JAVA', label: 'Java' },
  { value: 'CPP', label: 'C++' },
  { value: 'JAVASCRIPT', label: 'JavaScript' }
];

const VERDICT_LABELS = {
  ACCEPTED: 'Accepted',
  WRONG_ANSWER: 'Wrong Answer',
  COMPILATION_ERROR: 'Compilation Error',
  RUNTIME_ERROR: 'Runtime Error',
  TIME_LIMIT_EXCEEDED: 'Time Limit Exceeded',
  MEMORY_LIMIT_EXCEEDED: 'Memory Limit Exceeded',
  OUTPUT_LIMIT_EXCEEDED: 'Output Limit Exceeded'
};

export default function App() {
  const [problemId, setProblemId] = useState(PROBLEMS[0].id);
  const problem = useMemo(
    () => PROBLEMS.find((p) => p.id === problemId),
    [problemId]
  );

  const [language, setLanguage] = useState('PYTHON');
  const [code, setCode] = useState(problem.starterCode.PYTHON);

  const [tab, setTab] = useState('testcases'); // testcases | result
  const [selectedCase, setSelectedCase] = useState(0);
  const [customCases, setCustomCases] = useState([
    { input: '2 3', expectedOutput: '5' }
  ]);

  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const changeProblem = (id) => {
    const next = PROBLEMS.find((p) => p.id === id);
    setProblemId(id);
    setCode(next.starterCode[language]);
    setSelectedCase(0);
    setCustomCases([{ input: '', expectedOutput: '' }]);
    setTab('testcases');
    setResult(null);
    setError(null);
  };

  const changeLanguage = (value) => {
    setLanguage(value);
    setCode(problem.starterCode[value]);
  };

  const updateCustomCase = (index, field, value) =>
    setCustomCases(
      customCases.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );

  const addCustomCase = () =>
    setCustomCases([...customCases, { input: '', expectedOutput: '' }]);

  const removeCustomCase = (index) =>
    setCustomCases(customCases.filter((_, i) => i !== index));

  const callApi = async (payload) => {
    setExecuting(true);
    setResult(null);
    setError(null);
    setTab('result');

    try {
      const res = await fetch('/api/v1/runner/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const body = await res.json();
      if (!res.ok) {
        setError(JSON.stringify(body?.error || body, null, 2));
      } else {
        setResult(body);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setExecuting(false);
    }
  };

  // RUN: execute the currently selected / first custom test case only.
  const onRun = () => {
    const tc = customCases[selectedCase] || customCases[0];
    callApi({
      mode: 'RUN',
      language,
      sourceCode: code,
      testCases: [{ input: tc.input, expectedOutput: tc.expectedOutput }]
    });
  };

  // SUBMIT: judge against all the problem's hidden test cases.
  const onSubmit = () => {
    callApi({
      mode: 'JUDGE',
      language,
      sourceCode: code,
      testCases: problem.judgeTestCases
    });
  };

  const isAccepted = result?.verdict === 'ACCEPTED';

  return (
    <div className="app">
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
          onChange={(e) => changeProblem(e.target.value)}
        >
          {PROBLEMS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </header>

      <main className="problemset">
        {/* ------------------------------ statement ------------------------------ */}
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

        {/* ------------------------------ editor ------------------------------ */}
        <section className="col editor-col">
          <div className="editor-box">
            <div className="editor-toolbar">
              <div className="lang-tabs">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.value}
                    className={`lang-tab ${language === l.value ? 'active' : ''}`}
                    onClick={() => changeLanguage(l.value)}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <div className="action-btns">
                <button
                  className="btn btn-run"
                  onClick={onRun}
                  disabled={executing}
                >
                  {executing ? '...' : '\u25B6 Run'}
                </button>
                <button
                  className="btn btn-submit"
                  onClick={onSubmit}
                  disabled={executing}
                >
                  {executing ? 'Judging...' : 'Submit'}
                </button>
              </div>
            </div>

            <textarea
              className="editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div className="console-box">
            <div className="console-tabs">
              <button
                className={`console-tab ${tab === 'testcases' ? 'active' : ''}`}
                onClick={() => setTab('testcases')}
              >
                Test cases
              </button>
              <button
                className={`console-tab ${tab === 'result' ? 'active' : ''}`}
                onClick={() => setTab('result')}
              >
                Result
              </button>
            </div>

            {tab === 'testcases' && (
              <div className="testcases-pane">
                <div className="tc-list">
                  {customCases.map((tc, i) => (
                    <span
                      key={i}
                      className={`tc-chip ${selectedCase === i ? 'active' : ''}`}
                      onClick={() => setSelectedCase(i)}
                    >
                      Case {i + 1}
                    </span>
                  ))}
                  <button className="tc-add" onClick={addCustomCase}>+</button>
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
                            onChange={(e) => updateCustomCase(i, 'input', e.target.value)}
                            spellCheck={false}
                          />
                        </label>
                        <label>
                          Expected output (optional)
                          <textarea
                            className="tc-input"
                            rows={3}
                            value={tc.expectedOutput}
                            onChange={(e) =>
                              updateCustomCase(i, 'expectedOutput', e.target.value)
                            }
                            spellCheck={false}
                          />
                        </label>
                        {customCases.length > 1 && (
                          <button
                            className="tc-remove"
                            onClick={() => removeCustomCase(i)}
                          >
                            remove case
                          </button>
                        )}
                      </div>
                    ) : null
                  )}
                  <p className="hint">
                    Run uses the selected case. Submit judges all {problem.judgeTestCases.length} hidden test cases.
                  </p>
                </div>
              </div>
            )}

            {tab === 'result' && (
              <div className="result-pane">
                {error && <pre className="error-box">{error}</pre>}

                {!error && executing && <div className="loading">Executing...</div>}

                {!error && result && (
                  <>
                    <div className="result-head">
                      <span
                        className={`verdict-badge ${
                          isAccepted ? 'v-accepted' : 'v-rejected'
                        }`}
                      >
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
                        {result.testCases.map((t) => (
                          <div className={`tc-result ${String(t.verdict) === 'ACCEPTED' ? 'ok' : 'fail'}`} key={t.order}>
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
                                <pre className={String(t.verdict) === 'ACCEPTED' ? '' : 'err'}>{t.actual}</pre>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {!error && !result && !executing && (
                  <div className="placeholder-text">
                    Press Run or Submit to see results here.
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}