import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { User, Mail, MapPin, Phone, Briefcase, Building, Award } from 'lucide-react';
import api from '../services/api';
import GlowingButton from '../components/ui/GlowingButton';

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  company: string;
  experience: string;
  bio: string;
  skills: string[];
}

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileForm>();
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await api.get('/user/profile');
        const profile = response.data;
        
        Object.keys(profile).forEach((key) => {
          setValue(key as keyof ProfileForm, profile[key]);
        });
        
        if (profile.skills) {
          setSkills(profile.skills);
        }
      } catch (error) {
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data: ProfileForm) => {
    try {
      data.skills = skills;
      await api.put('/user/profile', data);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
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
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-slate-100">Profile</h2>
              <GlowingButton
                color={isEditing ? 'orange' : 'blue'}
                onClick={() => isEditing ? handleSubmit(onSubmit)() : setIsEditing(true)}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </GlowingButton>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      disabled={!isEditing}
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      {...register('email')}
                      type="email"
                      disabled
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg text-slate-200 opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      {...register('phone')}
                      type="tel"
                      disabled={!isEditing}
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      {...register('location')}
                      type="text"
                      disabled={!isEditing}
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Current Title
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      {...register('title')}
                      type="text"
                      disabled={!isEditing}
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Company
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      {...register('company')}
                      type="text"
                      disabled={!isEditing}
                      className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Professional Bio
                </label>
                <textarea
                  {...register('bio')}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full py-3 px-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Skills
                </label>
                {isEditing && (
                  <div className="relative mb-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleAddSkill}
                      placeholder="Add a skill and press Enter"
                      className="w-full py-3 px-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                    />
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-slate-700/80 rounded-full text-sm text-slate-200 flex items-center"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-slate-400 hover:text-slate-200"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;