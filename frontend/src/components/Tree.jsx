import React from 'react';

const Tree = ({ classification }) => {
  const { stage_1_class, stage_2_class } = classification;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Classification Results</h2>
      
      <div className="space-y-4">
        {/* Stage 1 Classification */}
        <div className="border-l-4 border-blue-500 pl-4">
          <div className="text-lg font-medium text-blue-700">Stage 1 Classification</div>
          <div className="mt-2 text-gray-800">{stage_1_class}</div>
        </div>

        {/* Tree Connection Line */}
        <div className="h-8 w-0.5 bg-gray-300 ml-4"></div>

        {/* Stage 2 Classification */}
        <div className="border-l-4 border-green-500 pl-4">
          <div className="text-lg font-medium text-green-700">Stage 2 Classification</div>
          <div className="mt-2 text-gray-800">{stage_2_class}</div>
        </div>
      </div>
    </div>
  );
};

export default Tree;
