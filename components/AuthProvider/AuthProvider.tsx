'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect,  } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const clearAuth = useAuthStore((state) => state.clearIsAuthenticated);
  
 
  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. Перевіряємо, чи є взагалі активна сесія (куки)
        const hasSession = await checkSession();
        
        if (hasSession) {
          // 2. Якщо сесія є, запитуємо дані користувача
          const user = await getMe();
          if (user) {
            setUser(user);
            setAuthenticated(true);
          } else {
            clearAuth();
          }
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        clearAuth();
      } 
    };

    initAuth();
  }, [setUser, setAuthenticated, clearAuth]);



  return children;
};

export default AuthProvider;