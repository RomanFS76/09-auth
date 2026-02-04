
import { cookies } from 'next/headers';
import { nextServer } from './api';

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const fetchNotes = async (page: number, search: string, tag?: string) => {
  const headers = await getAuthHeaders();
  const res = await nextServer.get('/notes', { 
    headers, 
    params: { page, perPage: 12, search, tag },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const headers = await getAuthHeaders();
  const res = await nextServer.get(`/notes/${id}`, { headers });
  return res.data;
};

export const getMe = async () => {
  const headers = await getAuthHeaders();
  const res = await nextServer.get('/users/me', { headers });
  return res.data;
};

export const checkSession = async () => {
  const headers = await getAuthHeaders();
  const res = await nextServer.get('/auth/session', { headers });
  return res.data;
};

