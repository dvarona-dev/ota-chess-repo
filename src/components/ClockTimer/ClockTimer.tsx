import { calculateTimeDifference, formatTimeDifference } from '@/utils/timeUtils';
import { useEffect, useState } from 'react';
import styles from './ClockTimer.module.css';
import type { ClockTimerProps } from './ClockTimer.types';

export function ClockTimer({ lastOnline }: ClockTimerProps) {
  const [timeDifference, setTimeDifference] = useState(() =>
    lastOnline ? calculateTimeDifference(lastOnline) : null
  );

  useEffect(() => {
    if (!lastOnline) {
      return;
    }

    const updateTimer = () => {
      const diff = calculateTimeDifference(lastOnline);
      setTimeDifference(diff);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [lastOnline]);

  if (!lastOnline) {
    return (
      <div className={styles.container}>
        <span className={styles.label}>Last online:</span>
        <span className={styles.value}>Never</span>
      </div>
    );
  }

  if (!timeDifference) {
    return (
      <div className={styles.container}>
        <span className={styles.label}>Last online:</span>
        <span className={styles.value}>Just now</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <span className={styles.label}>Time since last online:</span>
      <span className={styles.value}>{formatTimeDifference(timeDifference)}</span>
    </div>
  );
}
