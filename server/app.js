import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { config } from './config.js';

export async function createApp() {
const app = express();
app.use(helmet());
app.use(cors({ origin: config.corsOrigins, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined'));

if (!mongoose.connection.readyState) {
await mongoose.connect(config.mongoUri);
}

return app;
}