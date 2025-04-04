// import React from 'react';

// const Tree = ({ classification }) => {
//   const { stage_1_class, stage_2_class } = classification;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold mb-4">Classification Results</h2>
      
//       <div className="space-y-4">
//         {/* Stage 1 Classification */}
//         <div className="border-l-4 border-blue-500 pl-4">
//           <div className="text-lg font-medium text-blue-700">Stage 1 Classification</div>
//           <div className="mt-2 text-gray-800">{stage_1_class}</div>
//         </div>

//         {/* Tree Connection Line */}
//         <div className="h-8 w-0.5 bg-gray-300 ml-4"></div>

//         {/* Stage 2 Classification */}
//         <div className="border-l-4 border-green-500 pl-4">
//           <div className="text-lg font-medium text-green-700">Stage 2 Classification</div>
//           <div className="mt-2 text-gray-800">{stage_2_class}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tree;


import React from 'react';
import { Check, ChevronRight, ArrowRight } from 'lucide-react';

const Tree = ({ classification }) => {
  const { stage_1_class, stage_2_class } = classification;

  // Helper function to determine the color scheme based on crime type
  const getColorScheme = (crimeType) => {
    const lowerCrime = crimeType.toLowerCase();
    
    if (lowerCrime.includes('violent') || lowerCrime.includes('assault') || lowerCrime.includes('homicide')) {
      return {
        bg: 'bg-red-50',
        border: 'border-red-500',
        text: 'text-red-800',
        icon: 'text-red-500',
        light: 'text-red-600'
      };
    } else if (lowerCrime.includes('property') || lowerCrime.includes('theft') || lowerCrime.includes('burglary')) {
      return {
        bg: 'bg-blue-50',
        border: 'border-blue-500',
        text: 'text-blue-800',
        icon: 'text-blue-500',
        light: 'text-blue-600'
      };
    } else if (lowerCrime.includes('drug') || lowerCrime.includes('substance')) {
      return {
        bg: 'bg-purple-50',
        border: 'border-purple-500',
        text: 'text-purple-800',
        icon: 'text-purple-500',
        light: 'text-purple-600'
      };
    } else if (lowerCrime.includes('fraud') || lowerCrime.includes('financial')) {
      return {
        bg: 'bg-yellow-50',
        border: 'border-yellow-500',
        text: 'text-yellow-800',
        icon: 'text-yellow-500',
        light: 'text-yellow-600'
      };
    } else {
      return {
        bg: 'bg-green-50',
        border: 'border-green-500',
        text: 'text-green-800',
        icon: 'text-green-500',
        light: 'text-green-600'
      };
    }
  };

  const stage1Colors = getColorScheme(stage_1_class);
  const stage2Colors = getColorScheme(stage_2_class);

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Classification Results</h2>
        <p className="text-sm text-gray-500 mt-1">Hierarchical crime categorization based on case description</p>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Stage 1 Classification */}
          <div className={`${stage1Colors.bg} p-4 rounded-lg border-l-4 ${stage1Colors.border}`}>
            <div className="flex items-center">
              <div className={`mr-3 ${stage1Colors.icon}`}>
                <Check size={20} />
              </div>
              <div>
                <h3 className={`font-medium ${stage1Colors.text}`}>Stage 1: Primary Classification</h3>
                <p className="text-lg font-semibold mt-1">{stage_1_class}</p>
              </div>
            </div>
          </div>

          {/* Connector */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <ArrowRight className="text-gray-400" size={24} />
              <div className="text-xs text-gray-500 mt-1">Hierarchical Relationship</div>
            </div>
          </div>

          {/* Stage 2 Classification */}
          <div className={`${stage2Colors.bg} p-4 rounded-lg border-l-4 ${stage2Colors.border}`}>
            <div className="flex items-center">
              <div className={`mr-3 ${stage2Colors.icon}`}>
                <Check size={20} />
              </div>
              <div>
                <h3 className={`font-medium ${stage2Colors.text}`}>Stage 2: Detailed Classification</h3>
                <p className="text-lg font-semibold mt-1">{stage_2_class}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Classification Insights</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded p-3">
              <span className="text-xs font-medium text-gray-500 uppercase">Primary Category</span>
              <p className="mt-1 text-gray-800">{stage_1_class}</p>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <span className="text-xs font-medium text-gray-500 uppercase">Subcategory</span>
              <p className="mt-1 text-gray-800">{stage_2_class}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tree;