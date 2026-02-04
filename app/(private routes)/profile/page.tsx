import Image from 'next/image';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import { getMe } from '@/lib/serverApi';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getMe();

  return {
    title: `${user.username} | Profile`,
    description: `Profile page of ${user.username}.`,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `${user.username} | Profile`,
      description: `View and manage ${user.username}'s profile.`,
      url: 'https://notehub.com/profile',
      siteName: 'NoteHub',
      images: [
        {
          url: user.avatar,
          width: 1200,
          height: 630,
          alt: `${user.username} avatar`,
        },
      ],
      type: 'profile',
    },
  };
}

const ProfilePage = async () => {
  const user = await getMe();

  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
              />
            ) : (
              <div className={css.avatarPlaceholder} aria-label="No avatar" />
            )}
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
