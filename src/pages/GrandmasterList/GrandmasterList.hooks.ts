import { useEffect, useMemo, useState } from 'react';

export function usePagination<T>(items: T[], pageSize: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.ceil(items.length / pageSize);
  }, [items.length, pageSize]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reset page when items or pageSize changes
  useEffect(() => {
    setCurrentPage(1);
  }, [items, pageSize]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, pageSize]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.max(1, prev - 1);
      if (newPage !== prev) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return newPage;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      const newPage = Math.min(totalPages, prev + 1);
      if (newPage !== prev) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return newPage;
    });
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    handlePreviousPage,
    handleNextPage,
    handlePageClick,
  };
}
