import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Building } from 'lucide-react';
import { getSimilarJobs } from '../../data/jobsData';

interface SimilarJobsProps {
  currentJobId: string;
}

const SimilarJobs: React.FC<SimilarJobsProps> = ({ currentJobId }) => {
  const similarJobs = getSimilarJobs(currentJobId);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 relative overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-orange-500/5 z-0"></div>
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-slate-100 mb-4 pb-2 border-b border-slate-700">Similar Jobs</h2>
        
        <div className="space-y-4">
          {similarJobs.map((job, index) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group bg-slate-800/80 hover:bg-slate-700/80 rounded-lg p-3 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center border border-slate-600 flex-shrink-0">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.company} className="w-6 h-6 object-contain" />
                  ) : (
                    <Building size={18} className="text-slate-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-md font-medium text-slate-200 group-hover:text-white transition-colors truncate">
                    {job.title}
                  </h3>
                  <p className="text-slate-400 text-sm truncate">{job.company}</p>
                  <div className="flex items-center mt-1 text-sm text-slate-500">
                    <span className="truncate">{job.location}</span>
                    <span className="mx-1.5">•</span>
                    <span>{job.salary}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-700/50 flex justify-end">
                <Link to={`/job/${job.id}`} className="flex items-center text-orange-400 hover:text-orange-300 text-sm">
                  View details
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarJobs;