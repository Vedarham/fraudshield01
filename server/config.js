import 'dotenv/config';
export const config = {
port: process.env.PORT || 5000,
nodeEnv: process.env.NODE_ENV || 'development',
mongoUri: process.env.MONGO_URI,
jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
aiServiceUrl: process.env.AI_SERVICE_URL,
emergencyNumber: process.env.EMERGENCY_NUMBER || '+91-1930',
corsOrigins: (process.env.CORS_ORIGINS || '*').split(','),
translateLocation: process.env.TRANSLATE_LOCATION || 'global',
}