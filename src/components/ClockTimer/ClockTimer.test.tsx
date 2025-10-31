import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ClockTimer } from './ClockTimer';

describe('ClockTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('displays "Never" when lastOnline is 0', () => {
    render(<ClockTimer lastOnline={0} />);

    expect(screen.getByText('Last online:')).toBeInTheDocument();
    expect(screen.getByText('Never')).toBeInTheDocument();
  });

  it('displays formatted time difference', () => {
    const oneHourAgo = Math.floor(Date.now() / 1000) - 3600;
    render(<ClockTimer lastOnline={oneHourAgo} />);

    expect(screen.getByText('Time since last online:')).toBeInTheDocument();
    expect(screen.getByText(/01:00:00/)).toBeInTheDocument();
  });

  it('updates every second', async () => {
    const twoSecondsAgo = Math.floor(Date.now() / 1000) - 2;
    render(<ClockTimer lastOnline={twoSecondsAgo} />);

    expect(screen.getByText(/00:00:02/)).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(screen.getByText(/00:00:03/)).toBeInTheDocument();
  });

  it('displays "Just now" for future timestamps', () => {
    const futureTime = Math.floor(Date.now() / 1000) + 3600;
    render(<ClockTimer lastOnline={futureTime} />);

    expect(screen.getByText('Last online:')).toBeInTheDocument();
    expect(screen.getByText('Just now')).toBeInTheDocument();
  });
});
