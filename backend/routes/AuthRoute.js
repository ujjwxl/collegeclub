import express from 'express'
import { registerUser, loginUser, getUserDetails, getColleges, completeProfileForm, completeDetailsForm, completeCompanyProfileForm, completeCompanyDetailsForm, completeAmbassadorProfileForm, saveFeedback, getCoursesByType, submitJobApplication, completeApplicationForm, createJobListing, getJobsByUserId, getAllJobs, markJobAsListed, markJobAsDelisted, deleteJob, submitCompanyJobApplication, getCompanyJobApplicants, getAllCourses, searchRecords, searchRelevantUsers, getCompanies, createKeywords, searchRelevantUsersNew, updateProfileForm, changePassword, completeCourseApplication, getUserCourses} from '../controllers/AuthController.js';
import { resetPassword } from '../controllers/AuthController.js';
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user/:userId', getUserDetails)
router.post('/updateprofile/:userId', updateProfileForm)
router.post('/changepassword/:userId', changePassword)
router.get('/college', getColleges)
router.get('/company', getCompanies)
router.post('/profileform/:userId', completeProfileForm)
router.post('/detailsform/:userId', completeDetailsForm)
router.post('/companyprofileform/:userId', completeCompanyProfileForm)
router.post('/companydetailsform/:userId', completeCompanyDetailsForm)
router.post('/ambassadorprofileform/:userId', completeAmbassadorProfileForm)
router.post('/feedbackform', saveFeedback)
router.get('/coursetype/:courseType', getCoursesByType)
router.get('/allcourses/', getAllCourses)
router.post('/apply', submitJobApplication)
router.post('/profilecompleted/:userId', completeApplicationForm)
router.post('/createjob/:userId', createJobListing)
router.get('/getjobs/:userId', getJobsByUserId)
router.get('/getjobs/', getAllJobs)
router.put('/markjoblisted/:jobId', markJobAsListed)
router.put('/markjobdelisted/:jobId', markJobAsDelisted)
router.delete('/deletejob/:jobId', deleteJob)
router.post('/companyapply', submitCompanyJobApplication)
router.get('/companyapplicants/:userId', getCompanyJobApplicants)
router.post('/reset-password', resetPassword);
router.post('/createkeywords/:userId', createKeywords);
router.get('/search', searchRelevantUsersNew);
router.post('/createadmission/:userId', completeCourseApplication);
router.get('/getcourses/:userId', getUserCourses);


// router.post('/login', loginUser)
export default router