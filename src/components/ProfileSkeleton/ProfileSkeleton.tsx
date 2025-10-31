import { SKELETON_STATS_COUNT } from '@/pages/GrandmasterProfile/GrandmasterProfile.constants';
import styles from './ProfileSkeleton.module.css';

export function ProfileSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.backLink} />
      <div className={styles.profile}>
        <div className={styles.header}>
          <div className={styles.avatar} />
          <div className={styles.nameSection}>
            <div className={styles.name} />
            <div className={styles.username} />
            <div className={styles.title} />
            <div className={styles.clockTimer} />
          </div>
        </div>
        <div className={styles.stats}>
          {Array.from({ length: SKELETON_STATS_COUNT }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton loaders won't reorder
            <div key={`skeleton-stat-${i}`} className={styles.stat}>
              <div className={styles.statLabel} />
              <div className={styles.statValue} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
