import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronDown } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    experience: true,
    salary: true,
    skills: true,
    location: false,
    industries: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-slate-900 border-l border-slate-800 z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-100">Filters</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                  aria-label="Close filters"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Job Type Filter */}
                <div className="border-b border-slate-800 pb-6">
                  <button 
                    className="flex items-center justify-between w-full mb-4"
                    onClick={() => toggleSection('jobType')}
                  >
                    <h3 className="text-lg font-semibold text-slate-200">Job Type</h3>
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-400 transition-transform ${expandedSections.jobType ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {expandedSections.jobType && (
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-5 h-5 border border-slate-600 rounded group-hover:border-orange-500 transition-colors flex items-center justify-center">
                          <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer z-10" />
                          <Check size={14} className="text-orange-500 opacity-0 group-hover:opacity-50 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-slate-300">Full-time</span>
                      </label>
                      
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-5 h-5 border border-slate-600 rounded group-hover:border-orange-500 transition-colors flex items-center justify-center">
                          <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer z-10" />
                          <Check size={14} className="text-orange-500 opacity-0 group-hover:opacity-50 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-slate-300">Part-time</span>
                      </label>
                      
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-5 h-5 border border-slate-600 rounded group-hover:border-orange-500 transition-colors flex items-center justify-center">
                          <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer z-10" />
                          <Check size={14} className="text-orange-500 opacity-0 group-hover:opacity-50 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-slate-300">Contract</span>
                      </label>
                      
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-5 h-5 border border-slate-600 rounded group-hover:border-orange-500 transition-colors flex items-center justify-center">
                          <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer z-10" />
                          <Check size={14} className="text-orange-500 opacity-0 group-hover:opacity-50 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-slate-300">Internship</span>
                      </label>
                    </div>
                  )}
                </div>
                
                {/* Experience Level Filter */}
                <div className="border-b border-slate-800 pb-6">
                  <button 
                    className="flex items-center justify-between w-full mb-4"
                    onClick={() => toggleSection('experience')}
                  >
                    <h3 className="text-lg font-semibold text-slate-200">Experience Level</h3>
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-400 transition-transform ${expandedSections.experience ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {expandedSections.experience && (
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-5 h-5 border border-slate-600 rounded group-hover:border-orange-500 transition-colors flex items-center justify-center">
                          <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer z-10" />
                          <Check size={14} className="text-orange-500 opacity-0 group-hover:opacity-50 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-slate-300">Entry Level</span>
                      </label>
                      
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-5 h-5 border border-slate-600 rounded group-hover:border-orange-500 transition-colors flex items-center justify-center">
                          <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer z-10" />
                          <Check size={14} className="text-orange-500 opacity-0 group-hover:opacity-50 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-slate-300">Mid Level</span>
                      </label>
                      
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-5 h-5 border border-slate-600 rounded group-hover:border-orange-500 transition-colors flex items-center justify-center">
                          <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer z-10" />
                          <Check size={14} className="text-orange-500 opacity-0 group-hover:opacity-50 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-slate-300">Senior Level</span>
                      </label>
                      
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-5 h-5 border border-slate-600 rounded group-hover:border-orange-500 transition-colors flex items-center justify-center">
                          <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer z-10" />
                          <Check size={14} className="text-orange-500 opacity-0 group-hover:opacity-50 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-slate-300">Director / Executive</span>
                      </label>
                    </div>
                  )}
                </div>
                
                {/* Salary Range Filter */}
                <div className="border-b border-slate-800 pb-6">
                  <button 
                    className="flex items-center justify-between w-full mb-4"
                    onClick={() => toggleSection('salary')}
                  >
                    <h3 className="text-lg font-semibold text-slate-200">Salary Range</h3>
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-400 transition-transform ${expandedSections.salary ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {expandedSections.salary && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-slate-400 text-sm">
                        <span>$0</span>
                        <span>$200k+</span>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-700 -translate-y-1/2 rounded-full"></div>
                        <div className="absolute left-[25%] right-[25%] top-1/2 h-1 bg-orange-500 -translate-y-1/2 rounded-full"></div>
                        
                        <div className="absolute left-[25%] top-1/2 w-4 h-4 bg-orange-500 border-2 border-slate-900 rounded-full -translate-y-1/2 -translate-x-1/2 cursor-pointer hover:ring-2 hover:ring-orange-500/30 transition-all"></div>
                        <div className="absolute left-[75%] top-1/2 w-4 h-4 bg-orange-500 border-2 border-slate-900 rounded-full -translate-y-1/2 -translate-x-1/2 cursor-pointer hover:ring-2 hover:ring-orange-500/30 transition-all"></div>
                        
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                        />
                      </div>
                      
                      <div className="flex justify-between mt-6 gap-4">
                        <div className="w-full">
                          <label className="block text-sm text-slate-400 mb-1">Min</label>
                          <input
                            type="text"
                            value="$50,000"
                            className="w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
                          />
                        </div>
                        <div className="w-full">
                          <label className="block text-sm text-slate-400 mb-1">Max</label>
                          <input
                            type="text"
                            value="$150,000"
                            className="w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Skills Filter */}
                <div className="border-b border-slate-800 pb-6">
                  <button 
                    className="flex items-center justify-between w-full mb-4"
                    onClick={() => toggleSection('skills')}
                  >
                    <h3 className="text-lg font-semibold text-slate-200">Skills</h3>
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-400 transition-transform ${expandedSections.skills ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {expandedSections.skills && (
                    <div>
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="Search skills..."
                          className="w-full py-2 px-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500"
                        />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <div className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm border border-orange-500/30">
                          React
                        </div>
                        <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                          TypeScript
                        </div>
                        <div className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm border border-slate-600">
                          JavaScript
                        </div>
                        <div className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm border border-slate-600">
                          Node.js
                        </div>
                        <div className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm border border-slate-600">
                          GraphQL
                        </div>
                        <div className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm border border-slate-600">
                          Python
                        </div>
                        <div className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm border border-slate-600">
                          UI/UX
                        </div>
                        <div className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm border border-slate-600">
                          AWS
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex space-x-4">
                <button className="flex-1 py-3 bg-orange-500 hover:bg-orange-400 rounded-lg text-white transition-colors">
                  Apply Filters
                </button>
                <button className="py-3 px-4 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors">
                  Reset
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;