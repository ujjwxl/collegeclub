import express from 'express'
import { registerUser } from '../controllers/AuthController.js';
import { loginUser } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
// router.post('/login', loginUser)
export default router