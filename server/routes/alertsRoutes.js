import express from 'express';
import Joi from 'joi';
import { config } from '../config.js';


const router = express.Router();
const schema = Joi.object({ lang: Joi.string().valid('en', 'hi').default('en') });

const BASE_ALERT = `Beware of unsolicited links or OTP requests. Never share bank or UPI PINs. Use the Cyber Crime portal to report scams.`;

router.get('/alert', async (req, res, next) => {
try {
const { value } = schema.validate(req.query);
let text = BASE_ALERT;
if (value.lang === 'hi') {
text = 'अनचाहे लिंक या ओटीपी अनुरोध से सावधान रहें। बैंक/यूपीआई पिन कभी साझा न करें। ठगी की शिकायत साइबर क्राइम पोर्टल पर करें।'

}
res.json({ alert: text, lang: value.lang, emergency: config.emergencyNumber });
} catch (err) {
next(err);
}
});


export default router;