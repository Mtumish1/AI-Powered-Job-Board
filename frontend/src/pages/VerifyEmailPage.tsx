import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../services/api';

const VerifyEmailPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationStatus('error');
        toast.error('Invalid verification link.');
        return;
      }

      try {
        await auth.verifyEmail(token);
        setVerificationStatus('success');
        toast.success('Email verified successfully!');
      } catch (error: any) {
        setVerificationStatus('error');
        toast.error(error.response?.data?.message || 'Email verification failed.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 z-0"></div>
        <div className="relative z-10 text-center">
          {verificationStatus === 'loading' && (
            <>
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Verifying Email...</h2>
              <div className="w-12 h-12 rounded-full border-4 border-t-orange-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin mx-auto"></div>
            </>
          )}
          {verificationStatus === 'success' && (
            <>
              <h2 className="text-3xl font-bold text-green-500 mb-4">Email Verified!</h2>
              <p className="text-slate-300 mb-6">Your email has been successfully verified. You can now login.</p>
              <Link to="/login" className="text-orange-500 hover:text-orange-400 transition-colors">
                Go to Login
              </Link>
            </>
          )}
          {verificationStatus === 'error' && (
            <>
              <h2 className="text-3xl font-bold text-red-500 mb-4">Verification Failed</h2>
              <p className="text-slate-300 mb-6">
                {token ? 'Invalid or expired verification link.' : 'No verification token provided.'}
              </p>
              <Link to="/register" className="text-orange-500 hover:text-orange-400 transition-colors">
                Create an Account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;