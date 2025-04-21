// Handle job applications
import { Response, Request } from 'express';
import Application from '../models/Application'; // Application model
import { AuthenticatedRequest } from '../middlewares/protect'; // For typing req.user
import Job from '../models/Job';

// @desc    Apply for a job
// @route   POST /api/jobs/:id/apply
// @access  Private
export const applyToJob = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const jobId = req.params.id;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User not found in request' });
      return;
    }

    const job = await Job.findById(jobId);

    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    // Check if user already applied
    const alreadyApplied = await Application.findOne({ job: jobId, user: userId });
    if (alreadyApplied) {
      res.status(400).json({ message: 'You have already applied for this job' });
      return;
    }

    // Create new application
    const newApplication = await Application.create({ job: jobId, user: userId });

    res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a specific job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (
  req: Request<{ id: string }>,  // Get job ID from the URL parameter
  res: Response
): Promise<void> => {
  try {
    // Look up the job in the database using the ID
    const job = await Job.findById(req.params.id);

    // If no job is found, send a 404 Not Found response
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    // If job exists, return it with a 200 OK response
    res.status(200).json(job);
  } catch (error) {
    // Log the error for debugging
    console.error(error);

    // Return a 500 Internal Server Error for unexpected issues
    res.status(500).json({ message: 'Server error' });
  }
};