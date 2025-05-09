import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Building, DollarSign, ArrowRight } from 'lucide-react';
import GlowingButton from '../ui/GlowingButton';

const HeroSection: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    location: '',
    category: '',
    salary: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search params:', searchParams);
    // Handle search functionality
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-slate-100 to-blue-400 bg-clip-text text-transparent">
            Find Your Future in Tech
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover opportunities at the cutting edge of innovation with our AI-powered job matching platform
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form 
            onSubmit={handleSubmit}
            className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-slate-700/50 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5 z-0"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <label htmlFor="keyword" className="block text-sm font-medium text-slate-400 mb-1">Job Title or Keywords</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <input
                      type="text"
                      id="keyword"
                      name="keyword"
                      placeholder="e.g. React Developer"
                      value={searchParams.keyword}
                      onChange={handleChange}
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200 placeholder-slate-500"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="location" className="block text-sm font-medium text-slate-400 mb-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="e.g. San Francisco, CA"
                      value={searchParams.location}
                      onChange={handleChange}
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200 placeholder-slate-500"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="category" className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <select
                      id="category"
                      name="category"
                      value={searchParams.category}
                      onChange={handleChange}
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200 appearance-none"
                    >
                      <option value="">All Categories</option>
                      <option value="software-development">Software Development</option>
                      <option value="data-science">Data Science</option>
                      <option value="design">Design</option>
                      <option value="product-management">Product Management</option>
                      <option value="marketing">Marketing</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                      <ArrowRight className="h-4 w-4 text-slate-500 rotate-90" />
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="salary" className="block text-sm font-medium text-slate-400 mb-1">Salary Range</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <select
                      id="salary"
                      name="salary"
                      value={searchParams.salary}
                      onChange={handleChange}
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200 appearance-none"
                    >
                      <option value="">Any Salary</option>
                      <option value="0-50000">$0 - $50,000</option>
                      <option value="50000-100000">$50,000 - $100,000</option>
                      <option value="100000-150000">$100,000 - $150,000</option>
                      <option value="150000+">$150,000+</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                      <ArrowRight className="h-4 w-4 text-slate-500 rotate-90" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/30 hover:bg-blue-500/20 transition-colors">
                    Remote
                  </button>
                  <button type="button" className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm border border-orange-500/30 hover:bg-orange-500/20 transition-colors">
                    Full-time
                  </button>
                  <button type="button" className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm border border-slate-600/50 hover:bg-slate-700 transition-colors">
                    Contract
                  </button>
                </div>
                
                <GlowingButton type="submit" color="blue" className="w-full md:w-auto">
                  Search Jobs
                </GlowingButton>
              </div>
            </div>
          </form>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <p>Popular:</p>
            <a href="#" className="hover:text-orange-400 transition-colors">React Developer</a>
            <span className="text-slate-700">•</span>
            <a href="#" className="hover:text-orange-400 transition-colors">Data Scientist</a>
            <span className="text-slate-700">•</span>
            <a href="#" className="hover:text-orange-400 transition-colors">Product Manager</a>
            <span className="text-slate-700">•</span>
            <a href="#" className="hover:text-orange-400 transition-colors">UX Designer</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;