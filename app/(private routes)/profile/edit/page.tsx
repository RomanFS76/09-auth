'use client';
import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updateMe,getMe } from '@/lib/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const ProfileEditPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
      
    });
  }, []);

  const email = useAuthStore(state => state.user?.email || '');
  const user = useAuthStore(state => state.user);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const updateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateMe({ username: userName, email });
    router.push('/profile');
  };

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>
          {user?.avatar && (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          )}
          <form className={css.profileInfo} onSubmit={updateProfile}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                name="username"
                type="text"
                className={css.input}
                defaultValue={userName}
                onChange={handleChange}
              />
            </div>

            <p>{user?.email}</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button type="button" className={css.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default ProfileEditPage;
