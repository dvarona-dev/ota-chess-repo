import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://chess-grandmasters-wiki.com';
const DEFAULT_TITLE = 'Chess Grandmasters Wiki | Explore Top Chess Players';
const DEFAULT_DESCRIPTION =
  "Discover and explore profiles of Chess.com Grandmasters. View stats, ratings, and information about the world's top chess players.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`; // You can create an OG image later
const DEFAULT_KEYWORDS =
  'chess, grandmaster, chess.com, chess players, chess profiles, FIDE rating, chess wiki';

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | Chess Grandmasters Wiki` : DEFAULT_TITLE;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Chess Grandmasters Wiki" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Chess Grandmasters Wiki" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}
