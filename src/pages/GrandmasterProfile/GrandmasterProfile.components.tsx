import { ClockTimer } from '@/components/ClockTimer';
import type { PlayerData } from '@/types/chess';
import type {
  BooleanStatProps,
  ProfileHeaderProps,
  StatItemProps,
} from './GrandmasterProfile.components.types';
import styles from './GrandmasterProfile.module.css';
import { formatDate, formatPlatformType, formatStatus } from './GrandmasterProfile.utils';

export function ProfileHeader({ data }: ProfileHeaderProps) {
  return (
    <div className={styles.header}>
      {data.avatar && (
        <img src={data.avatar} alt={`${data.username} avatar`} className={styles.avatar} />
      )}
      {!data.avatar && (
        <div className={styles.avatarPlaceholder}>{data.username.charAt(0).toUpperCase()}</div>
      )}
      <div className={styles.nameSection}>
        <h1 className={styles.name}>{data.name || data.username}</h1>
        <p className={styles.username}>@{data.username}</p>
        {data.title && <span className={styles.title}>{data.title}</span>}
        <ClockTimer lastOnline={data.last_online} />
      </div>
    </div>
  );
}

export function StatItem({ label, value }: StatItemProps) {
  return (
    <div className={styles.stat}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
}

export function BooleanStat({ label, value }: BooleanStatProps) {
  return (
    <StatItem
      label={label}
      value={
        <>
          <span className={value ? styles.iconTrue : styles.iconFalse}>{value ? '✓' : '✗'}</span>
          <span className={styles.booleanText}>{value ? 'Yes' : 'No'}</span>
        </>
      }
    />
  );
}

function StreamingPlatformLink({
  platform,
}: {
  platform: { type: string; channel_url: string };
}) {
  return (
    <a
      href={platform.channel_url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.platformTag}
      title={platform.channel_url}
    >
      {formatPlatformType(platform.type)}
    </a>
  );
}

function ExternalLink({
  href,
  children,
  className,
}: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export function ProfileStats({ data }: { data: PlayerData }) {
  return (
    <div className={styles.stats}>
      {data.player_id !== undefined && <StatItem label="Player ID" value={data.player_id} />}
      <StatItem label="Status" value={formatStatus(data.status)} />
      <StatItem label="Country" value={data.country || 'Unknown'} />
      {data.location && <StatItem label="Location" value={data.location} />}
      <BooleanStat label="Verified" value={data.verified} />
      <BooleanStat label="Streamer" value={data.is_streamer} />
      <StatItem label="Joined" value={formatDate(data.joined)} />
      <StatItem label="Followers" value={data.followers.toLocaleString()} />
      {data.fide && data.fide > 0 && <StatItem label="FIDE Rating" value={data.fide} />}
      {data.league && <StatItem label="League" value={data.league} />}
      <StatItem
        label="Profile URL"
        value={
          <ExternalLink href={data.url} className={styles.link}>
            View Profile
          </ExternalLink>
        }
      />
      {data.twitch_url && (
        <StatItem
          label="Twitch URL"
          value={
            <ExternalLink href={data.twitch_url} className={styles.link}>
              View Twitch Channel
            </ExternalLink>
          }
        />
      )}
      {data.streaming_platforms &&
        Array.isArray(data.streaming_platforms) &&
        data.streaming_platforms.length > 0 && (
          <StatItem
            label="Streaming Platforms"
            value={
              <div className={styles.platformsList}>
                {data.streaming_platforms.map((platform, idx) => (
                  <StreamingPlatformLink
                    key={`platform-${platform.type}-${idx}`}
                    platform={platform}
                  />
                ))}
              </div>
            }
          />
        )}
    </div>
  );
}
