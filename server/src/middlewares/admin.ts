
import { Request, Response, NextFunction } from 'express';
import User from '../models/User'; // Import the User model

// @desc    Check if user is admin
// @route   Middleware function for admin role validation
// @access  Private (auth required)
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?.id); // Find the authenticated user
    if (!user || user.role !== 'admin') { // Check if user is admin
      return res.status(403).json({ message: 'Access denied. Admins only.' }); // Send error if not admin
    }
    next(); // Continue if user is an admin
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: 'Server error' }); // Handle server errors
  }
};
