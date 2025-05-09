export interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo?: string;
    location: string;
    type: string;
    salary: string;
    postedAt: string;
    shortDescription: string;
    description: string;
    requirements: string[];
    benefits: string[];
    tags: string[];
    experience: string;
    companyDescription: string;
    companySize: string;
    companyFounded: string;
  }