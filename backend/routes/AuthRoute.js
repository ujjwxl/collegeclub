import express from 'express'
import { registerUser, loginUser, getUserDetails, getColleges, completeProfileForm, completeDetailsForm, completeCompanyProfileForm, completeCompanyDetailsForm, completeAmbassadorProfileForm, saveFeedback, getCoursesByType, submitJobApplication} from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user/:userId', getUserDetails)
router.get('/college', getColleges)
router.post('/profileform/:userId', completeProfileForm)
router.post('/detailsform/:userId', completeDetailsForm)
router.post('/companyprofileform/:userId', completeCompanyProfileForm)
router.post('/companydetailsform/:userId', completeCompanyDetailsForm)
router.post('/ambassadorprofileform/:userId', completeAmbassadorProfileForm)
router.post('/feedbackform', saveFeedback)
router.get('/coursetype/:courseType', getCoursesByType)
router.post('/apply', submitJobApplication)

// router.post('/login', loginUser)
export default router