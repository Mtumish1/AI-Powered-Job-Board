import express, { Router, Response, Request } from 'express';
import Job from '../models/Job'; // Import Job model
import { isAdmin } from '../middlewares/admin'; // Admin check middleware
import { protect, AuthenticatedRequest } from '../middlewares/protect';
import { applyToJob, getJobById }  from '../controllers/jobController';
import { authHandler } from '../middlewares/authHandler'; // authHandler to cast req properly as AuthenticatedRequest

const router: Router = express.Router();

// @desc    Post a new job (only recruiters/admins)
// @route   POST /api/jobs
// @access  Private (recruiter/admin)
router.post('/post-job', isAdmin, async (req, res,) => {
  const { title, description, company, location } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      company,
      location,
      recruiter: req.user?.id, // Set recruiter as the current logged-in user
    });

    await newJob.save(); // Save job to database

    res.status(201).json(newJob); // Respond with the created job
  } 
  catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: 'Server error' }); // Respond with error
  }
});

// @desc    Get all jobs (public route)
// @route   GET /api/jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch all jobs from database
    res.status(200).json(jobs); // Return the list of jobs
  } 
  catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: 'Server error' }); // Respond with error
  }
});



// Route to delete a job by ID (admin or job owner only)
router.delete('/:id', protect, isAdmin, authHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id); // Find job by ID
    if (!job) {
      return res.status(404).json({ message: 'Job not found' }); // Job not found
    }

    // Allow only the job owner or an admin to delete the job
    if (job.recruiter.toString() !== req.user!.id && req.user!.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this job' }); // Access denied
    }

    await job.deleteOne(); // Delete the job
    res.status(200).json({ message: 'Job deleted' }); // Send success message
  } 
  catch (error) {
    console.error(error); // Log any error
    res.status(500).json({ message: 'Server error' }); // Server error
  }
}));


// @desc Get all jobs with optional filters
// @route GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const { keyword, location } = req.query; // Read filters from query params

    // Build query object
    const query: any = {};
    if (keyword) query.title = { $regex: keyword, $options: 'i' }; // Case-insensitive match
    if (location) query.location = { $regex: location, $options: 'i' };

    const jobs = await Job.find(query); // Find jobs with filter
    res.status(200).json(jobs); // Return filtered jobs
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});


// @desc    Get a specific job by ID
// @route   GET /api/jobs/:id
// @access  Public
// Route to get a specific job by ID
// Explicitly type params — we expect an `id` in the route param
router.get('/:id', getJobById);

// @desc Apply to a job
// @route POST /api/jobs/:id/apply
router.post('/:id/apply', protect, authHandler(applyToJob)); // Protect route so only logged-in users apply

export default router;
