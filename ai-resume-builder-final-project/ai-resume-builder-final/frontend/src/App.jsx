
import React, { useState } from 'react'

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    const res = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Improve this resume summary:

${input}`,
        max_tokens: 100
      })
    });
    const data = await res.json();
    setResult(data.choices?.[0]?.text || 'No result');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">AI Resume Builder</h1>
        <textarea
          className="w-full p-2 border rounded mb-4"
          rows="5"
          placeholder="Paste your resume summary here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Improve with AI
        </button>
        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <h2 className="font-semibold mb-2 text-green-700">AI Suggestion:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
