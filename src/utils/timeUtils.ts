export interface TimeDifference {
  hours: number;
  minutes: number;
  seconds: number;
}

export const calculateTimeDifference = (timestamp: number): TimeDifference | null => {
  if (!timestamp) {
    return null;
  }

  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp * 1000) / 1000);

  if (diffInSeconds < 0) {
    return null;
  }

  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return { hours, minutes, seconds };
};

export const formatTimeDifference = (time: TimeDifference): string => {
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return `${formatNumber(time.hours)}:${formatNumber(time.minutes)}:${formatNumber(time.seconds)}`;
};
