import express, { Router, Request, Response } from 'express';
import { registerUser } from '../controllers/authController';

const router: Router = express.Router();

// Register Route
router.post('/register', (req: Request, res: Response) => {
  registerUser(req, res, () => {});
});

export default router;
