import pool from '../config/db.js'

export const createCheckin = async(userId,{habitId,date,note=null}) => {
    const habitCheck = await pool.query(
    `SELECT id FROM habits WHERE id = $1 AND user_id = $2`,
    [habitId, userId]
    );

    if (habitCheck.rowCount === 0)throw new Error("Invalid habit ID or habit does not belong to the user");
    const res = await pool.query(
        `INSERT INTO checkins (user_id,habit_id,date,note)
        VALUES ($1,$2,$3,$4) RETURNING *`,
        [userId,habitId,date,note]
    );
    return res.rows[0];
}

export const getCheckinByDate = async (userId,date) =>{
    const res = await pool.query(
        `SELECT c.* FROM checkins c
        JOIN habits h ON c.habit_id = h.id
        WHERE c.user_id = $1 AND c.date = $2 AND h.user_id = $1`,
        [userId, date]
    );
    if (res.rowCount===0)throw new Error("No check-ins found for this user on the given date.");
    return res.rows;
}