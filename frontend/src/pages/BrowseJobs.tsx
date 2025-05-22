// src/pages/BrowseJobs.tsx
import { useEffect, useState } from 'react';
import { jobs } from '../services/api';
import { Job } from '../services/api';
import { apiErrorHandler } from '../services/api';

const BrowseJobs = () => {
  const [jobList, setJobList] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    jobs
      .getAll()
      .then(setJobList)
      .catch((err) => setError(apiErrorHandler(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-4">Browse Jobs</h1>

      {loading && <p className="text-slate-300">Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobList.map((job) => (
          <div
            key={job._id}
            className="bg-slate-800 p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-orange-400 font-semibold text-lg">{job.title}</h2>
            <p className="text-slate-300">{job.description}</p>
            <p className="text-sm text-slate-400">{job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseJobs;
