import express from 'express';  // Import Express framework
import dotenv from 'dotenv';  // Import dotenv to load environment variables
import cors from 'cors';  // Import CORS for handling cross-origin requests
import helmet from 'helmet';  // Import Helmet for securing HTTP headers
import morgan from 'morgan';  // Import Morgan for logging HTTP requests

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;  // Set the port from .env or use 5000 as default

// Middleware setup
app.use(express.json());  // Enable JSON request body parsing
app.use(cors());  // Allow cross-origin requests
app.use(helmet());  // Secure HTTP headers
app.use(morgan('dev'));  // Log HTTP requests

// Define a test route to check if API is running
app.get('/', (req, res) => {
    res.send('Job Board API is running...');
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});