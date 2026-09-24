import React, { useState } from 'react';

const LANGUAGES = {
  PYTHON: {
    label: 'Python',
    ext: 'py',
    default: `import sys

def main():
    data = sys.stdin.read().strip().split()
    if not data:
        return
    a, b = int(data[0]), int(data[1])
    print(a + b)

main()
`
  },
  JAVA: {
    label: 'Java',
    ext: 'java',
    default: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a + b);
    }
}
`
  },
  CPP: {
    label: 'C++',
    ext: 'cpp',
    default: `#include <iostream>

int main() {
    int a, b;
    std::cin >> a >> b;
    std::cout << a + b << std::endl;
    return 0;
}
`
  },
  JAVASCRIPT: {
    label: 'JavaScript',
    ext: 'js',
    default: `const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
  const parts = lines.join(' ').split(/\\s+/).map(Number);
  console.log(parts[0] + (parts[1] || 0));
});
`
  }
};

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
  const [language, setLanguage] = useState('PYTHON');
  const [mode, setMode] = useState('RUN');
  const [code, setCode] = useState(LANGUAGES.PYTHON.default);
  const [testCases, setTestCases] = useState([{ input: '2 3', expectedOutput: '' }]);
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const selectLanguage = (slug) => {
    setLanguage(slug);
    setCode(LANGUAGES[slug].default);
  };

  const updateTestCase = (index, field, value) => {
    const next = testCases.map((tc, i) =>
      i === index ? { ...tc, [field]: value } : tc
    );
    setTestCases(next);
  };

  const addTestCase = () =>
    setTestCases([...testCases, { input: '', expectedOutput: '' }]);

  const removeTestCase = (index) =>
    setTestCases(testCases.filter((_, i) => i !== index));

  const run = async () => {
    setExecuting(true);
    setResult(null);
    setError(null);

    const payload = {
      mode,
      language,
      sourceCode: code,
      testCases
    };

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

  return (
    <div className="app">
      <header className="app-header">
        <h1>CodeArena Runner</h1>
        <span className="health-dot" title="Backend must be on port 8081" />
      </header>

      <section className="toolbar">
        <label>
          Language
          <select value={language} onChange={(e) => selectLanguage(e.target.value)}>
            {Object.entries(LANGUAGES).map(([slug, { label }]) => (
              <option key={slug} value={slug}>{label}</option>
            ))}
          </select>
        </label>

        <label>
          Mode
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="RUN">RUN</option>
            <option value="JUDGE">JUDGE</option>
          </select>
        </label>
      </section>

      <main className="grid">
        <section className="panel editor-panel">
          <div className="panel-title">{LANGUAGES[language].label} source ({LANGUAGES[language].ext})</div>
          <textarea
            className="editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </section>

        <section className="panel">
          <div className="panel-title">Test cases</div>
          {testCases.map((tc, i) => (
            <div className="test-case" key={i}>
              <div className="tc-header">
                <span>#{i + 1}</span>
                {testCases.length > 1 && (
                  <button className="link" onClick={() => removeTestCase(i)}>remove</button>
                )}
              </div>
              <label>
                Input
                <textarea
                  className="small"
                  value={tc.input}
                  onChange={(e) => updateTestCase(i, 'input', e.target.value)}
                  spellCheck={false}
                />
              </label>
              <label>
                Expected output{mode === 'RUN' ? ' (optional)' : ''}
                <textarea
                  className="small"
                  value={tc.expectedOutput}
                  onChange={(e) => updateTestCase(i, 'expectedOutput', e.target.value)}
                  spellCheck={false}
                />
              </label>
            </div>
          ))}
          <button className="link" onClick={addTestCase}>+ add test case</button>

          <button className="run-btn" onClick={run} disabled={executing}>
            {executing ? 'Executing...' : 'Run'}
          </button>
        </section>
      </main>

      <section className="panel result-panel">
        <div className="panel-title">Result</div>
        {error && (
          <pre className="error">{error}</pre>
        )}

        {result && (
          <div className="result">
            <div className="verdict">
              <span className={`badge bad-${String(result.verdict).toLowerCase()}`}>
                {VERDICT_LABELS[result.verdict] || result.verdict}
              </span>
              <span>{result.success ? 'success' : 'failure'}</span>
            </div>

            <div className="metrics">
              <div><strong>{result.passed}</strong> / {result.total} passed</div>
              <div>{result.executionTime} ms</div>
              <div>{result.memoryUsed} MB</div>
            </div>

            {!!result.stdout && (
              <div className="block">
                <div className="subtitle">stdout</div>
                <pre className="output">{result.stdout}</pre>
              </div>
            )}
            {!!result.stderr && (
              <div className="block">
                <div className="subtitle">stderr</div>
                <pre className="output err">{result.stderr}</pre>
              </div>
            )}

            {result.testCases && result.testCases.length > 0 && (
              <div className="block">
                <div className="subtitle">Per test case</div>
                <table className="tc-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>verdict</th>
                      <th>input</th>
                      <th>expected</th>
                      <th>actual</th>
                      <th>time</th>
                      <th>mem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.testCases.map((t) => (
                      <tr key={t.order}>
                        <td>{t.order}</td>
                        <td>
                          <span className={`badge bad-${String(t.verdict).toLowerCase()}`}>
                            {VERDICT_LABELS[t.verdict] || t.verdict}
                          </span>
                        </td>
                        <td><pre>{t.input}</pre></td>
                        <td><pre>{t.expected}</pre></td>
                        <td><pre>{t.actual}</pre></td>
                        <td>{t.executionTime} ms</td>
                        <td>{t.memoryUsed} MB</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {!error && !result && (
          <div className="placeholder">
            Pick a language, write some code, set inputs, hit Run.
          </div>
        )}
      </section>
    </div>
  );
}