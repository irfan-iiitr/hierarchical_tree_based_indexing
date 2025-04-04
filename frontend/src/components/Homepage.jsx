// import React, { useState } from 'react';
// import Tree from './Tree';

// const Homepage = () => {
//   const [prompt, setPrompt] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [classification, setClassification] = useState(null);
//   const [error, setError] = useState(null);

//   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/classify';
//   console.log('API_URL:', API_URL);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${API_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ case: prompt }),
//       });

//       if (!response.ok) {
//         throw new Error('Classification failed');
//       }

//       const data = await response.json();
//       setClassification(data);
//     } catch (err) {
//       setError('Failed to get classification. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
//         <div className="text-center mb-6">
//           <h1 className="text-4xl font-extrabold text-gray-800">
//             Hierarchical Crime Classification
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Enter a crime description below to classify it hierarchically.
//           </p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <textarea
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="Enter the crime description here..."
//             className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="5"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 text-white font-semibold rounded-lg ${
//               loading
//                 ? 'bg-blue-300 cursor-not-allowed'
//                 : 'bg-blue-500 hover:bg-blue-600'
//             }`}
//           >
//             {loading ? 'Classifying...' : 'Classify'}
//           </button>
//         </form>
//         {error && (
//           <div className="mt-4">
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//               {error}
//             </div>
//           </div>
//         )}
//         {classification && (
//           <div className="mt-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">
//               Classification Result
//             </h2>
//             <Tree classification={classification} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Homepage;


import React, { useState } from 'react';
import Tree from './Tree';
import { BookOpen, AlertCircle, Check } from 'lucide-react';

const Homepage = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [classification, setClassification] = useState(null);
  const [error, setError] = useState(null);
  const [showDemo, setShowDemo] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/classify';

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
      setShowDemo(false);
    } catch (err) {
      setError('Failed to get classification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadDemoExample = () => {
    setPrompt("The suspect forcibly entered the victim's residence at 2:00 AM by breaking the back door window. Once inside, they took jewelry and electronics valued at approximately $5,000. The homeowner was asleep upstairs during the incident.");
    setShowDemo(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-800">
              Crime Classification System
            </h1>
            <div className="flex space-x-4">
              <button 
                onClick={loadDemoExample}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <BookOpen size={18} className="mr-1" />
                <span>Load Example</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-3xl font-bold">
              Hierarchical Crime Classification
            </h2>
            <p className="mt-2 text-blue-100">
              AI-powered system for precise classification of crime descriptions across multiple categories.
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                  Crime Description
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter the detailed crime description here..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  rows="5"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 text-white font-medium rounded-lg flex items-center ${
                    loading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>Classify Crime</>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start">
                  <AlertCircle className="text-red-500 mr-3 mt-0.5" size={20} />
                  <div>
                    <p className="text-red-700 font-medium">Classification Error</p>
                    <p className="text-red-600 mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {showDemo && !classification && (
              <div className="mt-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Example case loaded. Click "Classify Crime" to see the results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {classification && (
              <div className="mt-8">
                <Tree classification={classification} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">About This System</h3>
          <p className="mt-2 text-gray-600">
            This classification system uses advanced natural language processing to categorize criminal activity based on descriptions. 
            The hierarchical approach provides both broad category (Stage 1) and specific type (Stage 2) classifications to aid in proper 
            case routing and analysis.
          </p>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-300 text-sm">
            © {new Date().getFullYear()} Crime Classification System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;