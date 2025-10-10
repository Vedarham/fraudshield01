import express from 'express';
import axios from 'axios';
import Joi from 'joi';
import rateLimit from 'express-rate-limit';
import { config } from '../config.js';

const router = express.Router();

const limiter = rateLimit({ windowMs: 60_000, max: 60 });
router.use(limiter);

const schema = Joi.object({ text: Joi.string().min(1).max(5000).required() });

router.post('/scan', async (req, res, next) => {
try {
const { value, error } = schema.validate(req.body);
if (error) return next({ status: 400, message: error.message });

console.log(value.text)
const { data } = await axios.post(`${config.aiServiceUrl}/scan`, {
text: value.text,
}, { timeout: 25_000 });


const payload = {
input: data.input,
is_url: !!data.is_url,
label: data.label,
confidence: data.confidence,
raw_label: data.raw_label,
emergency: config.emergencyNumber,
scanned_on: data.scanned_on
};
return res.json(payload);
} catch (err) {
return next(err);
}
});


export default router;