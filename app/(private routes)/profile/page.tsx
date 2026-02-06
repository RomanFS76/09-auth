import Image from 'next/image';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import { getMe } from '@/lib/serverApi';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getMe();

  return {
    title: `${user?.data?.username} | Profile`,
    description: `Profile page of ${user?.data?.username}.`,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: `${user?.data?.username} | Profile`,
      description: `View and manage ${user?.data?.username}'s profile.`,
      url: 'https://notehub.com/profile',
      siteName: 'NoteHub',
      images: [
        {
          url: user?.data?.avatar,
          width: 1200,
          height: 630,
          alt: `${user?.data?.username} avatar`,
        },
      ],
      type: 'profile',
    },
  };
}

const ProfilePage = async () => {
  const user = await getMe();
  console.log(user);

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
            {user?.data?.avatar ? (
              <Image
                src={user?.data?.avatar}
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
            <p>Username: {user?.data?.username}</p>
            <p>Email: {user?.data?.email}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
