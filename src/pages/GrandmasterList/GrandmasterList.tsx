import { CardSkeleton } from '@/components/CardSkeleton';
import { GrandmasterCard } from '@/components/GrandmasterCard';
import { SEO } from '@/components/SEO';
import { useDebounce } from '@/hooks/useDebounce';
import { useItemsPerPage } from '@/hooks/useItemsPerPage';
import { fetchGrandmasters } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { QUERY_KEY } from './GrandmasterList.constants';
import { usePagination } from './GrandmasterList.hooks';
import styles from './GrandmasterList.module.css';
import { filterUsernames, getVisiblePages, shouldShowEllipsis } from './GrandmasterList.utils';

export function GrandmasterList() {
  const pageSize = useItemsPerPage();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchGrandmasters,
  });

  const usernames = data?.players ?? [];

  const players = useMemo(() => {
    return filterUsernames(usernames, debouncedSearchTerm);
  }, [usernames, debouncedSearchTerm]);

  const {
    currentPage,
    totalPages,
    paginatedData,
    handlePreviousPage,
    handleNextPage,
    handlePageClick,
  } = usePagination(players, pageSize);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Chess Grandmasters</h1>
          <p className={styles.subtitle}>Loading grandmasters...</p>
        </header>
        <div className={styles.grid}>
          {Array.from({ length: pageSize }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton loaders won't reorder
            <CardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error loading grandmasters</h2>
          <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
        </div>
      </div>
    );
  }

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://chess-grandmasters-wiki.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Chess Grandmasters Wiki',
    description:
      "A comprehensive directory of Chess.com Grandmasters. Explore profiles, stats, and information about the world's top chess players.",
    url: siteUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: players.length,
      itemListElement: players.slice(0, 50).map((username, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Person',
          name: username,
          url: `${siteUrl}/player/${username}`,
        },
      })),
    },
  };

  return (
    <>
      <SEO
        title="Chess Grandmasters Directory"
        description={`Browse ${players.length} Chess.com Grandmasters. Search and explore profiles of the world's top chess players with ratings, stats, and more.`}
        keywords="chess grandmasters list, chess.com grandmasters, top chess players, chess directory, GM list"
        url="/"
        structuredData={structuredData}
      />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Chess Grandmasters</h1>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              aria-label="Search grandmasters by username"
            />
          </div>
          <p className={styles.subtitle}>
            {players.length} Grandmaster{players.length !== 1 ? 's' : ''}
            {debouncedSearchTerm.trim() && ' found'}
            {totalPages > 1 && (
              <span className={styles.pageInfo}>
                {' '}
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </p>
        </header>
        <div className={styles.grid}>
          {paginatedData.length > 0 ? (
            paginatedData.map((username) => <GrandmasterCard key={username} username={username} />)
          ) : (
            <div className={styles.noResults}>
              <p>No grandmasters found matching &quot;{debouncedSearchTerm}&quot;</p>
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.paginationButton}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ←
            </button>
            <div className={styles.pageNumbers}>
              {getVisiblePages(currentPage, totalPages).map((page, index, array) => {
                const prevPage = array[index - 1];
                const showEllipsis = shouldShowEllipsis(prevPage, page);

                return (
                  <div key={page} className={styles.pageNumberGroup}>
                    {showEllipsis && <span className={styles.ellipsis}>...</span>}
                    <button
                      type="button"
                      className={`${styles.pageNumber} ${
                        currentPage === page ? styles.pageNumberActive : ''
                      }`}
                      onClick={() => handlePageClick(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              className={styles.paginationButton}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
