import { User } from '@/types/user';
import { nextServer } from './api';

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

// fetchNotes
// fetchNoteById
// createNote
// deleteNote
// register+++
// login
// logout
// checkSession
// getMe
// updateMe
