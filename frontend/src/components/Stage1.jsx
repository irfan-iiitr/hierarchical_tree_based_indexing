import React, { useState } from 'react';

const Stage1 = ({ stage1Classes, activeClass, onSelectClass }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Display either all classes or just the first 6 based on showAll state
  const displayClasses = showAll ? stage1Classes : stage1Classes.slice(0, 6);
  
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-white mb-2">Primary Classifications</h3>
      <div className="flex flex-wrap gap-2 ">
        {displayClasses.map((classItem) => (
          <button
            key={classItem}
            onClick={() => onSelectClass(classItem)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors  ${
              activeClass === classItem
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
          >
            {classItem}
          </button>
        ))}
        {!showAll && stage1Classes.length > 6 && (
          <button 
            onClick={() => setShowAll(true)}
            className="px-3 py-1.5 text-sm font-medium rounded-full bg-gray-500 text-white hover:bg-gray-400"
          >
            +{stage1Classes.length - 6} more
          </button>
        )}
      </div>
    </div>
  );
};

export default Stage1;