import { Router } from "express";
import { getAllUsers, getFeedbackByType, getPartnersByType, getSlotBookingDetails, loginAdmin, updateFeedbackStatus, verifyCollege } from "../controllers/BackOfficeController.js";

const router = Router();

router.post('/login', loginAdmin)
router.get('/getpartners/:partnerType', getPartnersByType)
router.get('/slotbookings', getSlotBookingDetails)
router.get('/getAllUsers', getAllUsers);
router.put('/verifycollege/:collegeId', verifyCollege);
router.get('/feedbacks/:feedbackType', getFeedbackByType);
router.put('/updateFeedback/:feedbackId', updateFeedbackStatus);

export default router