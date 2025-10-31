import type { GrandmastersResponse, PlayerData } from '@/types/chess';
import axios, { isAxiosError } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from './api.constants';

const chessApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

export class ChessAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'ChessAPIError';
  }
}

export const fetchGrandmasters = async (): Promise<GrandmastersResponse> => {
  try {
    const response = await chessApi.get<GrandmastersResponse>('/titled/GM');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new ChessAPIError(
        error.response?.status === 404
          ? 'Grandmasters list not found'
          : 'Failed to fetch grandmasters',
        error.response?.status,
        error
      );
    }
    throw error;
  }
};

export const fetchPlayer = async (username: string): Promise<PlayerData> => {
  try {
    const response = await chessApi.get<PlayerData>(`/player/${username}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new ChessAPIError(
        error.response?.status === 404
          ? `Player "${username}" not found`
          : 'Failed to fetch player data',
        error.response?.status,
        error
      );
    }
    throw error;
  }
};
