import type { PlayerData } from '@/types/chess';

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString();
}

export function formatStatus(status: string): string {
  if (!status) return 'Unknown';
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}

export function formatPlatformType(type: string): string {
  if (!type) return '';
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
}

export function buildSEOData(data: PlayerData) {
  const playerName = data.name || data.username;
  const title = `${playerName} - Chess Grandmaster Profile`;

  const descriptionParts = [
    `${playerName} (${data.username}) is a Chess.com Grandmaster`,
    data.country ? ` from ${data.country}` : '',
    data.fide ? `. FIDE Rating: ${data.fide}. ` : '',
    data.followers ? `Followers: ${data.followers.toLocaleString()}. ` : '',
    'View profile, stats, and more information.',
  ];
  const description = descriptionParts.join('');

  const keywords = [
    data.username,
    'chess grandmaster',
    data.name || '',
    data.country || '',
    'chess.com profile',
    'FIDE rating',
    data.fide ? data.fide.toString() : '',
  ]
    .filter(Boolean)
    .join(', ');

  return {
    title,
    description,
    keywords,
    image: data.avatar || undefined,
    url: `/player/${data.username}`,
  };
}

export function buildStructuredData(data: PlayerData) {
  const playerName = data.name || data.username;
  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: playerName,
    alternateName: data.username,
    url: data.url,
    jobTitle: data.title || 'Chess Grandmaster',
  };

  if (data.player_id !== undefined) {
    structuredData.identifier = data.player_id.toString();
  }

  if (data.country) {
    structuredData.address = {
      '@type': 'PostalAddress',
      addressCountry: data.country,
      ...(data.location && { addressLocality: data.location }),
    };
  }

  if (data.fide) {
    structuredData.knowsAbout = 'Chess';
    structuredData.additionalProperty = {
      '@type': 'PropertyValue',
      name: 'FIDE Rating',
      value: data.fide.toString(),
    };
  }

  if (data.avatar) {
    structuredData.image = data.avatar;
  }

  const sameAs = [
    data.url,
    ...(data.twitch_url ? [data.twitch_url] : []),
    ...(data.streaming_platforms?.map((p) => p.channel_url) || []),
  ].filter(Boolean);

  structuredData.sameAs = sameAs;

  return structuredData;
}
