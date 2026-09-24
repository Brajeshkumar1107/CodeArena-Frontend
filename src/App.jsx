import React, { useMemo, useState } from 'react';
import { PROBLEMS } from './problems.js';
import { executeCode } from './api.js';
import TopBar from './components/TopBar.jsx';
import ProblemStatement from './components/ProblemStatement.jsx';
import Editor from './components/Editor.jsx';
import Console from './components/Console.jsx';

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

  const run = async (payload) => {
    setExecuting(true);
    setResult(null);
    setError(null);
    setTab('result');

    try {
      setResult(await executeCode(payload));
    } catch (e) {
      setError(e.message);
    } finally {
      setExecuting(false);
    }
  };

  // RUN: execute the currently selected / first custom test case only.
  const onRun = () => {
    const tc = customCases[selectedCase] || customCases[0];
    run({
      mode: 'RUN',
      language,
      sourceCode: code,
      testCases: [{ input: tc.input, expectedOutput: tc.expectedOutput }]
    });
  };

  // SUBMIT: judge against all the problem's hidden test cases.
  const onSubmit = () => {
    run({
      mode: 'JUDGE',
      language,
      sourceCode: code,
      testCases: problem.judgeTestCases
    });
  };

  return (
    <div className="app">
      <TopBar problemId={problemId} onSelectProblem={changeProblem} />

      <main className="problemset">
        <ProblemStatement problem={problem} />

        <section className="col editor-col">
          <Editor
            language={language}
            code={code}
            executing={executing}
            onLanguageChange={changeLanguage}
            onCodeChange={setCode}
            onRun={onRun}
            onSubmit={onSubmit}
          />

          <Console
            tab={tab}
            onSwitchTab={setTab}
            customCases={customCases}
            selectedCase={selectedCase}
            hiddenCount={problem.judgeTestCases.length}
            onSelectCase={setSelectedCase}
            onAddCase={addCustomCase}
            onRemoveCase={removeCustomCase}
            onUpdateCase={updateCustomCase}
            error={error}
            executing={executing}
            result={result}
          />
        </section>
      </main>
    </div>
  );
}