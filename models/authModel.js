import pool from "../config/db.js"

export const createUser = async (username, email, hashedPassword) => {
    await pool.query(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)",
        [username, email, hashedPassword]
    );
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
    ]);
    return result.rows[0];
};
