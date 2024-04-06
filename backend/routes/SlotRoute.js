import express from 'express'
import { bookSlot } from '../controllers/SlotController.js';

const router = express.Router();

router.post('/book', bookSlot)
export default router