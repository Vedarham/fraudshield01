import express from 'express';
import axios from 'axios';
import Joi from 'joi';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { config } from '../config.js';
const router = express.Router();
const limiter = rateLimit({ windowMs: 60_000, max: 60 });
router.use(limiter);


const schema = Joi.object({
  text: Joi.string().min(1).max(5000).required(),
});


cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});


router.post('/scan', async (req, res, next) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) return next({ status: 400, message: error.message });

    console.log('🔍 Scanning Text:', value.text);

    const { data } = await axios.post(
      `${config.aiServiceUrl}/scan`,
      { text: value.text },
      { timeout: 25_000 }
    );

    const payload = {
      input: data.input,
      is_url: !!data.is_url,
      label: data.label,
      confidence: data.confidence,
      raw_label: data.raw_label,
      emergency: config.emergencyNumber,
      scanned_on: data.scanned_on,
    };

    res.json(payload);
  } catch (err) {
    console.error('Text Scan Error:', err.message);
    next(err);
  }
});

const upload = multer({ dest: 'uploads/audio/' });

router.post('/upload-audio', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    const localPath = req.file.path;
    console.log('🎙️ Received audio:', localPath);

    const uploadRes = await cloudinary.uploader.upload(localPath, {
      resource_type: 'auto',
      folder: 'fraudshield/audio',
    });

  
    fs.unlink(localPath, (err) => {
      if (err) console.warn('Failed to delete local file:', err);
    });

    const audioUrl = uploadRes.secure_url;
    console.log('Cloudinary upload complete:', audioUrl);


    const { data } = await axios.post(
      `${config.aiServiceUrl}/scan-audio`,
      { audioUrl },
      { timeout: 30_000 }
    );

    const payload = {
      ...data,
      source_url: audioUrl,
      emergency: config.emergencyNumber,
      scanned_on: new Date(),
    };

    res.json(payload);
  } catch (error) {
    console.error('Audio Scan Error:', error.message);
    res.status(500).json({ error: 'Error uploading and scanning audio.' });
  }
});

export default router;
