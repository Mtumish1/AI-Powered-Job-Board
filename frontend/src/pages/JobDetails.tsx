import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, MapPin, Clock, DollarSign, Building, Award } from 'lucide-react';
import { getJobById } from '../data/jobsData';
import { Job } from '../types/job';
import SimilarJobs from '../components/job/SimilarJobs';
import GlowingButton from '../components/ui/GlowingButton';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const jobData = getJobById(id);
      setJob(jobData);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-12 h-12 rounded-full border-4 border-t-orange-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-200 mb-4">Job not found</h2>
        <Link to="/" className="text-orange-500 hover:text-orange-400 flex items-center gap-2">
          <ArrowLeft size={18} />
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Link to="/" className="inline-flex items-center text-slate-400 hover:text-orange-500 mb-6 transition-colors">
        <ArrowLeft size={18} className="mr-2" />
        Back to Jobs
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 relative overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 z-0"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-lg bg-slate-700 flex items-center justify-center mr-4 border border-slate-600">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.company} className="w-12 h-12 object-contain" />
                  ) : (
                    <Building size={32} className="text-slate-400" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-100">{job.title}</h1>
                  <p className="text-slate-400">{job.company}</p>
                </div>
              </div>
              <GlowingButton color="orange" className="mt-4 md:mt-0">
                Apply Now
              </GlowingButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                <MapPin size={18} className="text-slate-400 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                <Briefcase size={18} className="text-slate-400 mr-2" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                <Clock size={18} className="text-slate-400 mr-2" />
                <span>{job.experience}</span>
              </div>
              <div className="flex items-center p-3 bg-slate-800/80 rounded-lg border border-slate-700">
                <DollarSign size={18} className="text-slate-400 mr-2" />
                <span>{job.salary}</span>
              </div>
            </div>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-slate-100 mb-4 pb-2 border-b border-slate-700">Job Description</h2>
                <p className="text-slate-300 leading-relaxed">{job.description}</p>
              </section>
              
              <section>
                <h2 className="text-xl font-bold text-slate-100 mb-4 pb-2 border-b border-slate-700">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-300">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-bold text-slate-100 mb-4 pb-2 border-b border-slate-700">Benefits</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-300">
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-orange-500/5 z-0"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-slate-100 mb-4 pb-2 border-b border-slate-700">About {job.company}</h2>
              <p className="text-slate-300 mb-4">{job.companyDescription}</p>
              <div className="flex items-center gap-2 text-slate-300">
                <Building size={18} className="text-slate-400" />
                <span>{job.companySize} employees</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 mt-2">
                <Award size={18} className="text-slate-400" />
                <span>Founded {job.companyFounded}</span>
              </div>
              <button className="w-full mt-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-slate-200">
                View Company Profile
              </button>
            </div>
          </div>
          
          <SimilarJobs currentJobId={job.id} />
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetailsPage;