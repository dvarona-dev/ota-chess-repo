import { CardSkeleton } from '@/components/CardSkeleton';
import { fetchPlayer } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { STALE_TIME } from './GrandmasterCard.constants';
import styles from './GrandmasterCard.module.css';
import type { GrandmasterCardProps } from './GrandmasterCard.types';

export function GrandmasterCard({ username }: GrandmasterCardProps) {
  const {
    data: playerData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['player', username],
    queryFn: () => fetchPlayer(username),
    staleTime: STALE_TIME,
  });

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    return (
      <div className={styles.card} style={{ opacity: 0.5 }}>
        <div className={styles.avatar}>{username.charAt(0).toUpperCase()}</div>
        <div className={styles.info}>
          <h3 className={styles.username}>{username}</h3>
          <p className={styles.error}>Failed to load</p>
        </div>
      </div>
    );
  }

  const avatar = playerData?.avatar;
  const name = playerData?.name || username;
  const playerId = playerData?.player_id;
  const isVerified = playerData?.verified;
  const isStreamer = playerData?.is_streamer;

  return (
    <Link to={`/player/${username}`} className={styles.card}>
      <div className={styles.avatar}>
        {avatar ? (
          <img src={avatar} alt={name} className={styles.avatarImage} />
        ) : (
          username.charAt(0).toUpperCase()
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <h3 className={styles.username}>{name}</h3>
          {isVerified && (
            <span className={styles.badge} title="Verified">
              ✓
            </span>
          )}
          {isStreamer && (
            <span className={styles.badge} title="Streamer">
              ●
            </span>
          )}
        </div>
        {playerId && (
          <div className={styles.meta}>
            <span className={styles.playerId}>ID: {playerId}</span>
          </div>
        )}
      </div>
      <span className={styles.arrow}>→</span>
    </Link>
  );
}
