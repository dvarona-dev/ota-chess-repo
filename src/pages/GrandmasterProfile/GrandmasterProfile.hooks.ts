import { fetchPlayer } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY_PREFIX } from './GrandmasterProfile.constants';

export function usePlayerQuery(username: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY_PREFIX, username],
    queryFn: () => {
      if (!username) {
        throw new Error('Username is required');
      }
      return fetchPlayer(username);
    },
    enabled: !!username,
  });
}
