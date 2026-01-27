import axios from 'axios'
import type {Note} from '../types/note'

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

import { NoteFormValues } from '@/types/NoteFormValues';

{ /* interface MutateNote {
    title: string;
    content: string;
    tag: string;
}
*/}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export async function fetchNotes(page: number = 1, tag?: string, query: string | undefined = undefined) {
    const res = await axios.get<FetchNotesResponse>('/notes', {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
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
    const res = await axios.post<Note>('/notes', note, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        }
    });
    return res.data;
}

export async function deleteNote(id: string) { 
    const res = await axios.delete<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    return res.data;
}

export async function fetchNoteById(id: string) {
    const res = await axios.get<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    });
    return res.data;
}

