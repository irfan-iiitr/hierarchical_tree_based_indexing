import React from 'react';

const Stage1 = ({ stage1Classes, activeClass, onSelectClass }) => {
  // Display a subset of classes if there are too many
  const displayClasses = stage1Classes; // Show first 6 classes
  
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
        {stage1Classes.length > 6 && (
          <button className="px-3 py-1.5 text-sm font-medium rounded-full bg-gray-500 text-white">
            +{stage1Classes.length - 6} more
          </button>
        )}
      </div>
    </div>
  );
};

export default Stage1;