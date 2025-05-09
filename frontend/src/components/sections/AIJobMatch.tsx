import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Notebook as Robot, Zap, Heart, Star, ChevronRight } from 'lucide-react';
import GlowingButton from '../ui/GlowingButton';
import JobCard from '../job/JobCard';
import { recommendedJobs } from '../../data/jobsData';

const AIJobMatch: React.FC = () => {
  const [skillValue, setSkillValue] = useState('');
  const [skills, setSkills] = useState<string[]>([
    'React', 'TypeScript', 'UI/UX Design'
  ]);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillValue.trim() !== '') {
      if (!skills.includes(skillValue.trim())) {
        setSkills([...skills, skillValue.trim()]);
      }
      setSkillValue('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <section className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 shadow-xl relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-orange-500/5 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Robot className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100">AI Job Match</h2>
              </div>
              
              <p className="text-slate-300 mb-6">
                Enhance your job recommendations by adding your skills and preferences
              </p>
              
              <div className="mb-6">
                <label htmlFor="skills" className="block text-sm font-medium text-slate-400 mb-2">
                  Your Skills
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="skills"
                    placeholder="Add a skill and press Enter"
                    value={skillValue}
                    onChange={(e) => setSkillValue(e.target.value)}
                    onKeyDown={handleAddSkill}
                    className="w-full py-3 px-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-slate-200 placeholder-slate-500"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-1 px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-sm"
                    >
                      {skill}
                      <button 
                        onClick={() => removeSkill(skill)}
                        className="text-slate-400 hover:text-slate-200 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-orange-400" />
                    <span className="text-slate-300">Experience Level</span>
                  </div>
                  <select className="bg-slate-800 border border-slate-700 rounded-lg py-1 px-2 text-slate-300 text-sm">
                    <option>Mid-Level</option>
                    <option>Entry-Level</option>
                    <option>Senior</option>
                    <option>Lead</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-pink-400" />
                    <span className="text-slate-300">Job Type</span>
                  </div>
                  <select className="bg-slate-800 border border-slate-700 rounded-lg py-1 px-2 text-slate-300 text-sm">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-slate-300">Remote Preference</span>
                  </div>
                  <select className="bg-slate-800 border border-slate-700 rounded-lg py-1 px-2 text-slate-300 text-sm">
                    <option>Remote Only</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                    <option>No Preference</option>
                  </select>
                </div>
              </div>
              
              <GlowingButton color="blue" className="w-full">
                Update Preferences
              </GlowingButton>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-100">Recommended For You</h2>
            <a href="#" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
              View All
              <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <JobCard job={job} isRecommended={true} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIJobMatch;