// userRoutes.ts

import express, { Response } from 'express';
import { protect } from '../middlewares/protect';
import { IUser } from '../models/User';
import { Request } from 'express';

const router = express.Router();

// Extend Request
interface AuthenticatedRequest extends Request {
  user?: IUser;
}

// Protected route
router.get('/profile', protect, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json(req.user);
});

export default router;
