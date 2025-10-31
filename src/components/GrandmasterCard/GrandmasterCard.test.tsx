import * as api from '@/services/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GrandmasterCard } from './GrandmasterCard';

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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BrowserRouter>
  );
};

describe('GrandmasterCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders username when no name is provided', async () => {
    vi.mocked(api.fetchPlayer).mockResolvedValue({
      '@id': 'test',
      url: 'https://chess.com/test',
      username: 'testuser',
      player_id: 1,
      status: 'active',
      country: 'US',
      joined: 1000000000,
      last_online: 1000000000,
      followers: 1000,
      is_streamer: false,
      verified: false,
      streaming_platforms: [],
    });

    render(<GrandmasterCard username="testuser" />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });
  });

  it('renders name when provided instead of username', async () => {
    vi.mocked(api.fetchPlayer).mockResolvedValue({
      '@id': 'test',
      url: 'https://chess.com/test',
      username: 'testuser',
      name: 'Test User',
      player_id: 1,
      status: 'active',
      country: 'US',
      joined: 1000000000,
      last_online: 1000000000,
      followers: 1000,
      is_streamer: false,
      verified: false,
      streaming_platforms: [],
    });

    render(<GrandmasterCard username="testuser" />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
    expect(screen.queryByText('testuser')).not.toBeInTheDocument();
  });

  it('renders avatar with first letter of username when no avatar image', async () => {
    vi.mocked(api.fetchPlayer).mockResolvedValue({
      '@id': 'test',
      url: 'https://chess.com/test',
      username: 'testuser',
      player_id: 1,
      status: 'active',
      country: 'US',
      joined: 1000000000,
      last_online: 1000000000,
      followers: 1000,
      is_streamer: false,
      verified: false,
      streaming_platforms: [],
    });

    render(<GrandmasterCard username="testuser" />, { wrapper: createWrapper() });

    await waitFor(() => {
      const avatar = screen.getByText('T');
      expect(avatar).toBeInTheDocument();
    });
  });

  it('renders avatar image when provided', async () => {
    vi.mocked(api.fetchPlayer).mockResolvedValue({
      '@id': 'test',
      url: 'https://chess.com/test',
      username: 'testuser',
      name: 'Test User',
      avatar: 'https://example.com/avatar.jpg',
      player_id: 1,
      status: 'active',
      country: 'US',
      joined: 1000000000,
      last_online: 1000000000,
      followers: 1000,
      is_streamer: false,
      verified: false,
      streaming_platforms: [],
    });

    render(<GrandmasterCard username="testuser" />, { wrapper: createWrapper() });

    await waitFor(() => {
      const avatarImage = screen.getByAltText('Test User');
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });
  });

  it('links to correct profile page', async () => {
    vi.mocked(api.fetchPlayer).mockResolvedValue({
      '@id': 'test',
      url: 'https://chess.com/test',
      username: 'testuser',
      player_id: 1,
      status: 'active',
      country: 'US',
      joined: 1000000000,
      last_online: 1000000000,
      followers: 1000,
      is_streamer: false,
      verified: false,
      streaming_platforms: [],
    });

    render(<GrandmasterCard username="testuser" />, { wrapper: createWrapper() });

    await waitFor(() => {
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/player/testuser');
    });
  });

  it('displays player ID when available', async () => {
    vi.mocked(api.fetchPlayer).mockResolvedValue({
      '@id': 'test',
      url: 'https://chess.com/test',
      username: 'testuser',
      player_id: 12345,
      status: 'active',
      country: 'US',
      joined: 1000000000,
      last_online: 1000000000,
      followers: 1000,
      is_streamer: false,
      verified: false,
      streaming_platforms: [],
    });

    render(<GrandmasterCard username="testuser" />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('ID: 12345')).toBeInTheDocument();
    });
  });

  it('does not display player ID when not available', async () => {
    vi.mocked(api.fetchPlayer).mockResolvedValue({
      '@id': 'test',
      url: 'https://chess.com/test',
      username: 'testuser',
      status: 'active',
      country: 'US',
      joined: 1000000000,
      last_online: 1000000000,
      followers: 1000,
      is_streamer: false,
      verified: false,
      streaming_platforms: [],
    });

    render(<GrandmasterCard username="testuser" />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });
    expect(screen.queryByText(/ID:/)).not.toBeInTheDocument();
  });

  it('displays verified badge when player is verified', async () => {
    vi.mocked(api.fetchPlayer).mockResolvedValue({
      '@id': 'test',
      url: 'https://chess.com/test',
      username: 'testuser',
      player_id: 1,
      status: 'active',
      country: 'US',
      joined: 1000000000,
      last_online: 1000000000,
      followers: 1000,
      is_streamer: false,
      verified: true,
      streaming_platforms: [],
    });

    render(<GrandmasterCard username="testuser" />, { wrapper: createWrapper() });

    await waitFor(() => {
      const badge = screen.getByTitle('Verified');
      expect(badge).toBeInTheDocument();
    });
  });

  it('displays streamer badge when player is a streamer', async () => {
    vi.mocked(api.fetchPlayer).mockResolvedValue({
      '@id': 'test',
      url: 'https://chess.com/test',
      username: 'testuser',
      player_id: 1,
      status: 'active',
      country: 'US',
      joined: 1000000000,
      last_online: 1000000000,
      followers: 1000,
      is_streamer: true,
      verified: false,
      streaming_platforms: [],
    });

    render(<GrandmasterCard username="testuser" />, { wrapper: createWrapper() });

    await waitFor(() => {
      const badge = screen.getByTitle('Streamer');
      expect(badge).toBeInTheDocument();
    });
  });
});
