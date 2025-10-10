import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { config } from './config.js';
import scan from './routes/scanRoutes.js';
import alerts from './routes/alertsRoutes.js';
import reports from './routes/reportsRoutes.js';
import health from './routes/healthRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.middleware.js';

export async function createApp() {
const app = express();
app.use(helmet());
app.use(cors({ origin: config.corsOrigins, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('combined'));

if (!mongoose.connection.readyState) {
await mongoose.connect(config.mongoUri); 
}

app.use('/api', health);
app.use('/api', scan);
app.use('/api', alerts);
app.use('/api', reports);

app.use(notFound);
app.use(errorHandler);
return app;
}