import React from 'react';

const Stage2 = ({ stage2Classes, activeClass, selectedStage1Index, onSelectClass }) => {
  // If no stage1 is selected, show a mix of stage2 classes from different categories
  // Otherwise, show stage2 classes related to the selected stage1
  const displayClasses = selectedStage1Index !== null 
    ? stage2Classes[selectedStage1Index] 
    : stage2Classes.flatMap((classGroup, index) => 
        classGroup.slice(0, 1).map(cls => ({ class: cls, parentIndex: index }))
      ).slice(0, 6);
  
  return (
    <div>
      <h3 className="text-sm font-medium text-white mb-2">Detailed Classifications</h3>
      <div className="flex flex-wrap gap-2">
        {selectedStage1Index !== null ? (
          // Display classes for selected Stage 1 category
          displayClasses.map((classItem) => (
            <button
              key={classItem}
              onClick={() => onSelectClass(classItem)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors bg-gray-900 ${
                activeClass === classItem
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
            >
              {classItem}
            </button>
          ))
        ) : (
          // Display a sampling of classes from different categories
          displayClasses.map((item) => (
            <button
              key={item.class}
              onClick={() => onSelectClass(item.class, item.parentIndex)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                activeClass === item.class
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {item.class}
            </button>
          ))
        )}
        
        {selectedStage1Index !== null && stage2Classes[selectedStage1Index].length > 6 && (
          <button className="px-3 py-1.5 text-sm font-medium rounded-full bg-gray-100 text-gray-500">
            +{stage2Classes[selectedStage1Index].length - 6} more
          </button>
        )}
      </div>
    </div>
  );
};

export default Stage2;