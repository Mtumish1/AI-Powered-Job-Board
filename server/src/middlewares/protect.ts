// src/middleware/protect.ts
import jwt from 'jsonwebtoken'; // Import JWT to verify tokens
import { Request, Response, NextFunction } from 'express'; // Express types
import User from '../models/User'; // User model to fetch user details

// Middleware to protect routes
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>'
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' }); // If no token, reject

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }; // Decode token using secret
    req.user = await User.findById(decoded.id).select('-password'); // Attach user to request, excluding password
    next(); // Proceed to next middleware or controller
  } catch (error) {
    console.error(error); // Log any token errors
    res.status(401).json({ message: 'Not authorized, token failed' }); // Respond with auth error
  }
};
