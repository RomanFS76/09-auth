import axios from 'axios';
// import type { Note } from '../types/note';

export const nextServer  = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});






