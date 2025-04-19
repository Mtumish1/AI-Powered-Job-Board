import express from 'express';
import { isAdmin } from '../middlewares/admin'; // Admin auth
import { protect } from '../middlewares/protect'; // Auth check
import Application from '../models/Application'; // Import applications
import User from '../models/User'; // User model

const router = express.Router();

// @desc Admin view all applications
// @route GET /api/admin/applications
router.get('/applications', protect, isAdmin, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('job')
      .populate('user');

    res.status(200).json(applications); // Send full application list
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// @desc Admin view all users
// @route GET /api/admin/users
router.get('/users', protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users); // Return to admin
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

export default router;
