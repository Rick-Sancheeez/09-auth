// app/(public routes)/sign-in/page.tsx

'use client';

import css from './SignIn.module.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/_utils/utils';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  //const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.error ?? 'Registration failed');
      } else {
        setError('Unexpected error');
      }
    } 
  };

  return (
    <main className={css.mainContent}>
    <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
            Log in
        </button>
        </div>

        <p className={css.error}>{error}</p>
    </form>
    </main>
    );
};

export default SignIn;
