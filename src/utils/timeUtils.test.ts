import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type TimeDifference, calculateTimeDifference, formatTimeDifference } from './timeUtils';

describe('timeUtils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-01T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('calculateTimeDifference', () => {
    it('returns null for zero timestamp', () => {
      expect(calculateTimeDifference(0)).toBeNull();
    });

    it('calculates correct difference for 1 hour ago', () => {
      const oneHourAgo = Math.floor(Date.now() / 1000) - 3600;
      const result = calculateTimeDifference(oneHourAgo);

      expect(result).toEqual({
        hours: 1,
        minutes: 0,
        seconds: 0,
      });
    });

    it('calculates correct difference for 1 hour 30 minutes 45 seconds ago', () => {
      const timeAgo = Math.floor(Date.now() / 1000) - (3600 + 30 * 60 + 45);
      const result = calculateTimeDifference(timeAgo);

      expect(result).toEqual({
        hours: 1,
        minutes: 30,
        seconds: 45,
      });
    });

    it('returns null for future timestamps', () => {
      const future = Math.floor(Date.now() / 1000) + 3600;
      expect(calculateTimeDifference(future)).toBeNull();
    });
  });

  describe('formatTimeDifference', () => {
    it('formats time correctly', () => {
      const time: TimeDifference = {
        hours: 1,
        minutes: 30,
        seconds: 5,
      };

      expect(formatTimeDifference(time)).toBe('01:30:05');
    });

    it('pads single digits with zeros', () => {
      const time: TimeDifference = {
        hours: 0,
        minutes: 5,
        seconds: 3,
      };

      expect(formatTimeDifference(time)).toBe('00:05:03');
    });

    it('handles large values', () => {
      const time: TimeDifference = {
        hours: 23,
        minutes: 59,
        seconds: 59,
      };

      expect(formatTimeDifference(time)).toBe('23:59:59');
    });
  });
});
