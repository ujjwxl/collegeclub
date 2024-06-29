import { Router } from "express";
import { addJobOpening, addTeamMember, createCourse, fetchApplicants, fetchTeam, getAllUsers, getFeedbackByType, getJobOpenings, getPartnersByType, getSlotBookingDetails, loginAdmin, updateFeedbackStatus, updateOnboardingStatus, verifyCollege } from "../controllers/BackOfficeController.js";

const router = Router();

router.post('/login', loginAdmin)
router.get('/getpartners/:partnerType', getPartnersByType)
router.get('/slotbookings', getSlotBookingDetails)
router.get('/getAllUsers', getAllUsers);
router.put('/verifycollege/:collegeId', verifyCollege);
router.get('/feedbacks/:feedbackType', getFeedbackByType);
router.put('/updateFeedback/:feedbackId', updateFeedbackStatus);
router.put('/updateonboardingstatus/:collegeId', updateOnboardingStatus);
router.post('/team/add', addTeamMember);
router.get('/team/all', fetchTeam);
router.post('/addcourse', createCourse);
router.get('/applicants/all', fetchApplicants);
router.post('/job/add', addJobOpening);
router.get('/job/all', getJobOpenings);

export default router