import express, { Router, Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { requestPasswordReset, resetPassword } from '../controllers/authController';
import { isAdmin } from '../middlewares/admin';

const router: Router = express.Router();

// Register Route
router.post('/register', (req: Request, res: Response) => {
  registerUser(req, res, () => {});
});

// Login Route
router.post('/login', (req: Request, res: Response) => {
  loginUser(req, res, () => {});
});

// Admin Route (Protected, only admins allowed)
router.post('/admin/create-user', isAdmin, (req:Request, res:Response) => {
  // Logic for creating users that only an admin can access
  res.status(200).json({ message: 'User created by admin.' });
});


router.post('/request-reset', requestPasswordReset); // Request reset link
router.post('/reset-password/:token', resetPassword); // Reset password


export default router;
