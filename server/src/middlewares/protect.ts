// src/middlewares/protect.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

// Extend Request to include user
interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token;

  try {
    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      // Find user and attach to req object (excluding password)
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;
      next(); // Continue to route handler
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Not authorized, token failed or expired' });
  }
};
