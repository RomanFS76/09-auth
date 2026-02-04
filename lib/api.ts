import axios from 'axios';

export const nextServer  = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});






