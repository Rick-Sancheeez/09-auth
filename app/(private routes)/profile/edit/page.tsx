'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import axios from 'axios';
import css from './EditPage.module.css';

const EditProfilePage = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setUsername(user.name);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      
      const { data } = await axios.patch('/api/users/me', {
        name: username,
      });

      // Оновлюємо Zustand новими даними від бекенда
      setUser(data);
      
      // Перенаправлення на профіль
      router.push('/profile');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Помилка при оновленні профілю');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

  
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || 'https://via.placeholder.com/120'} 
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <p className={css.emailText}>Email: {user.email}</p>

          <div className={css.actions}>
            <button 
              type="submit" 
              className={css.saveButton}
              disabled={isSubmitting || username === user.name}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button 
              type="button" 
              className={css.cancelButton} 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;