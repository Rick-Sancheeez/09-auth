// lib/store/authStore.ts

import { create } from 'zustand';
import { User } from '@/types/user';


type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  // Додаємо лише цей метод для AuthProvider, щоб можна було керувати статусом
  setAuthenticated: (status: boolean) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,

  setUser: (user: User) => {
    set(() => ({ user, isAuthenticated: true }));
  },

  // Новий метод, назви інших полів не змінено
  setAuthenticated: (status: boolean) => {
    set(() => ({ isAuthenticated: status }));
  },

  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
}));