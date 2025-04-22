import express from 'express';  // Import Express framework
import dotenv from 'dotenv';  // Import dotenv to load environment variables
import cors from 'cors';  // Import CORS for handling cross-origin requests
import helmet from 'helmet';  // Import Helmet for securing HTTP headers
import morgan from 'morgan';  // Import Morgan for logging HTTP requests
import mongoose from 'mongoose';  // Import Mongoose for MongoDB connection
import authRoutes from './routes/authRoutes'; // Import auth routes
import userRoutes from './routes/userRoutes'; // Import user routes
import jobRoutes from './routes/jobRoutes'; // Import job routes
import adminRoutes from './routes/adminRoutes'; // Import admin routes

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;  // Set the port from .env or use 5000 as default

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/job-board';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware setup
app.use(express.json());  // Enable JSON request body parsing
app.use(cors());  // Allow cross-origin requests
app.use(helmet());  // Secure HTTP headers
app.use(morgan('dev'));  // Log HTTP requests
app.use('/api/users', userRoutes); // Mount at /api/users
app.use('/api/auth', authRoutes); // Auth routes (register, login)
app.use('/api/jobs', jobRoutes); // Job routes (post and get jobs)
app.use('/api/admin', adminRoutes);


// Define a test route to check if API is running
app.get('/', (req, res) => {
    res.send('Job Board API is running...');
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
