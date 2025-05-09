import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, MapPin, Clock, ChevronRight, Briefcase, DollarSign, Bookmark } from 'lucide-react';
import { Job } from '../../types/job';
import GlowingButton from '../ui/GlowingButton';

interface JobCardProps {
  job: Job;
  isRecommended?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, isRecommended = false }) => {
  return (
    <motion.div 
      className="group bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600/80 transition-all shadow-lg h-full relative"
      whileHover={{ y: -5 }}
    >
      {isRecommended && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-blue-500/20 rounded-md z-10">
          <span className="text-xs font-medium text-blue-400">90% Match</span>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>
      
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center border border-slate-600">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.company} className="w-8 h-8 object-contain" />
              ) : (
                <Building size={24} className="text-slate-400" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100 group-hover:text-white transition-colors line-clamp-1">
                {job.title}
              </h3>
              <p className="text-slate-400 text-sm">{job.company}</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-orange-400 transition-colors">
            <Bookmark size={18} />
          </button>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-slate-400 text-sm">
            <MapPin size={14} className="mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-slate-400 text-sm">
            <Briefcase size={14} className="mr-2" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center text-slate-400 text-sm">
            <DollarSign size={14} className="mr-2" />
            <span>{job.salary}</span>
          </div>
        </div>
        
        <div className="mt-4 min-h-[40px]">
          <p className="text-slate-300 text-sm line-clamp-2">
            {job.shortDescription}
          </p>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-slate-700/80 text-slate-300 rounded-md text-xs"
            >
              {tag}
            </span>
          ))}
          {job.tags.length > 3 && (
            <span className="px-2 py-1 bg-slate-700/80 text-slate-400 rounded-md text-xs">
              +{job.tags.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50">
          <div className="flex items-center text-slate-400 text-sm">
            <Clock size={14} className="mr-1" />
            <span>{job.postedAt}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/job/${job.id}`} className="flex items-center text-orange-400 hover:text-orange-300 text-sm">
              View details
              <ChevronRight size={16} className="ml-1" />
            </Link>
            <GlowingButton 
              color="orange" 
              size="sm" 
              href={`/job/${job.id}/apply`}
            >
              Apply
            </GlowingButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;