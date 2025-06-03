import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import { setReminder,getReminder,removeReminder } from '../controllers/reminderController.js';

const router = express.Router();

router.use(verifyToken);

router.post("/:habitId",setReminder);
router.get("/:habitId",getReminder);
router.delete("/:habitId",removeReminder);

export default router;