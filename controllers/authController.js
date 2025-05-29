import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/authModel.js";

export const register = async (req, res) => {
    const { username, email, password_hash } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password_hash, 10);
        await createUser(username, email, hashedPassword);
        res.status(201).json({ message: "User Registered Successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password_hash } = req.body;
    try {
        const user = await findUserByEmail(email);
        if(!user) return res.status(404).json({ message: "User not found" });
        const validPassword = await bcrypt.compare(password_hash,user.password_hash);
        if (!validPassword) return res.status(401).json({ message: "Invalid Credentials" });
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};