import { Router } from "express";
import { getPartnersByType, getSlotBookingDetails, loginAdmin } from "../controllers/BackOfficeController.js";

const router = Router();

router.post('/login', loginAdmin)
router.get('/getpartners/:partnerType', getPartnersByType)
router.get('/slotbookings', getSlotBookingDetails)

export default router