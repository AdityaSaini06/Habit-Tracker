import pool from "../config/db.js";

export const upsertReminder = async(habitId,{reminder_time,enabled=true,repeat_days=[]})=>{
    const res = await pool.query(
        `INSERT INTO reminders (habit_id,reminder_time,enabled,repeat_days)
        VALUES ($1,$2,$3,$4)
        ON CONFLICT (habit_id)
        DO UPDATE SET reminder_time=$2,enabled=$3,repeat_days=$4
        RETURNING *`,
        [habitId,reminder_time,enabled,repeat_days]
    );
    return res.rows[0];
};

export const getReminderByHabit = async(habitId) => {
    const res = await pool.query(
        `SELECT * FROM reminders WHERE habit_id=$1`,
        [habitId]
    );
    if(res.rowCount==0)throw new Error("Reminder not found for this habit");
    return res.rows[0];
}

export const deleteReminder = async (habitId) => {
    const res = await pool.query(
        `DELETE FROM reminders WHERE habit_id =$1 RETURNING *`,
        [habitId]
    );
    if(res.rowCount==0) throw new Error("Reminder not found or already deleted.");
    return res.rows[0];
}