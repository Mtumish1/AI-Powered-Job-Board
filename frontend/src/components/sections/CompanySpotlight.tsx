import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { spotlightCompanies } from '../../data/companyData';

const CompanySpotlight: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === spotlightCompanies.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? spotlightCompanies.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [autoplay, activeIndex]);

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Company Spotlight</h2>
        <p className="text-slate-400">Featuring innovative companies that are shaping the future</p>
      </div>
      
      <div 
        className="relative bg-slate-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-orange-500/5 z-0"></div>
        
        {spotlightCompanies.map((company, index) => (
          <motion.div
            key={company.id}
            className={`relative z-10 ${activeIndex === index ? 'block' : 'hidden'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
              <div className="flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-lg bg-slate-700 flex items-center justify-center border border-slate-600 mr-4">
                    {company.logo ? (
                      <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
                    ) : (
                      <div className="w-12 h-12 bg-slate-600 rounded-lg"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100">{company.name}</h3>
                    <p className="text-slate-400">{company.industry}</p>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-6">{company.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700">
                    <p className="text-slate-400 text-sm">Founded</p>
                    <p className="text-slate-200 font-medium">{company.founded}</p>
                  </div>
                  <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700">
                    <p className="text-slate-400 text-sm">Employees</p>
                    <p className="text-slate-200 font-medium">{company.employees}</p>
                  </div>
                  <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700">
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-slate-200 font-medium">{company.location}</p>
                  </div>
                  <div className="bg-slate-900/60 rounded-lg p-4 border border-slate-700">
                    <p className="text-slate-400 text-sm">Open Positions</p>
                    <p className="text-slate-200 font-medium">{company.openPositions}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-orange-500 hover:bg-orange-400 rounded-lg text-white transition-colors">
                    View Profile
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 transition-colors">
                    Open Positions
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="rounded-xl overflow-hidden w-full h-64 lg:h-auto bg-slate-900">
                  {company.image ? (
                    <img 
                      src={company.image} 
                      alt={company.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                      <p className="text-slate-500">Company Image</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 p-2 rounded-full transition-colors z-20"
          aria-label="Previous company"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 p-2 rounded-full transition-colors z-20"
          aria-label="Next company"
        >
          <ChevronRight size={20} />
        </button>
        
        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {spotlightCompanies.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeIndex === index 
                  ? 'bg-orange-500 w-4' 
                  : 'bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanySpotlight;