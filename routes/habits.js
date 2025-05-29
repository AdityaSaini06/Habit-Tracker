import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { addHabit,fetchHabits,editHabits,removeHabit } from "../controllers/habitController.js";

const router = express.Router();

router.use(verifyToken);

router.post("/",addHabit);
router.get("/",fetchHabits);
router.put("/:id",editHabits);
router.delete("/:id",removeHabit);

export default router;