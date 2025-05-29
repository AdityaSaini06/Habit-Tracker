import pool from "../config/db.js";

export const createHabit = async (userId,{name,goal,frequency,color})=>{
    const res = await pool.query(
        `INSERT INTO habits (user_id,name,goal,frequency,color) VALUES 
        ($1,$2,$3,$4,$5) RETURNING *`,
        [userId,name,goal,frequency,color]
    );
    return res.rows[0];
}

export const getHabitByUser = async (userId) => {
    const res = await pool.query(
        `SELECT * FROM habits WHERE user_id = $1 ORDER BY created_at DESC`,
        [userId]
    );
    return res.rows;
}

export const updateHabit = async(habitId, userId,{name,goal,frequency,color}) => {
    const res = await pool.query(
        `UPDATE habits SET name =$1,goal=$2,frequency=$3,color=$4 
         WHERE id=$5 and user_id=$6 RETURNING *`,
        [name,goal,frequency,color,habitId,userId]
    );
    return res.rows[0];
};

export const deleteHabit = async(habitId,userId) => {
    await pool.query(
        'DELETE FROM habits WHERE id=$1 AND user_id=$2',
        [habitId,userId]
    )
};