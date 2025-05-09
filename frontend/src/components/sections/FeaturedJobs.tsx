import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import JobCard from '../job/JobCard';
import FilterSidebar from '../job/FilterSidebar';
import { featuredJobs } from '../../data/jobsData';

const FeaturedJobs: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filterJobs = (filter: string) => {
    setActiveFilter(filter);
    // In a real app, you would filter the jobs based on the selected filter
  };

  return (
    <section className="py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-100 mb-2">Featured Opportunities</h2>
          <p className="text-slate-400">Explore the latest openings at top tech companies</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
          >
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 mb-8">
        <button 
          onClick={() => filterJobs('all')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeFilter === 'all' 
              ? 'bg-orange-500 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          } transition-colors`}
        >
          All Jobs
        </button>
        <button 
          onClick={() => filterJobs('remote')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeFilter === 'remote' 
              ? 'bg-orange-500 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          } transition-colors`}
        >
          Remote
        </button>
        <button 
          onClick={() => filterJobs('full-time')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeFilter === 'full-time' 
              ? 'bg-orange-500 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          } transition-colors`}
        >
          Full-time
        </button>
        <button 
          onClick={() => filterJobs('part-time')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeFilter === 'part-time' 
              ? 'bg-orange-500 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          } transition-colors`}
        >
          Part-time
        </button>
        <button 
          onClick={() => filterJobs('contract')}
          className={`px-4 py-2 rounded-full text-sm ${
            activeFilter === 'contract' 
              ? 'bg-orange-500 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          } transition-colors`}
        >
          Contract
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <JobCard job={job} />
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center mt-10">
        <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors text-slate-200">
          View All Jobs
        </button>
      </div>
      
      {/* Filter Sidebar */}
      <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </section>
  );
};

export default FeaturedJobs;