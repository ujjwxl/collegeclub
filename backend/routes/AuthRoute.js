import express from 'express'
import { registerUser, loginUser, getUserDetails, getColleges, completeProfileForm } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user/:userId', getUserDetails)
router.get('/college', getColleges)
router.post('/profileform/:userId', completeProfileForm)
// router.post('/login', loginUser)
export default router