import React, { useState } from 'react';
import Tree from './Tree';

const Homepage = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [classification, setClassification] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/classify';
  console.log('API_URL:', API_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ case: prompt }),
      });

      if (!response.ok) {
        throw new Error('Classification failed');
      }

      const data = await response.json();
      setClassification(data);
    } catch (err) {
      setError('Failed to get classification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Hierarchical Crime Classification
          </h1>
          <p className="text-gray-600 mt-2">
            Enter a crime description below to classify it hierarchically.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter the crime description here..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Classifying...' : 'Classify'}
          </button>
        </form>
        {error && (
          <div className="mt-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          </div>
        )}
        {classification && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Classification Result
            </h2>
            <Tree classification={classification} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;