// Handle job applications
import { Request, Response } from 'express';
import Job from '../models/Job'; // Job model
import Application from '../models/Application'; // Application model
import { AuthenticatedRequest } from '../middlewares/protect'; // For typing req.user

// @desc    Apply for a job
// @route   POST /api/jobs/:id/apply
// @access  Private
export const applyToJob = async (req: AuthenticatedRequest, res: Response) => {
  const jobId = req.params.id; // Get job ID from URL
  const userId = req.user?.id; // Get logged in user ID

  try {
    // Prevent duplicate applications
    const alreadyApplied = await Application.findOne({ job: jobId, user: userId });
    if (alreadyApplied) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    // Create new application
    const application = await Application.create({ job: jobId, user: userId });

    res.status(201).json({ message: 'Application submitted', application });
  } catch (error) {
    console.error(error); // Log error
    res.status(500).json({ message: 'Server error' }); // Return generic error
  }
};
