import type { PlayerData } from '@/types/chess';

export interface ProfileHeaderProps {
  data: PlayerData;
}

export interface StatItemProps {
  label: string;
  value: React.ReactNode;
}

export interface BooleanStatProps {
  label: string;
  value: boolean;
}
