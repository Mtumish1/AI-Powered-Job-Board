import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import FeaturedJobs from '../components/sections/FeaturedJobs';
import CompanySpotlight from '../components/sections/CompanySpotlight';
import AIJobMatch from '../components/sections/AIJobMatch';

const HomePage: React.FC = () => {
  return (
    <div className="py-8 space-y-16">
      <HeroSection />
      <FeaturedJobs />
      <CompanySpotlight />
      <AIJobMatch />
    </div>
  );
};

export default HomePage;