import express from 'express';
import { registerUser } from '../controllers/authController';

const router = express.Router();

// Register Route
router.post('/register', registerUser);

export default router;

// Register the route in server.ts
// import authRoutes from './routes/authRoutes';
// app.use('/api/auth', authRoutes);
