import {upsertReminder,getReminderByHabit,deleteReminder} from '../models/reminderModel.js'

export const setReminder = async(req,res) =>{
    const {habitId} = req.params;
    try {
        const reminder = await upsertReminder(habitId,req.body);
        res.status(200).json(reminder);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};

export const getReminder = async(req,res)=> {
    const {habitId} = req.params;
    try {
        const reminder = await getReminderByHabit(habitId);
        res.json(reminder);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
};

export const removeReminder = async(req,res) => {
    const {habitId} = req.params;
    try {
        const deleted  = await deleteReminder(habitId);
        res.json({message:"Reminder deleted.",deleted});
    } catch (error) {
        res.status(404).json({error:error.message});
    };
}