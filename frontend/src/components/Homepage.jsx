import React, { useState } from 'react';
import Tree from './Tree';

const Homepage = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [classification, setClassification] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: prompt }),
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Hierarchical Crime Classification
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
        <div className="flex flex-col gap-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter the crime description here..."
            className="w-full p-4 border rounded-lg min-h-[120px] resize-y"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-medium ${
              loading 
                ? 'bg-gray-400' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Classifying...' : 'Classify'}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-600 text-center mb-4">
          {error}
        </div>
      )}

      {classification && (
        <div className="max-w-2xl mx-auto">
          <Tree classification={classification} />
        </div>
      )}
    </div>
  );
};

export default Homepage;