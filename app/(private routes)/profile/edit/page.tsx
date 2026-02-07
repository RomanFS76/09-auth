'use client';
import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useRouter } from 'next/navigation';
import { updateMe } from '@/lib/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const ProfileEditPage = () => {
  const router = useRouter();

  const email = useAuthStore(state => state.user?.email || '');
  const user = useAuthStore(state => state.user);
  const {setUser} = useAuthStore();

  const updateProfile = async (formData: FormData) => {
    const username = formData.get('username') as string;   

    const res = await updateMe({ username, email });
    setUser(res.data);
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
          <form className={css.profileInfo} action={updateProfile}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                name="username"
                type="text"
                className={css.input}
                defaultValue={user?.username || ''}
                required
              />
            </div>

            <p>{user?.email}</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button type="button" className={css.cancelButton} onClick={() => router.push('/profile')}>
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
