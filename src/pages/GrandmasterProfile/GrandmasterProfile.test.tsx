import * as api from '@/services/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { GrandmasterProfile } from './GrandmasterProfile';

vi.mock('@/services/api');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ username: 'testuser' }),
  };
});

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
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

describe('GrandmasterProfile', () => {
  it('displays loading state', () => {
    vi.mocked(api.fetchPlayer).mockImplementation(
      () =>
        new Promise(() => {
          // Never resolves
        })
    );

    const { container } = render(<GrandmasterProfile />, {
      wrapper: createWrapper(),
    });

    // ProfileSkeleton renders a container with skeleton elements
    // Check that skeleton structure is present
    expect(container.querySelector('[class*="container"]')).toBeInTheDocument();
  });

  it('displays player information', async () => {
    const mockPlayer = {
      '@id': 'https://api.chess.com/pub/player/testuser',
      url: 'https://www.chess.com/member/testuser',
      username: 'testuser',
      player_id: 12345,
      title: 'GM',
      status: 'basic',
      name: 'Test User',
      avatar: 'https://example.com/avatar.jpg',
      location: 'New York',
      country: 'US',
      joined: 1000000000,
      last_online: Math.floor(Date.now() / 1000) - 3600,
      followers: 1000,
      is_streamer: false,
      verified: false,
      streaming_platforms: [],
      fide: 2500,
    };

    vi.mocked(api.fetchPlayer).mockResolvedValue(mockPlayer);

    render(<GrandmasterProfile />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    expect(screen.getByText('@testuser')).toBeInTheDocument();
    expect(screen.getByText('GM')).toBeInTheDocument();
    expect(screen.getByText('US')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    // toLocaleString() formats numbers, so 1000 becomes "1,000" in most locales
    expect(screen.getByText(/1[,.]000/)).toBeInTheDocument();
  });

  it('displays error state', async () => {
    const mockError = new Error('Player not found');
    vi.mocked(api.fetchPlayer).mockRejectedValue(mockError);

    render(<GrandmasterProfile />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Error loading player profile')).toBeInTheDocument();
    });

    expect(screen.getByText('Player not found')).toBeInTheDocument();
  });

  it('renders back link', async () => {
    const mockPlayer = {
      '@id': 'https://api.chess.com/pub/player/testuser',
      url: 'https://www.chess.com/member/testuser',
      username: 'testuser',
      player_id: 12345,
      status: 'basic',
      name: 'Test User',
      country: 'US',
      joined: 1000000000,
      last_online: Math.floor(Date.now() / 1000),
      followers: 0,
      is_streamer: false,
      verified: false,
      fide: 0,
      streaming_platforms: [],
    };

    vi.mocked(api.fetchPlayer).mockResolvedValue(mockPlayer);

    render(<GrandmasterProfile />, { wrapper: createWrapper() });

    await waitFor(() => {
      const backLink = screen.getByText('← Back to Grandmasters List');
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute('href', '/');
    });
  });

  it('does not display streaming platforms section when there are no platforms', async () => {
    const mockPlayer = {
      '@id': 'https://api.chess.com/pub/player/testuser',
      url: 'https://www.chess.com/member/testuser',
      username: 'testuser',
      player_id: 12345,
      status: 'basic',
      name: 'Test User',
      country: 'US',
      joined: 1000000000,
      last_online: Math.floor(Date.now() / 1000),
      followers: 1000,
      is_streamer: false,
      verified: false,
      streaming_platforms: [],
    };

    vi.mocked(api.fetchPlayer).mockResolvedValue(mockPlayer);

    render(<GrandmasterProfile />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    expect(screen.queryByText('Streaming Platforms')).not.toBeInTheDocument();
  });

  it('displays streaming platforms section with one platform', async () => {
    const mockPlayer = {
      '@id': 'https://api.chess.com/pub/player/testuser',
      url: 'https://www.chess.com/member/testuser',
      username: 'testuser',
      player_id: 12345,
      status: 'basic',
      name: 'Test User',
      country: 'US',
      joined: 1000000000,
      last_online: Math.floor(Date.now() / 1000),
      followers: 1000,
      is_streamer: true,
      verified: false,
      streaming_platforms: [
        {
          type: 'twitch',
          channel_url: 'https://twitch.tv/gmmarkusragger',
        },
      ],
    };

    vi.mocked(api.fetchPlayer).mockResolvedValue(mockPlayer);

    render(<GrandmasterProfile />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Streaming Platforms')).toBeInTheDocument();
    });

    const platformLink = screen.getByText('Twitch');
    expect(platformLink).toBeInTheDocument();
    expect(platformLink).toHaveAttribute('href', 'https://twitch.tv/gmmarkusragger');
    expect(platformLink).toHaveAttribute('target', '_blank');
    expect(platformLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(platformLink).toHaveAttribute('title', 'https://twitch.tv/gmmarkusragger');
  });

  it('displays streaming platforms section with multiple platforms', async () => {
    const mockPlayer = {
      '@id': 'https://api.chess.com/pub/player/testuser',
      url: 'https://www.chess.com/member/testuser',
      username: 'testuser',
      player_id: 12345,
      status: 'basic',
      name: 'Test User',
      country: 'US',
      joined: 1000000000,
      last_online: Math.floor(Date.now() / 1000),
      followers: 1000,
      is_streamer: true,
      verified: false,
      streaming_platforms: [
        {
          type: 'twitch',
          channel_url: 'https://twitch.tv/gmmarkusragger',
        },
        {
          type: 'youtube',
          channel_url: 'https://youtube.com/@testuser',
        },
        {
          type: 'kick',
          channel_url: 'https://kick.com/testuser',
        },
      ],
    };

    vi.mocked(api.fetchPlayer).mockResolvedValue(mockPlayer);

    render(<GrandmasterProfile />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Streaming Platforms')).toBeInTheDocument();
    });

    // Check all platforms are displayed with formatted labels
    const twitchLink = screen.getByText('Twitch');
    expect(twitchLink).toBeInTheDocument();
    expect(twitchLink).toHaveAttribute('href', 'https://twitch.tv/gmmarkusragger');

    const youtubeLink = screen.getByText('Youtube');
    expect(youtubeLink).toBeInTheDocument();
    expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com/@testuser');

    const kickLink = screen.getByText('Kick');
    expect(kickLink).toBeInTheDocument();
    expect(kickLink).toHaveAttribute('href', 'https://kick.com/testuser');

    // Verify all links have proper attributes
    for (const link of [twitchLink, youtubeLink, kickLink]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});
