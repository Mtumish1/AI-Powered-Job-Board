// Import React and required hooks
import React, { useEffect, useState } from 'react';

// Import Link from React Router DOM for client-side routing
import { Link } from 'react-router-dom';

// Import a custom JobCard component (you can build this separately)
import JobCard from '../components/JobCard';

// Define the shape of a Job object to enforce typing
interface Job {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  recruiter: string;
}

// Define the Home component as a functional component
const Home: React.FC = () => {
  // jobs state to store fetched job list
  const [jobs, setJobs] = useState<Job[]>([]);

  // loading state to show a spinner or message while fetching
  const [loading, setLoading] = useState<boolean>(true);

  // error state to show error messages
  const [error, setError] = useState<string | null>(null);

  // useEffect runs when the component mounts
  useEffect(() => {
    // Define an async function to fetch jobs
    const fetchJobs = async () => {
      try {
        // Send a GET request to your backend API to fetch all jobs
        const response = await fetch('/api/jobs');

        // If the response is not ok (e.g. 404 or 500), throw an error
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        // Parse the JSON response
        const data = await response.json();

        // Update the jobs state with the fetched data
        setJobs(data);
      } catch (err: any) {
        // On error, set the error message
        setError(err.message || 'Something went wrong');
      } finally {
        // Whether success or error, stop the loading state
        setLoading(false);
      }
    };

    // Call the function to fetch jobs
    fetchJobs();
  }, []); // Empty dependency array ensures this runs once on mount

  // Render the UI
  return (
    <div className="p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold mb-4">Latest Jobs</h1>

      {/* Conditional rendering based on state */}
      {loading && <p>Loading jobs...</p>} {/* Show loading state */}
      {error && <p className="text-red-500">{error}</p>} {/* Show error */}

      {/* Render job cards if jobs are available */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          // Link to the individual job details page using job ID
          <Link key={job._id} to={`/jobs/${job._id}`}>
            {/* Reusable component to display job info */}
            <JobCard job={job} />
          </Link>
        ))}
      </div>
    </div>
  );
};

// Export the component for use in routing
export default Home;
