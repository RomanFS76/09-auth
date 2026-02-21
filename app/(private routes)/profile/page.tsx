import Image from 'next/image';
import Link from 'next/link';
import css from './ProfilePage.module.css';
import { getMe } from '@/lib/api/serverApi';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const { username, email } = await getMe();
  return {
    title: `${username} | Profile`,
    description: `Profile page of ${username} (${email}).`,
    openGraph: {
      title: `${username} | NoteHub Profile`,
      description: `View profile details for ${username}.`,
      url: `https://notehub.io/profile`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${username} profile`,
        },
      ],
      type: 'profile',
    },
  };
}

const ProfilePage = async () => {
  const { username, email, avatar } = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
