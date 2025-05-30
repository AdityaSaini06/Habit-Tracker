import { createCheckin,getCheckinByDate } from "../models/checkinModel.js";

export const createCheckIn = async(req,res)=>{
    const userId = req.user.userId;
    try {
        const checkin = await createCheckin(userId,req.body);
        if(!checkin) return res.status(409).json({ message: "Already checked in for this habit today."});
        res.status(201).json(checkin);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};

export const fetchCheckins = async(req,res)=>{
    const userId = req.user.userId;
    const date = req.query.date;
    try {
        const checkins = await getCheckinByDate(userId,date);
        res.json(checkins);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}