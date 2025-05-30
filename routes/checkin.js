import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { createCheckIn,fetchCheckins } from '../controllers/checkinController.js';

const router = express.Router();

router.use(verifyToken);

router.post("/",createCheckIn);
router.get("/",fetchCheckins);

export default router;