'use client';

import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import { useState } from 'react';

const EditProfilePage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { user, setUser } = useAuthStore();

  const handleUpdate = async (formData: FormData): Promise<void> => {
    const username = formData.get('username') as string;

    try {
      const res = await updateMe({ username });
      if (res) {
        setUser(res);
        router.push('/profile');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(
          error.response?.data?.error ?? error.message ?? 'Request failed'
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
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || '/default-avatar.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleUpdate}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              defaultValue={user?.username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
