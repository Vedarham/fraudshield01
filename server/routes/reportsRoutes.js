import express from "express";
import Joi from "joi";
import rateLimit from "express-rate-limit";
import Report from "../models/Report.js";
import User from "../models/User.js";

const router = express.Router();

const createLimiter = rateLimit({ windowMs: 60_000, max: 20 });

const createSchema = Joi.object({
  title: Joi.string().min(5).max(150).required(),
  content: Joi.string().min(10).max(5000).required(),
  type: Joi.string().valid("Email", "SMS", "Website", "Phone Call", "Social Media", "Other").required(),
  severity: Joi.string().valid("Low", "Medium", "High", "Critical").required(),
  additionalInfo: Joi.string().allow(""),
  reportedBy: Joi.string().email().required(),
  timestamp: Joi.date().default(() => new Date()),
  status: Joi.string().valid("Open", "In Progress", "Resolved", "Closed").default("Open"),
});

router.post("/report",createLimiter, async (req, res, next) => {
  try {
    const { value } = createSchema.validate(req.body);
    const doc = await Report.create(value);
    res.status(201).json({ id: doc._id, message: "Report submitted successfully" });
  } catch (err) {
    console.error('Error while creating report:', err);
    return next(err);
  }
});

router.get("/reports", async (req, res, next) => {
  try {
    const { page = 1, limit = 20, type, severity } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (severity) filter.severity = severity;

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Report.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Report.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    return next(err);
  }
});

router.get("/my-reports/:firebaseUID", async (req, res) => {
  try {
    const { firebaseUID } = req.params;
    const user = await User.findOne({ firebaseUID });
    if (!user) return res.status(404).json({ error: "User not found" });

    const reports = await Report.find({ reportedBy: user.email }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});
export default router;
