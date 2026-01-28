'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const clearAuth = useAuthStore((state) => state.clearIsAuthenticated);
  
  // Додаємо локальний стан завантаження
  const [isHydrating, setIsHydrating] = useState(true);

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
      } finally {
        // 3. Коли перевірка завершена, прибираємо екран завантаження
        setIsHydrating(false);
      }
    };

    initAuth();
  }, [setUser, setAuthenticated, clearAuth]);

  // Поки ми не знаємо, залогінений юзер чи ні — краще нічого не рендерити 
  // або показати спінер/логотип, щоб уникнути "миготіння" контенту
  if (isHydrating) {
    return (
      <div className="flex items-center justify-center min-vh-100">
        <p>Loading session...</p> 
        {/* Тут може бути твій Spinner компонент */}
      </div>
    );
  }

  return children;
};

export default AuthProvider;