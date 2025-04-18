import { Request, Response, NextFunction, RequestHandler } from 'express'; // Express types
import User, { IUser } from '../models/User'; // Import User model and its interface
import bcrypt from 'bcryptjs'; // For hashing passwords
import jwt from 'jsonwebtoken'; // For generating JWT tokens
import crypto from 'crypto'; // For generating verification tokens
import sendEmail from '../utils/sendEmail'; // Utility to send email (you'll create this)


// Helper function to generate JWT token
const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role } = req.body; // Extract user data from request

  try {
    const userExists = await User.findOne({ email }); // Check if user already exists
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' }); // Return error if user exists
    }

    const salt = await bcrypt.genSalt(10); // Generate salt for password hashing
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    const verificationToken = crypto.randomBytes(32).toString('hex'); // Generate a random token for email verification

    // Create the new user with a verification token and mark as not verified
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      verificationToken,
      isVerified: false,
    });

    // Construct verification URL and send verification email
    const verificationUrl = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;
    const message = `Hi ${name},\n\nPlease verify your email by clicking the link below:\n\n${verificationUrl}\n\nThank you!`;
    await sendEmail(email, 'Verify Your Email', message); // Send email to user

    // Respond with message to check email
    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
    });
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: 'Server error' }); // Return generic server error
  }
};

// @desc    Verify user email
// @route   GET /api/auth/verify/:token
// @access  Public
export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params; // Extract token from URL

  try {
    const user = await User.findOne({ verificationToken: token }); // Find user with matching token

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' }); // Return if token is bad
    }

    user.isVerified = true; // Mark user as verified
    user.verificationToken = undefined; // Clear token so it can't be reused
    await user.save(); // Save updated user

    res.status(200).json({ message: 'Email verified successfully!' }); // Respond to client
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: 'Server error' }); // Return generic server error
  }
};


// @desc    Authenticate user & login
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body; // Extract credentials

  try {
    const user = (await User.findOne({ email })) as IUser | null; // Find user by email

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' }); // No user found
    }

    const isMatch = await user.comparePassword(password); // Check if passwords match
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' }); // Wrong password
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString()), // Issue token
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error(error); // Log error
    res.status(500).json({ message: 'Server error' }); // Generic error
  }
};



// @desc    Request password reset
// @route   POST /api/auth/request-reset
// @access  Public
export const requestPasswordReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body; // Extract user's email from the request body

  try {
    const user = await User.findOne({ email }); // Look for a user with this email
    if (!user) {
      res.status(404).json({ message: 'User not found' }); // If no user found, send error
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex'); // Generate a random token for reset
    user.resetPasswordToken = resetToken; // Save the token in the user's document
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // Set token expiry to 1 hour from now
    await user.save(); // Save the user with updated token fields

    const resetUrl = `${process.env.BASE_URL}/api/auth/reset-password/${resetToken}`; // Create reset URL using token
    const message = `Reset your password using this link: ${resetUrl}`; // Email content

    await sendEmail(email, 'Password Reset Request', message); // Send reset email to user
    res.status(200).json({ message: 'Password reset email sent' }); // Respond with success
  } catch (error) {
    console.error(error); // Log any error that happens
    res.status(500).json({ message: 'Server error' }); // Respond with server error
  }
};


// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.params; // Get the token from the URL
  const { password } = req.body; // Get new password from the request body

  try {
    const user = await User.findOne({
      resetPasswordToken: token, // Look for a user with matching token
      resetPasswordExpires: { $gt: new Date() }, // And ensure token hasn't expired
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired token' }); // Token not valid or expired
      return;
    }

    const salt = await bcrypt.genSalt(10); // Generate salt for hashing
    user.password = await bcrypt.hash(password, salt); // Hash and update the password
    user.resetPasswordToken = undefined; // Clear the token
    user.resetPasswordExpires = undefined; // Clear the expiry time

    await user.save(); // Save the updated user info
    res.status(200).json({ message: 'Password has been reset' }); // Respond with success
  } catch (error) {
    console.error(error); // Log any errors
    res.status(500).json({ message: 'Server error' }); // Respond with server error
  }
};
