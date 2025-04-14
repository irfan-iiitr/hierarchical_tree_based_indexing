import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const Tree = ({ classification }) => {
  const [expanded, setExpanded] = useState(false);

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

  // Animation variants for the tree nodes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Extract stage 1 and stage 2 classes from classification result
  const stage1Class = classification?.stage_1_class || '';
  const stage2Class = classification?.stage_2_class || '';
  
  // Define the stage 1 classes (top 5 relevant ones)
  const stage_1_classes = [
    'Military and State Offenses', 'Public Order and Rioting', 'Corruption and Bribery',
    'Fraud and Counterfeiting', 'Public Servant Misconduct'
  ];
  
  // Define the stage 2 classes (using the mapping provided)
  const stage_2_classes_map = {
    'Military and State Offenses': ['Impersonation and Misrepresentation', 'War and Depredation', 'Mutiny and Desertion', 'Miscellaneous Military Offenses'],
    'Public Order and Rioting': ['Rioting and Unlawful Assembly', 'Provocation and Enmity', 'Obstruction and Assault', 'Miscellaneous Public Order Offenses'],
    'Corruption and Bribery': ['Bribery and Gratification', 'Misuse of Office', 'Abetment of Corruption', 'Miscellaneous Corruption Offenses'],
    'Fraud and Counterfeiting': ['Counterfeiting Coins', 'Counterfeiting Stamps', 'Fraudulent Use of Counterfeit Items', 'Miscellaneous Fraud Offenses'],
    'Public Servant Misconduct': ['Disobedience and Negligence', 'Framing False Documents', 'Abuse of Authority', 'Miscellaneous Public Servant Offenses']
  };

  // Expand the tree after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setExpanded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-base font-bold text-gray-900 mb-4">Classification Results</h3>
        
        <motion.div 
          className="tree-container pl-3"
          initial="hidden"
          animate={expanded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Root Node */}
          <motion.div variants={itemVariants} className="flex items-start mb-2">
            <div className="w-4 h-4 rounded-full bg-black mt-1 mr-2"></div>
            <div className="flex-1">
              <div className="text-sm font-bold">Classifications</div>
              <div className="pl-6 mt-2 border-l-2 border-gray-300">
                
                {/* Stage 1 Nodes */}
                {stage_1_classes.map((stg1Class, idx) => (
                  <motion.div 
                    key={`stg1-${idx}`}
                    variants={itemVariants}
                    className={`mb-3 relative ${stg1Class === stage1Class ? 'font-bold' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className={`w-3 h-3 rounded-full mt-1 mr-2 ${stg1Class === stage1Class ? 'bg-gray-800' : 'bg-gray-500'}`}></div>
                      <div className="flex-1">
                        <div className={`text-xs ${stg1Class === stage1Class ? 'text-gray-900' : 'text-gray-600'}`}>
                          {stg1Class}
                          {stg1Class === stage1Class && (
                            <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                              Selected
                            </span>
                          )}
                        </div>
                        
                        {/* Show Stage 2 nodes only for the selected Stage 1 class or on hover */}
                        {stg1Class === stage1Class && (
                          <div className="pl-5 mt-2 border-l-2 border-gray-200">
                            {stage_2_classes_map[stg1Class].map((stg2Class, jdx) => (
                              <motion.div 
                                key={`stg2-${jdx}`}
                                variants={itemVariants}
                                className="mb-2 relative"
                              >
                                <div className="flex items-start">
                                  <div className={`w-2.5 h-2.5 rounded-full mt-1 mr-2 ${stg2Class === stage2Class ? 'bg-gray-800' : 'bg-gray-400'}`}></div>
                                  <div className={`text-xs ${stg2Class === stage2Class ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                                    {stg2Class}
                                    {stg2Class === stage2Class && (
                                      <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                                        Match
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Classification Summary */}
          <motion.div 
            variants={itemVariants} 
            className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-200"
          >
            <div className="text-xs text-gray-700">
              <strong>Primary Classification:</strong> {stage1Class}
            </div>
            <div className="text-xs text-gray-700 mt-1">
              <strong>Secondary Classification:</strong> {stage2Class}
            </div>
            <div className="text-xs text-gray-700 mt-1">
              <strong>Confidence Score:</strong> {classification?.confidence_score ? `${(classification.confidence_score * 100).toFixed(1)}%` : 'N/A'}
            </div>
          </motion.div>
        </motion.div>
      </div>

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
    </div>
  );
};

export default Tree;