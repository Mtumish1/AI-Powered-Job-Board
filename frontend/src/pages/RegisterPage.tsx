import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { auth } from '../services/api';
import GlowingButton from '../components/ui/GlowingButton';
import axios, { AxiosError } from 'axios';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await auth.register(data);
      toast.success('Registration successful! Please check your email to verify your account.');
      navigate('/verify-email');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        toast.error(axiosError.response.data.message || 'Registration failed');
      } else {
        toast.error('Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 z-0"></div>
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-100">Create Account</h2>
              <p className="mt-2 text-slate-400">Join our community of professionals</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    type="text"
                    className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    type="password"
                    className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (val: string) => {
                        if (watch('password') !== val) {
                          return 'Passwords do not match';
                        }
                      },
                    })}
                    type="password"
                    className="w-full py-3 pl-10 pr-4 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 text-slate-200"
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              <GlowingButton type="submit" color="orange" className="w-full">
                <UserPlus className="w-5 h-5 mr-2" />
                Create Account
              </GlowingButton>

              <p className="text-center text-sm text-slate-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-orange-500 hover:text-orange-400 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
