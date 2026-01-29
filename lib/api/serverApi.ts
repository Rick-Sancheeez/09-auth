import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export const checkServerSession = async () : Promise<AxiosResponse<{success: boolean}>> => {
  const cookieStore = await cookies();
  const res = await nextServer.get<{success: boolean}>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getMeServer = async (): Promise<User> => {
  const cookieStore = await cookies();
  
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export async function fetchNotesServer(page: number = 1, tag?: string, query?: string) {
  const cookieStore = await cookies();
  
  const res = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      search: query,
      page: page,
      perPage: 12,
      tag: tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}

export async function fetchNoteByIdServer(id: string) {
  const cookieStore = await cookies();
  
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
}