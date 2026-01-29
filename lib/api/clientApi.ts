import type {Note} from '@/types/note'
import { nextServer } from './api';
import type { User } from '@/types/user';

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};


interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export type LoginRequest = {
  email: string;
  password: string;
};


import { NoteFormValues } from '@/types/NoteFormValues';

type CheckSessionRequest = {
  success: boolean;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export async function fetchNotes(page: number = 1, tag?: string, query: string | undefined = undefined) {
    const res = await nextServer.get<FetchNotesResponse>('/notes', {
        params: {
            search: query,
            page: page, 
            perPage: 12,
            tag: tag,
        }
    });

    return res.data;

}

export async function createNote(note: NoteFormValues) {
    const res = await nextServer.post<Note>('/notes', note);
    return res.data;
}

export async function deleteNote(id: string) { 
    const res = await nextServer.delete<Note>(`/notes/${id}`);
    return res.data;
}

export async function fetchNoteById(id: string) {
    const res = await nextServer.get<Note>(`/notes/${id}`);
    return res.data;
}



export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};
