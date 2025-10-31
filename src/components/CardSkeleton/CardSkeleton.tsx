import styles from './CardSkeleton.module.css';

export function CardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.avatar} />
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <div className={styles.username} />
        </div>
        <div className={styles.meta}>
          <div className={styles.playerId} />
        </div>
      </div>
      <div className={styles.arrow} />
    </div>
  );
}
