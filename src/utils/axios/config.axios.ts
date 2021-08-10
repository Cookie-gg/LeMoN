import axios from 'axios';
export const microCMS = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CMS_API_URL,
});