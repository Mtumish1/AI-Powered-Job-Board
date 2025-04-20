
import express, { Router, Request, Response, NextFunction } from 'express';
import { protect } from '../middlewares/protect';
import User, { IUser } from '../models/User';
import { isAdmin } from '../middlewares/admin';



const router = express.Router();


// Extend Request
interface AuthenticatedRequest extends Request {
  user?: IUser;
}

// Protected route
// @desc Get logged-in user's profile
// @route GET /api/users/profile
// @access Private
router.get('/profile', protect, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      try {
        // Cast req to AuthenticatedRequest to access `req.user`
        const typedReq = req as AuthenticatedRequest;
  
        const user = await User.findById(typedReq.user!.id).select('-password'); // Get user data
  
        if (!user) {
          return res.status(404).json({ message: 'User not found' }); // User not in DB
        }
  
        res.status(200).json(user); // Send user profile
      } catch (error) {
        console.error(error); // Log error
        res.status(500).json({ message: 'Server error' }); // Send server error
      }
    }
  );

// @desc Update logged-in user's profile
// @route PUT /api/users/profile
// @access Private
router.put('/profile', protect, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.id); // Find user by ID from JWT
    if (!user) 
      return res.status(404).json({ message: 'User not found' });

    // Update name/email if sent, else keep existing
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Optional: update password
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save(); // Save changes

    // Respond with updated info (excluding password)
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc Get all users (admin only)
// @route GET /api/users/admin/users
// @access Private/Admin
router.get('/admin/users', protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Get all users without passwords
    res.status(200).json(users); // Return list of users
  } 
  catch (error) {
    console.error(error); // Log error
    res.status(500).json({ message: 'Server error' }); // Server error
  }
});

// @desc Delete a user by ID (admin only)
// @route DELETE /api/users/admin/users/:id
// @access Private/Admin
router.delete('/admin/users/:id', protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID
    if (!user) 
      return res.status(404).json({ message: 'User not found' }); // Not found

    await user.deleteOne(); // Delete user
    res.status(200).json({ message: 'User deleted' }); // Send confirmation
  } 
  catch (error) {
    console.error(error); // Log error
    res.status(500).json({ message: 'Server error' }); // Server error
  }
});

export default router;
