import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const MONGO_URI = process.env.MONGO_URI || "your-mongodb-connection-string";
console.log("MONGO_URI:", process.env.MONGO_URI);

// Middleware
app.use(express.json());
app.use(cors());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Job Board API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
    console.log(`Server running on port ${PORT}`);
});