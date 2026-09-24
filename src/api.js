export async function executeCode({ mode, language, sourceCode, testCases }) {
  const res = await fetch('/api/v1/runner/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode, language, sourceCode, testCases })
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(JSON.stringify(body?.error || body, null, 2));
  }

  return body;
}