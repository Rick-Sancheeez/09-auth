import axios, { AxiosError } from 'axios';
const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;



export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
    baseURL: 'https://notehub-api.goit.study',
    withCredentials: true,
});
