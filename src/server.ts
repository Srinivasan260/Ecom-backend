import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/index";
import connectRedis from "./config/redis";
import path from "path";










export const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/src/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
connectDB();
// connectRedis()




app.get('/',(req,res)=>{
    res.send("server si workimg ")
})




app.use("/api", userRoutes);



// Start Server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
