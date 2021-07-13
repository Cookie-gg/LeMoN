import axios from 'axios';
export const microCMS = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});