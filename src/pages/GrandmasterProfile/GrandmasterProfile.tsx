import { ProfileSkeleton } from '@/components/ProfileSkeleton';
import { SEO } from '@/components/SEO';
import { Link, useParams } from 'react-router-dom';
import { ProfileHeader, ProfileStats } from './GrandmasterProfile.components';
import { usePlayerQuery } from './GrandmasterProfile.hooks';
import styles from './GrandmasterProfile.module.css';
import { buildSEOData, buildStructuredData } from './GrandmasterProfile.utils';

function ErrorView({ error }: { error: unknown }) {
  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <h2>Error loading player profile</h2>
        <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
        <Link to="/" className={styles.backLink}>
          ← Back to Grandmasters List
        </Link>
      </div>
    </div>
  );
}

// Validate username format: alphanumeric, hyphens, underscores only
const isValidUsername = (username: string | undefined): username is string => {
  if (!username) return false;
  return /^[a-zA-Z0-9_-]+$/.test(username);
};

export function GrandmasterProfile() {
  const { username } = useParams<{ username: string }>();

  // Validate username before making API call
  if (!isValidUsername(username)) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Invalid username</h2>
          <p>
            Username contains invalid characters. Usernames can only contain letters, numbers,
            hyphens, and underscores.
          </p>
          <Link to="/" className={styles.backLink}>
            ← Back to Grandmasters List
          </Link>
        </div>
      </div>
    );
  }

  const { data, isLoading, isError, error } = usePlayerQuery(username);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError || !data) {
    return <ErrorView error={error} />;
  }

  const seoData = buildSEOData(data);
  const structuredData = buildStructuredData(data);

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={seoData.image}
        url={seoData.url}
        type="profile"
        structuredData={structuredData}
      />
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          ← Back to Grandmasters List
        </Link>

        <div className={styles.profile}>
          <ProfileHeader data={data} />
          <ProfileStats data={data} />
        </div>
      </div>
    </>
  );
}
