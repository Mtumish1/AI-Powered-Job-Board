import { Job } from '../types/job';

export const featuredJobs: Job[] = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechCorp',
    companyLogo: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'San Francisco, CA (Remote)',
    type: 'Full-time',
    salary: '$120k - $160k',
    postedAt: '2 days ago',
    shortDescription: 'Join our team to build cutting-edge web applications using React, TypeScript, and GraphQL.',
    description: 'We are seeking an experienced React Developer to join our product team. You will work on developing and implementing user interface components using React and related technologies. The ideal candidate has strong experience with React, Redux, and modern JavaScript practices.',
    requirements: [
      '5+ years of experience with React.js and frontend development',
      'Strong knowledge of TypeScript, Redux, and state management',
      'Experience with GraphQL and RESTful APIs',
      'Understanding of server-side rendering and its benefits',
      'Experience with testing frameworks like Jest and React Testing Library'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Flexible remote work policy',
      'Health, dental, and vision insurance',
      'Unlimited PTO',
      '401(k) matching',
      'Professional development budget'
    ],
    tags: ['React', 'TypeScript', 'GraphQL', 'Redux', 'Node.js'],
    experience: '5+ years',
    companyDescription: 'TechCorp is a leading software company specializing in cloud-based solutions. Our platform helps businesses streamline their operations and improve efficiency through innovative technology.',
    companySize: '500-1000',
    companyFounded: '2012'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'DesignLab',
    companyLogo: 'https://images.pexels.com/photos/7775638/pexels-photo-7775638.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'New York, NY (Hybrid)',
    type: 'Full-time',
    salary: '$90k - $120k',
    postedAt: '1 week ago',
    shortDescription: 'Create beautiful, functional interfaces for our suite of products serving millions of users.',
    description: 'We are looking for a talented UX/UI Designer to join our growing design team. You will be responsible for designing intuitive and engaging user experiences for our products. The ideal candidate has a strong portfolio demonstrating their ability to solve complex design problems.',
    requirements: [
      '3+ years of experience in UX/UI design',
      'Proficiency with design tools such as Figma or Sketch',
      'Experience conducting user research and usability testing',
      'Understanding of design systems and component libraries',
      'Excellent communication and collaboration skills'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Flexible working hours',
      '20 days of paid vacation',
      'Learning and development budget',
      'Modern office in downtown New York'
    ],
    tags: ['UI/UX', 'Figma', 'User Research', 'Design Systems', 'Prototyping'],
    experience: '3+ years',
    companyDescription: 'DesignLab is a creative agency that helps startups and established companies create beautiful, user-friendly digital products. We believe in human-centered design and are passionate about creating experiences that delight users.',
    companySize: '50-100',
    companyFounded: '2015'
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    companyLogo: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110k - $150k',
    postedAt: '3 days ago',
    shortDescription: 'Apply machine learning and statistical methods to solve complex business problems.',
    description: 'We are looking for a Data Scientist to join our data team. You will work on analyzing large datasets, developing predictive models, and extracting meaningful insights to drive business decisions. The ideal candidate has strong statistical knowledge and programming skills.',
    requirements: [
      'Masters or PhD in Statistics, Computer Science, or related field',
      'Experience with Python, R, and SQL',
      'Strong knowledge of machine learning algorithms',
      'Experience with data visualization tools',
      'Excellent problem-solving and communication skills'
    ],
    benefits: [
      'Competitive salary and bonus',
      'Remote-first culture',
      'Health, dental, and vision insurance',
      'Flexible working hours',
      'Professional development opportunities',
      'Home office stipend'
    ],
    tags: ['Python', 'Machine Learning', 'SQL', 'Data Analysis', 'Statistics'],
    experience: '3-5 years',
    companyDescription: 'AnalyticsPro is a data-driven company that helps businesses make better decisions through advanced analytics. Our AI-powered platform transforms complex data into actionable insights, helping our clients stay ahead in a competitive market.',
    companySize: '100-250',
    companyFounded: '2016'
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudNet',
    companyLogo: 'https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Austin, TX (Remote Option)',
    type: 'Full-time',
    salary: '$115k - $145k',
    postedAt: '5 days ago',
    shortDescription: 'Build and maintain our cloud infrastructure, CI/CD pipelines, and deployment processes.',
    description: 'We are seeking a DevOps Engineer to join our infrastructure team. You will be responsible for building and maintaining our cloud infrastructure, implementing CI/CD pipelines, and ensuring the reliability and scalability of our systems. The ideal candidate has experience with AWS, Kubernetes, and modern DevOps practices.',
    requirements: [
      '4+ years of experience in DevOps or Site Reliability Engineering',
      'Strong knowledge of AWS or other cloud platforms',
      'Experience with Kubernetes, Docker, and containerization',
      'Proficiency with Infrastructure as Code (Terraform, CloudFormation)',
      'Experience with CI/CD tools (Jenkins, GitHub Actions, etc.)'
    ],
    benefits: [
      'Competitive salary and stock options',
      'Remote work flexibility',
      'Comprehensive health benefits',
      'Unlimited PTO policy',
      'Learning and conference budget',
      'Latest equipment'
    ],
    tags: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    experience: '4+ years',
    companyDescription: 'CloudNet is a cloud infrastructure company that helps businesses build, deploy, and scale their applications. Our platform provides reliable, secure, and cost-effective cloud solutions for companies of all sizes.',
    companySize: '100-250',
    companyFounded: '2014'
  },
  {
    id: '5',
    title: 'Product Manager',
    company: 'InnovateTech',
    companyLogo: 'https://images.pexels.com/photos/6177613/pexels-photo-6177613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Chicago, IL (Hybrid)',
    type: 'Full-time',
    salary: '$130k - $170k',
    postedAt: '1 week ago',
    shortDescription: 'Lead our product development from conception to launch, working with cross-functional teams.',
    description: 'We are looking for a Product Manager to join our product team. You will be responsible for defining product strategy, roadmap, and features based on market research and customer feedback. The ideal candidate has a track record of delivering successful products and working effectively with engineering, design, and marketing teams.',
    requirements: [
      '5+ years of experience in product management',
      'Experience with agile product development methodologies',
      'Strong analytical and problem-solving skills',
      'Excellent communication and stakeholder management',
      'Technical background preferred'
    ],
    benefits: [
      'Competitive salary and bonus',
      'Flexible work arrangements',
      'Comprehensive health benefits',
      'Paid parental leave',
      'Professional development opportunities',
      'Company-wide retreats'
    ],
    tags: ['Product Management', 'Agile', 'User Research', 'Roadmapping', 'B2B'],
    experience: '5+ years',
    companyDescription: 'InnovateTech is a technology company focused on developing innovative solutions for businesses. Our products help companies streamline their operations, improve customer engagement, and drive growth through digital transformation.',
    companySize: '250-500',
    companyFounded: '2010'
  },
  {
    id: '6',
    title: 'Frontend Developer',
    company: 'WebFusion',
    companyLogo: 'https://images.pexels.com/photos/11035539/pexels-photo-11035539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Remote',
    type: 'Contract',
    salary: '$70 - $90/hour',
    postedAt: '2 days ago',
    shortDescription: 'Create responsive, accessible, and performant web interfaces for our clients.',
    description: 'We are looking for a Frontend Developer to join our team on a contract basis. You will be responsible for implementing responsive and accessible web interfaces based on design mockups. The ideal candidate has strong HTML, CSS, and JavaScript skills with experience in modern frontend frameworks.',
    requirements: [
      '3+ years of experience with HTML, CSS, and JavaScript',
      'Experience with React, Vue, or Angular',
      'Knowledge of accessibility standards and best practices',
      'Understanding of responsive design principles',
      'Experience with frontend build tools and package managers'
    ],
    benefits: [
      'Competitive hourly rate',
      'Flexible working hours',
      'Remote work',
      'Opportunity for contract extension',
      'Working with diverse clients and industries',
      'Collaborative team environment'
    ],
    tags: ['JavaScript', 'React', 'CSS', 'Responsive Design', 'Accessibility'],
    experience: '3+ years',
    companyDescription: 'WebFusion is a digital agency that specializes in creating beautiful, functional websites and web applications. We work with clients across various industries to help them establish a strong online presence and achieve their business goals.',
    companySize: '10-50',
    companyFounded: '2018'
  }
];

export const recommendedJobs: Job[] = [
  {
    id: '7',
    title: 'React Native Developer',
    company: 'MobileX',
    companyLogo: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Seattle, WA (Remote)',
    type: 'Full-time',
    salary: '$100k - $130k',
    postedAt: '3 days ago',
    shortDescription: 'Develop cross-platform mobile applications using React Native and TypeScript.',
    description: 'We are seeking a React Native Developer to join our mobile team. You will be responsible for developing cross-platform mobile applications that provide a seamless user experience. The ideal candidate has experience with React Native, TypeScript, and mobile app development.',
    requirements: [
      '3+ years of experience with React Native',
      'Strong knowledge of TypeScript and JavaScript',
      'Experience with native modules integration',
      'Understanding of mobile app architecture',
      'Experience with app deployment to Apple App Store and Google Play Store'
    ],
    benefits: [
      'Competitive salary and equity',
      'Remote work policy',
      'Health, dental, and vision insurance',
      'Unlimited PTO',
      'Professional development budget',
      'Home office stipend'
    ],
    tags: ['React Native', 'TypeScript', 'Mobile', 'iOS', 'Android'],
    experience: '3+ years',
    companyDescription: 'MobileX is a mobile app development company that helps businesses create engaging and intuitive mobile experiences. Our team of experts specializes in developing cross-platform applications that look and feel native on both iOS and Android.',
    companySize: '50-100',
    companyFounded: '2015'
  },
  {
    id: '8',
    title: 'UI/UX Designer',
    company: 'CreativeStudio',
    companyLogo: 'https://images.pexels.com/photos/6804079/pexels-photo-6804079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Remote',
    type: 'Full-time',
    salary: '$85k - $115k',
    postedAt: '1 week ago',
    shortDescription: 'Design beautiful user interfaces and experiences for web and mobile applications.',
    description: 'We are looking for a talented UI/UX Designer to join our creative team. You will be responsible for creating user-centered designs for web and mobile applications. The ideal candidate has a strong portfolio showcasing their design skills and ability to create intuitive user experiences.',
    requirements: [
      '3+ years of experience in UI/UX design',
      'Proficiency with design tools like Figma or Sketch',
      'Experience conducting user research and usability testing',
      'Understanding of design systems and component libraries',
      'Strong visual design skills and attention to detail'
    ],
    benefits: [
      'Competitive salary',
      'Remote work',
      'Health and wellness benefits',
      'Flexible working hours',
      'Professional development opportunities',
      'Creative team environment'
    ],
    tags: ['UI/UX', 'Figma', 'Design Systems', 'User Research', 'Visual Design'],
    experience: '3+ years',
    companyDescription: 'CreativeStudio is a design agency that helps companies create beautiful and functional digital products. Our team of designers and developers work together to deliver exceptional user experiences that drive engagement and business results.',
    companySize: '10-50',
    companyFounded: '2017'
  },
  {
    id: '9',
    title: 'Full Stack Developer',
    company: 'StackInnovate',
    companyLogo: 'https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Denver, CO (Hybrid)',
    type: 'Full-time',
    salary: '$110k - $140k',
    postedAt: '5 days ago',
    shortDescription: 'Build modern web applications using React, Node.js, and cloud technologies.',
    description: 'We are seeking a Full Stack Developer to join our engineering team. You will be responsible for developing and maintaining web applications using modern frontend and backend technologies. The ideal candidate has experience with React, Node.js, and cloud platforms like AWS or Azure.',
    requirements: [
      '4+ years of experience in full stack development',
      'Strong knowledge of React, Node.js, and TypeScript',
      'Experience with databases (SQL and NoSQL)',
      'Familiarity with cloud platforms and serverless architecture',
      'Understanding of CI/CD processes and DevOps practices'
    ],
    benefits: [
      'Competitive salary and bonus',
      'Flexible work arrangements',
      'Comprehensive health benefits',
      'Retirement plan with company match',
      'Professional development budget',
      'Modern office with amenities'
    ],
    tags: ['React', 'Node.js', 'TypeScript', 'AWS', 'Full Stack'],
    experience: '4+ years',
    companyDescription: 'StackInnovate is a technology company that helps businesses modernize their software infrastructure. Our team of experts specializes in developing scalable, cloud-native applications that enable companies to stay competitive in a rapidly evolving digital landscape.',
    companySize: '50-100',
    companyFounded: '2016'
  },
  {
    id: '10',
    title: 'Machine Learning Engineer',
    company: 'AI Solutions',
    companyLogo: 'https://images.pexels.com/photos/8566544/pexels-photo-8566544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Boston, MA (Remote Option)',
    type: 'Full-time',
    salary: '$130k - $170k',
    postedAt: '1 week ago',
    shortDescription: 'Develop and deploy machine learning models to solve complex business problems.',
    description: 'We are looking for a Machine Learning Engineer to join our AI team. You will be responsible for developing, testing, and deploying machine learning models that solve complex business problems. The ideal candidate has strong programming skills and experience with machine learning frameworks.',
    requirements: [
      'Masters or PhD in Computer Science, Machine Learning, or related field',
      'Experience with Python and machine learning frameworks (TensorFlow, PyTorch)',
      'Strong understanding of machine learning algorithms and techniques',
      'Experience with data preprocessing and feature engineering',
      'Knowledge of deployment and MLOps practices'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Flexible work arrangements',
      'Comprehensive health benefits',
      'Unlimited PTO',
      'Learning and conference budget',
      'Modern office with collaborative spaces'
    ],
    tags: ['Machine Learning', 'Python', 'TensorFlow', 'PyTorch', 'MLOps'],
    experience: '3+ years',
    companyDescription: 'AI Solutions is a leading artificial intelligence company that develops cutting-edge machine learning solutions for businesses. Our team of expert data scientists and engineers build AI-powered applications that help companies automate processes, gain insights, and make better decisions.',
    companySize: '50-100',
    companyFounded: '2018'
  }
];

export const getJobById = (id: string): Job | null => {
  const allJobs = [...featuredJobs, ...recommendedJobs];
  return allJobs.find(job => job.id === id) || null;
};

export const getSimilarJobs = (currentJobId: string): Job[] => {
  const allJobs = [...featuredJobs, ...recommendedJobs];
  const currentJob = getJobById(currentJobId);
  
  if (!currentJob) return [];
  
  // Filter jobs that have similar tags or title
  return allJobs
    .filter(job => job.id !== currentJobId)
    .sort(() => 0.5 - Math.random()) // Shuffle array
    .slice(0, 3); // Take 3 random jobs
};