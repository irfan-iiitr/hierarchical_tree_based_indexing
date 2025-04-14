import React from 'react';
import { ChevronDown } from 'lucide-react';

const Tree = ({ classification }) => {
  const { stage_1_class, stage_2_class } = classification;
  
  // Original classification data
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

  // Function to reorder the stage1Classes so that the classified one is in the center
  const getReorderedStage1Classes = () => {
    const centerIndex = 7;
    const classifiedIndex = stage1Classes.indexOf(stage_1_class);
    
    if (classifiedIndex === -1) return stage1Classes;
    
    // Create a copy of the array
    const reordered = [...stage1Classes];
    
    // Remove the classified item
    reordered.splice(classifiedIndex, 1);
    
    // Insert it at the center position
    reordered.splice(centerIndex, 0, stage_1_class);
    
    return reordered;
  };

  // Check if a Stage 1 class is the classified result
  const isClassifiedStage1 = (cls) => cls === stage_1_class;
  
  // Find the index of a class in the original array (for mapping to stage2Classes)
  const getOriginalIndex = (cls) => stage1Classes.indexOf(cls);
  
  // Determine the appropriate color class for a Stage 1 item
  const getStage1ColorClass = (cls) => {
    if (isClassifiedStage1(cls)) {
      return 'bg-blue-600 text-white font-medium'; // Classified item
    }
    return 'bg-gray-100 text-gray-700'; // Not classified
  };

  // Get the reordered classes
  const reorderedStage1Classes = getReorderedStage1Classes();

  // Get the stage 2 classes for the classified stage 1
  const classifiedStage2Classes = stage2Classes[getOriginalIndex(stage_1_class)];

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-center mb-6">Hierarchical Classification Result</h3>
      
      <div className="flex flex-col items-center">
        {/* Root Node */}
        <div className="bg-black text-white px-4 py-2 rounded-lg text-center w-60 mb-4">
          <p className="font-medium text-sm">Crime Classification</p>
        </div>
        
        {/* Vertical Line */}
        <div className="h-8 w-0.5 bg-gray-400"></div>
        
        {/* Stage 1 Classes */}
        <div className="mb-4 relative">
          <div className="flex flex-wrap justify-center gap-4">
            {reorderedStage1Classes.map((cls, index) => {
              const isClassified = isClassifiedStage1(cls);
              
              return (
                <div key={`stage1-${index}`} className="flex flex-col items-center">
                  <div 
                    className={`px-3 py-2 rounded-md w-48 text-center text-xs shadow ${getStage1ColorClass(cls)}`}
                  >
                    <div className="flex justify-center items-center gap-1">
                      {cls}
                      {isClassified && <ChevronDown size={14} />}
                    </div>
                  </div>
                  
                  {/* Vertical connection line for classified class */}
                  {isClassified && <div className="h-8 w-0.5 bg-blue-600 mt-1"></div>}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Stage 2 Classes (always shown for the classified Stage 1) */}
        <div className="w-full flex flex-col items-center">
          {/* Stage 2 Branches */}
          <div className="w-full mb-2 relative">
            <div className="flex flex-col items-center">
              {/* Horizontal connecting line */}
              <div className="w-full max-w-4xl h-px bg-gray-300 mb-3"></div>
              
              {/* Stage 2 classes as horizontal branches */}
              <div className="flex justify-center flex-wrap gap-3">
                {classifiedStage2Classes.map((cls, index) => {
                  const isClassified = cls === stage_2_class;
                  
                  return (
                    <div key={`stage2-${index}`} className="flex flex-col items-center animate-fadeIn">
                      {/* Vertical connection line */}
                      <div className="h-4 w-px bg-gray-300"></div>
                      
                      {/* Stage 2 class node */}
                      <div 
                        className={`px-3 py-2 rounded-md w-44 text-center text-xs shadow transition-colors duration-200 ${
                          isClassified 
                            ? 'bg-green-600 text-white font-medium' 
                            : 'bg-gray-50 text-gray-600 border border-gray-200'
                        }`}
                      >
                        {cls}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Classification Result Legend */}
      <div className="mt-8 flex justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <span>Classified Stage 1</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-600"></div>
          <span>Classified Stage 2</span>
        </div>
      </div>
      
      {/* Classification Result Summary */}
      <div className="mt-4 bg-gray-100 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Classification Result:</h4>
        <div className="space-y-2">
          <div className="flex items-start">
            <span className="text-xs font-medium text-gray-500 w-24">Stage 1:</span>
            <span className="text-xs font-medium text-blue-600">{stage_1_class}</span>
          </div>
          <div className="flex items-start">
            <span className="text-xs font-medium text-gray-500 w-24">Stage 2:</span>
            <span className="text-xs font-medium text-green-600">{stage_2_class}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Tree;