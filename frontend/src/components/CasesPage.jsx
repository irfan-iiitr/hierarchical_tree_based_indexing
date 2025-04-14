import React from 'react';
import Cases from './Cases';
import { useLocation, useNavigate } from 'react-router-dom';

const CasesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cases = [], searchQuery = '', loading = false, error = null } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 px-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Related Cases</h1>
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-1">
                Search results for: "{searchQuery}"
              </p>
            )}
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg flex items-center"
          >
            <span>← Back to Results</span>
          </button>
        </div>
        <Cases cases={cases} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CasesPage;