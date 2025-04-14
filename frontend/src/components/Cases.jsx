import React from 'react';

const Cases = ({ cases, loading, error }) => {
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cases...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Legal Cases</h1>
      
      {cases.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Relevant Cases Here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="border-l-4 border-blue-500 pl-4 mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {caseItem.section}
                </h2>
              </div>
              <p className="text-gray-600 mb-4">{caseItem.crime_text}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-sm font-medium text-gray-600">Penalty:</span>
                  <p className="text-gray-800">{caseItem.penalty}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-sm font-medium text-gray-600">Court:</span>
                  <p className="text-gray-800">{caseItem.court}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  caseItem.cognizable === 'Cognizable'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {caseItem.cognizable}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  caseItem.bailable === 'Bailable'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {caseItem.bailable}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cases;