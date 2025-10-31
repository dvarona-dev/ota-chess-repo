import * as api from '@/services/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GrandmasterList } from './GrandmasterList';

vi.mock('@/services/api');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe('GrandmasterList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset matchMedia mock before each test
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
    // Mock fetchPlayer for GrandmasterCard components
    vi.mocked(api.fetchPlayer).mockImplementation((username: string) =>
      Promise.resolve({
        '@id': `https://api.chess.com/pub/player/${username}`,
        url: `https://www.chess.com/member/${username}`,
        username,
        player_id: 1,
        status: 'active',
        country: 'US',
        joined: 1000000000,
        last_online: 1000000000,
        followers: 1000,
        is_streamer: false,
        verified: false,
        streaming_platforms: [],
      })
    );
  });

  it('displays loading state', () => {
    vi.mocked(api.fetchGrandmasters).mockImplementation(
      () =>
        new Promise(() => {
          // Never resolves
        })
    );

    render(<GrandmasterList />, { wrapper: createWrapper() });

    expect(screen.getByText('Loading grandmasters...')).toBeInTheDocument();
    expect(screen.getByText('Chess Grandmasters')).toBeInTheDocument();
  });

  it('displays grandmasters list', async () => {
    const mockData = { players: ['player1', 'player2', 'player3'] };
    vi.mocked(api.fetchGrandmasters).mockResolvedValue(mockData);

    render(<GrandmasterList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('3 Grandmasters')).toBeInTheDocument();
    });

    // Check that player usernames are rendered (via GrandmasterCard components)
    await waitFor(() => {
      expect(screen.getByText('player1')).toBeInTheDocument();
    });
    expect(screen.getByText('player2')).toBeInTheDocument();
    expect(screen.getByText('player3')).toBeInTheDocument();
  });

  it('displays error state', async () => {
    const mockError = new Error('Failed to fetch');
    vi.mocked(api.fetchGrandmasters).mockRejectedValue(mockError);

    render(<GrandmasterList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Error loading grandmasters')).toBeInTheDocument();
    });

    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });

  it('handles pagination when there are more items than page size', async () => {
    // Create 15 players (more than default mobile page size of 10)
    const players = Array.from({ length: 15 }, (_, i) => `player${i + 1}`);
    const mockData = { players };
    vi.mocked(api.fetchGrandmasters).mockResolvedValue(mockData);

    render(<GrandmasterList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('15 Grandmasters')).toBeInTheDocument();
    });

    // Should show page info
    await waitFor(() => {
      expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument();
    });

    // Should show pagination controls
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('navigates to next page when next button is clicked', async () => {
    const user = userEvent.setup();
    const players = Array.from({ length: 15 }, (_, i) => `player${i + 1}`);
    const mockData = { players };
    vi.mocked(api.fetchGrandmasters).mockResolvedValue(mockData);

    render(<GrandmasterList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('15 Grandmasters')).toBeInTheDocument();
    });

    const nextButton = await waitFor(() => screen.getByLabelText('Next page'));
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/Page 2 of 2/)).toBeInTheDocument();
    });

    // Previous button should be enabled now
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
  });

  it('does not show pagination when items fit on one page', async () => {
    const mockData = { players: ['player1', 'player2', 'player3'] };
    vi.mocked(api.fetchGrandmasters).mockResolvedValue(mockData);

    render(<GrandmasterList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('3 Grandmasters')).toBeInTheDocument();
    });

    // Should not show page info or pagination
    expect(screen.queryByText(/Page/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument();
  });
});
