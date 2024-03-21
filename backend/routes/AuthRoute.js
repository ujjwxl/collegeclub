import express from 'express'
import { registerUser, loginUser, getUserDetails } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user/:userId', getUserDetails)
// router.post('/login', loginUser)
export default router