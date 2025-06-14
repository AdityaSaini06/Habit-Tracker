import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import habitRoutes from './routes/habits.js';
import checkinRoutes from './routes/checkin.js';
import reminderRoutes from './routes/reminders.js'
import verifyToken from './middleware/authMiddleware.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

//test route 
app.get("/",(req,res)=>{
  res.send("Testing API successful.")
})

// auth middleware check
app.get("/check",verifyToken,(req,res)=>{
  res.json({ message: "You accessed a protected route", user: req.user });
})

//global error handler 
app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.send(500).json({error:"Something went wrong"})
})


//Auth Routes
app.use("/api/auth",authRoutes);
//Habit Routes
app.use("/api/habits",habitRoutes);
//Checkin Routes
app.use("/api/checkin",checkinRoutes);
//Remiander Routes
app.use("/api/reminder",reminderRoutes);


app.listen(PORT,()=>{
  console.log(`Server running at PORT ${PORT}`);
})
