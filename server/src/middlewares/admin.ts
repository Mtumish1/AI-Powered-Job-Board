
import { Request, Response, NextFunction } from 'express';
import User from '../models/User'; // Import the User model



// Extend the Request type to include `user`
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// @desc    Check if user is admin
// @route   Middleware function for admin role validation
// @access  Private (auth required)
// Middleware to check if a logged-in user is an admin
export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      // Ensure the user is available on the request object
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Not authenticated' });
      }
  
      // Find user by ID from DB
      const user = await User.findById(req.user.id);
  
      // If user not found or not admin, return error
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
  
      // If user is admin, continue to the next middleware or route
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
