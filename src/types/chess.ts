export interface Grandmaster {
  username: string;
}

export interface GrandmastersResponse {
  players: string[];
}

export interface PlayerStats {
  rating: number;
  date: number;
  rd: number;
}

export interface StreamingPlatform {
  type: string;
  channel_url: string;
}

export interface PlayerData {
  '@id': string;
  url: string;
  username: string;
  player_id?: number;
  title?: string;
  status: string;
  country: string;
  joined: number;
  last_online: number;
  followers: number;
  is_streamer: boolean;
  verified: boolean;
  league?: string;
  streaming_platforms: StreamingPlatform[];
  name?: string;
  avatar?: string;
  location?: string;
  twitch_url?: string;
  fide?: number;
}
