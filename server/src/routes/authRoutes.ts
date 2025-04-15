import express, { Router, Request, Response } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router: Router = express.Router();

// Register Route
router.post('/register', (req: Request, res: Response) => {
  registerUser(req, res, () => {});
});

// Login Route
router.post('/login', (req: Request, res: Response) => {
  loginUser(req, res, () => {});
});


export default router;
