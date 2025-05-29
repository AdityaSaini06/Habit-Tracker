import { createHabit,getHabitByUser,updateHabit,deleteHabit } from "../models/habitModel.js";

export const addHabit = async(req,res)=> {
    const userId = req.user.userId;
    try {
        const newHabit = await createHabit(userId,req.body);
        res.status(201).json(newHabit);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

export const fetchHabits = async(req,res) =>{
    const userId = req.user.userId;
    try {
        const habits = await getHabitByUser(userId);
        res.json(habits);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

export const editHabits = async(req,res) => {
    const userId = req.user.userId;
    const habitId = req.params.id;
    try {
        const updated = await updateHabit(habitId,userId,req.body);
        if(!updated) return res.status(404).json({message:"Habit not found"});
        res.json(updated);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export const removeHabit = async(req,res)=>{
    const userId = req.user.userId;
    const habitId = req.params.id;
    try {
        await deleteHabit(habitId,userId);
        res.json({message:"Habit deleted successfully"})
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}