import jwt from 'jsonwebtoken'; // For verifying JWT tokens
import { Request, Response, NextFunction } from 'express'; // Express types
import User, { IUser } from '../models/User'; // Mongoose User model and interface

// Extend Express Request to include a `user` object for authenticated requests
export interface AuthenticatedRequest extends Request {
  user?: IUser; // Optional user object that we attach after verifying token. 
  // Also This tells TypeScript: "req.user exists if you're logged in"
}

// Middleware to protect routes and verify user authentication
export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token; // We'll store the token here if found

  try {
    // Check if Authorization header exists and starts with 'Bearer'
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract token from the "Bearer <token>" format
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using JWT_SECRET from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      // Find the user in the database by the ID in the decoded token
      const user = await User.findById(decoded.id).select('-password'); // exclude password

      // If user doesn't exist in DB, return 401 Unauthorized
      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      // Attach the user object to the request for use in next handlers
      req.user = user;

      // Call next middleware or route handler
      next();
    } else {
      // If no token was found in the headers, return 401 Unauthorized
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    // If token is invalid or expired, catch error and return 401 Unauthorized
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Not authorized, token failed or expired' });
  }
};
