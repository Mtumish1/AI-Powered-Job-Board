import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Briefcase, Building, MapPin, DollarSign, Clock } from 'lucide-react';
import { jobs } from '../services/api';
import GlowingButton from '../components/ui/GlowingButton';

interface JobPostForm {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string;
  benefits: string;
  tags: string;
}

const PostJobPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<JobPostForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: JobPostForm) => {
    try {
      // Convert tags string to array
      const formattedData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()),
        requirements: data.requirements.split('\n').filter(req => req.trim()),
        benefits: data.benefits.split('\n').filter(benefit => benefit.trim()),
      };

      await jobs.create(formattedData);
      toast.success('Job posted successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to post job');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-slate-100 mb-8">Post a New Job</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Job Title
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      {...register('title', { required: 'Job title is required' })}
                      type="text"
                      placeholder="e.g. Senior React Developer"
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                    />
                  </div>
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      {...register('company', { required: 'Company name is required' })}
                      type="text"
                      placeholder="e.g. TechCorp"
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                    />
                  </div>
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      {...register('location', { required: 'Location is required' })}
                      type="text"
                      placeholder="e.g. San Francisco, CA (Remote)"
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Job Type
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <select
                      {...register('type', { required: 'Job type is required' })}
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                    >
                      <option value="">Select job type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Salary Range
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      {...register('salary', { required: 'Salary range is required' })}
                      type="text"
                      placeholder="e.g. $100k - $150k"
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                    />
                  </div>
                  {errors.salary && (
                    <p className="mt-1 text-sm text-red-500">{errors.salary.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Experience Level
                  </label>
                  <select
                    {...register('experience', { required: 'Experience level is required' })}
                    className="w-full py-3 px-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                  >
                    <option value="">Select experience level</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="Mid Level">Mid Level</option>
                    <option value="Senior Level">Senior Level</option>
                    <option value="Lead">Lead</option>
                    <option value="Executive">Executive</option>
                  </select>
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-500">{errors.experience.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Job Description
                </label>
                <textarea
                  {...register('description', { required: 'Job description is required' })}
                  rows={6}
                  placeholder="Describe the role, responsibilities, and ideal candidate..."
                  className="w-full py-3 px-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Requirements (one per line)
                </label>
                <textarea
                  {...register('requirements', { required: 'Requirements are required' })}
                  rows={4}
                  placeholder="- 5+ years of experience with React.js&#10;- Strong knowledge of TypeScript&#10;- Experience with GraphQL"
                  className="w-full py-3 px-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                />
                {errors.requirements && (
                  <p className="mt-1 text-sm text-red-500">{errors.requirements.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Benefits (one per line)
                </label>
                <textarea
                  {...register('benefits', { required: 'Benefits are required' })}
                  rows={4}
                  placeholder="- Competitive salary and equity&#10;- Health, dental, and vision insurance&#10;- Unlimited PTO"
                  className="w-full py-3 px-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                />
                {errors.benefits && (
                  <p className="mt-1 text-sm text-red-500">{errors.benefits.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  {...register('tags', { required: 'At least one tag is required' })}
                  type="text"
                  placeholder="e.g. React, TypeScript, GraphQL, Remote"
                  className="w-full py-3 px-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                />
                {errors.tags && (
                  <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <GlowingButton type="submit" color="orange">
                  Post Job
                </GlowingButton>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PostJobPage;