'use client';

import css from './SignInPage.module.css';

import { login } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useState } from 'react';
import { isAxiosError } from 'axios';

const SignInPage = () => {
  const [error, setError] = useState('');

  const { setUser } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (formData: FormData): Promise<void> => {
    const userEmail = formData.get('email') as string;
    const userPassword = formData.get('password') as string;
    const payload = { email: userEmail, password: userPassword };

    try {
      const res = await login(payload);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          error.response?.data?.error ??
          error.message ??
          'Request failed'
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unexpected error occurred');
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignInPage;
