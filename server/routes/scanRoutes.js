import express from "express";
import axios from "axios";
import Joi from "joi";
import rateLimit from "express-rate-limit";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "../config.js"; 

const router = express.Router();

const limiter = rateLimit({
  windowMs: 60_000,
  max: 60,
});
router.use(limiter);

const schema = Joi.object({
  text: Joi.string().min(1).max(5000).required(),
});

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

const upload = multer({ dest: "uploads/audio/" });

router.post("/scan", async (req, res, next) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    console.log("🔍 Scanning Text:", value.text);

    const { data } = await axios.post(
      `${config.aiServiceUrl}/scan`,
      { text: value.text },
      { timeout: 25_000 }
    );

    const payload = {
      input: data.input || value.text,
      is_url: !!data.is_url,
      label: data.label || data.raw_label || "Not Scam",
      confidence: data.confidence ?? 0,
      raw_label: data.raw_label || null,
      emergency: config.emergencyNumber,
      scanned_on: data.scanned_on || new Date().toISOString(),
      keyword_flags: data.keyword_flags || data.flags || [],
      all_scores: data.all_scores || data.allScores || null,
    };

    res.json(payload);
  } catch (err) {
    console.error("Text Scan Error:", err?.response?.data || err.message || err);
    next(err);
  }
});

router.post("/upload-audio", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    const localPath = req.file.path;
    console.log("🎙️ Received audio:", localPath);

    const uploadRes = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
      folder: "fraudshield/audio",
    });

    fs.unlink(localPath, (err) => {
      if (err) console.warn("Failed to delete local file:", err);
    });

    const audioUrl = uploadRes.secure_url;
    console.log("Cloudinary upload complete:", audioUrl);

    const { data } = await axios.post(
      `${config.aiServiceUrl}/scan-audio`,
      { audioUrl },
      { timeout: 60_000 }
    );

    const payload = {
      ...data,
      source_url: audioUrl,
      emergency: config.emergencyNumber,
      scanned_on: data.scanned_on || new Date().toISOString(),
    };

    res.json(payload);
  } catch (error) {
    console.error("Audio Scan Error:", error?.response?.data || error.message || error);
    res.status(500).json({ error: "Error uploading and scanning audio." });
  }
});

export default router;
