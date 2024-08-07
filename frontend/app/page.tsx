'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [threshold, setThreshold] = useState(1.2);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials if needed
        body: JSON.stringify({ text: inputText, threshold: threshold }),
      });
  
      // Log request details for debugging
      console.log('Request body:', JSON.stringify({ text: inputText, threshold: threshold }));
  
      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Check the content type of the response
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }
  
      const data = await response.json();
      setSummary(data.summary);
  
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : String(error));
      
      if (error instanceof Response) {
        try {
          const text = await error.text();
          console.error('Response text:', text);
        } catch (e) {
          console.error('Failed to read error response:', e);
        }
      }
      
      setSummary('An error occurred while summarizing the text.');
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Text Summarizer</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg text-black">
        <textarea
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to summarize"
        />
        <div className="mb-4">
          <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
            Summarization Threshold: {threshold.toFixed(2)}
          </label>
          <input
            type="range"
            id="threshold"
            name="threshold"
            min="1"
            max="2"
            step="0.01"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Summarize
        </button>
      </form>
      {summary && (
        <div className="mt-4 w-full max-w-lg text-white">
          <h2 className="text-2xl font-semibold mb-2">Summary:</h2>
          <p className="p-4 bg-gray-100 rounded text-black">{summary}</p>
        </div>
      )}
    </main>
  );
}