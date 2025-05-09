import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase as BriefcaseBusiness, LinkedinIcon, TwitterIcon, InstagramIcon, GithubIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 mt-16 border-t border-slate-800/50">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <BriefcaseBusiness className="w-7 h-7 text-orange-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">NeoJobs</span>
            </Link>
            <p className="mt-4 text-slate-400 max-w-sm">
              Discover your next opportunity with our futuristic job platform, connecting talented professionals with forward-thinking companies.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors" aria-label="LinkedIn">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors" aria-label="Twitter">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors" aria-label="GitHub">
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-slate-200 mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">Browse Jobs</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">Companies</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">Saved Jobs</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">Job Alerts</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">Career Advice</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-slate-200 mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">Post a Job</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">Browse Candidates</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">Pricing</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">Employer Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-slate-200 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">Contact</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-slate-400 hover:text-orange-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© 2025 NeoJobs. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <li><Link to="#" className="text-slate-500 hover:text-orange-400 transition-colors">Privacy</Link></li>
              <li><Link to="#" className="text-slate-500 hover:text-orange-400 transition-colors">Terms</Link></li>
              <li><Link to="#" className="text-slate-500 hover:text-orange-400 transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;