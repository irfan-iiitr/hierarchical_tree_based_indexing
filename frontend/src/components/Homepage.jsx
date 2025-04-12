import React, { useState } from 'react';
import Tree from './Tree';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import { BookOpen, AlertCircle, Check } from 'lucide-react';

const Homepage = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [classification, setClassification] = useState(null);
  const [error, setError] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  
  // Stage classification states
  const [selectedStage1, setSelectedStage1] = useState(null);
  const [selectedStage1Index, setSelectedStage1Index] = useState(null);
  const [selectedStage2, setSelectedStage2] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/classify';

  // Classification data
  const stage1Classes = [
    'Military and State Offenses', 'Public Order and Rioting', 'Corruption and Bribery',
    'Fraud and Counterfeiting', 'Public Servant Misconduct', 'Offenses Against Human Body',
    'Offenses Against Property', 'Offenses Against Public Tranquility', 'Offenses Against Religion',
    'Miscellaneous'
  ];

  const stage2Classes = [
    ['Impersonation and Misrepresentation', 'War and Depredation', 'Mutiny and Desertion', 'Miscellaneous Military Offenses'],
    ['Rioting and Unlawful Assembly', 'Provocation and Enmity', 'Obstruction and Assault', 'Miscellaneous Public Order Offenses'],
    ['Bribery and Gratification', 'Misuse of Office', 'Abetment of Corruption', 'Miscellaneous Corruption Offenses'],
    ['Counterfeiting Coins', 'Counterfeiting Stamps', 'Fraudulent Use of Counterfeit Items', 'Miscellaneous Fraud Offenses'],
    ['Disobedience and Negligence', 'Framing False Documents', 'Abuse of Authority', 'Miscellaneous Public Servant Offenses'],
    ['Murder and Culpable Homicide', 'Negligent Acts Causing Death', 'Dowry and Suicide-Related Offenses', 'Miscellaneous Human Body Offenses'],
    ['Fraudulent Concealment and Removal', 'False Claims and Deception', 'Harboring Offenders', 'Miscellaneous Property Offenses'],
    ['Promoting Enmity', 'Rioting and Unlawful Assembly', 'Obstruction and Provocation', 'Miscellaneous Public Tranquility Offenses'],
    ['Defiling Places of Worship', 'Insulting Religious Beliefs', 'Disturbing Religious Assemblies', 'Miscellaneous Religious Offenses'],
    ['Public Nuisance', 'Obscenity and Indecency', 'Other Offenses']
  ];

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
      
      // Update selected classes based on classification result
      const stage1ClassResult = data.stage_1_class;
      const stage2ClassResult = data.stage_2_class;
      
      setSelectedStage1(stage1ClassResult);
      setSelectedStage2(stage2ClassResult);
      
      // Find and set the index of the stage 1 class
      const stage1Index = stage1Classes.findIndex(cls => cls === stage1ClassResult);
      setSelectedStage1Index(stage1Index !== -1 ? stage1Index : null);
      
      setShowDemo(false);
    } catch (err) {
      setError('Failed to get classification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStage1Select = (classItem) => {
    setSelectedStage1(classItem);
    const index = stage1Classes.findIndex(cls => cls === classItem);
    setSelectedStage1Index(index);
    setSelectedStage2(null); // Reset stage 2 selection
  };

  const handleStage2Select = (classItem, parentIndex) => {
    setSelectedStage2(classItem);
    
    // If parentIndex is provided and stage1 is not selected, select the corresponding stage1
    if (parentIndex !== undefined && selectedStage1 === null) {
      setSelectedStage1(stage1Classes[parentIndex]);
      setSelectedStage1Index(parentIndex);
    }
  };

  const loadDemoExample = () => {
    setPrompt("The suspect forcibly entered the victim's residence at 2:00 AM by breaking the back door window. Once inside, they took jewelry and electronics valued at approximately $5,000. The homeowner was asleep upstairs during the incident.");
    setShowDemo(true);
    
    // Reset selections when loading demo
    setSelectedStage1(null);
    setSelectedStage1Index(null);
    setSelectedStage2(null);
  };

  return (
    <div className="min-h-screen font-['Titillium_Web']">
      <header className="bg-black shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-gray-200">
              Crime Classification System
            </h1>
            <div className="flex space-x-4">
              <button 
                onClick={loadDemoExample}
                className="text-gray-400 hover:text-gray-100 flex items-center text-sm"
              >
                <BookOpen size={16} className="mr-1" />
                <span>Load Example</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-6 bg-gradient-to-r from-gray-800 to-black text-white">
            <h2 className="text-4xl font-bold ">
              Hierarchical Crime Classification
            </h2>
            <p className="mt-2 text-gray-500 text-sm ">
              AI-powered system for precise classification of crime descriptions across multiple categories.
            </p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="prompt" className="block text-xs font-medium text-black mb-1 font-['Roboto_Mono']">
                  Crime Description
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter the detailed crime description here..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-500 bg-gray-50 text-sm"
                  rows="4"
                  required
                />
              </div>
              
             
              {/* Classification Buttons */}
              <div className="bg-black p-4 rounded-lg border border-gray-200 ">
                <div className="space-y-4">
                  <Stage1 
                    stage1Classes={stage1Classes} 
                    activeClass={selectedStage1} 
                    onSelectClass={handleStage1Select} 
                  />
                  
                  <div className="border-t border-gray-200 pt-4">
                    <Stage2 
                      stage2Classes={stage2Classes} 
                      activeClass={selectedStage2} 
                      selectedStage1Index={selectedStage1Index}
                      onSelectClass={handleStage2Select} 
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-5 py-2 text-white font-medium rounded-lg flex items-center text-sm ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gray-800 hover:bg-gray-900 shadow-md'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                <div className="bg-red-50 border-l-4 border-red-500 p-3 flex items-start">
                  <AlertCircle className="text-red-500 mr-3 mt-0.5" size={16} />
                  <div>
                    <p className="text-red-700 font-medium text-xs">Classification Error</p>
                    <p className="text-red-600 mt-1 text-xs">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {showDemo && !classification && (
              <div className="mt-5">
                <div className="bg-gray-50 border-l-4 border-gray-500 p-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-gray-700">
                        Example case loaded. Click "Classify Crime" to see the results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {classification && (
              <div className="mt-6">
                <Tree classification={classification} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white shadow rounded-lg p-5">
          <h3 className="text-base font-medium text-gray-900">About This System</h3>
          <p className="mt-2 text-gray-600 text-sm">
            This classification system uses advanced natural language processing to categorize criminal activity based on descriptions. 
            The hierarchical approach provides both broad category (Stage 1) and specific type (Stage 2) classifications to aid in proper 
            case routing and analysis.
          </p>
        </div>
      </main>

      <footer className="bg-black text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white text-xs">
            © {new Date().getFullYear()} Crime Classification System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;