import { Router } from "express";
import { addTeamMember, createCourse, fetchTeam, getAllUsers, getFeedbackByType, getPartnersByType, getSlotBookingDetails, loginAdmin, updateFeedbackStatus, updateOnboardingStatus, verifyCollege } from "../controllers/BackOfficeController.js";

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

export default router