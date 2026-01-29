'use client';

import css from './SignUp.module.css';

import { isAxiosError } from 'axios';
import { logErrorResponse } from '@/app/api/_utils/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';


const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);


  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);
    
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
          if (isAxiosError(err)) {
            logErrorResponse(err);
            const serverMessage = err.response?.data?.message || 'Login failed';
            const status = err.response?.status;
    
            setError(serverMessage);
            return { message: serverMessage, status };
          }
    
        
          const genericMessage = err instanceof Error ? err.message : 'An error occurred';
          setError(genericMessage);
          return { message: genericMessage, status: 500 };
        }
  };

  return (
    <main className={css.mainContent}>

        <form className={css.form} action={handleSubmit}>
            <h1 className={css.formTitle}>Sign up</h1>
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
                Register
            </button>
            </div>

            {error && <p className={css.error}>{error}</p>}
        </form>
    </main>
  );

}

export default SignUp;