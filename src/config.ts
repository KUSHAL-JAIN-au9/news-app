import dotenv from 'dotenv';
dotenv.config();

export const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;
export const guardianApiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
export const nytApiKey = process.env.REACT_APP_NYT_API_KEY;
