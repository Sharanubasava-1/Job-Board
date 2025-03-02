import express from "express";
import Job from "../models/Job.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a Job
router.post("/", authenticate, async (req, res) => {
    try {
        const newJob = new Job({ ...req.body, postedBy: req.user.id });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all jobs
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find().populate("postedBy", "name email");
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
