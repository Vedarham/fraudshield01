import { createApp } from './app.js';
import { config } from './config.js';
import { logger } from './lib/logger.js';


const app = await createApp();
app.listen(config.port, () => logger.info(`API listening on :${config.port}`));