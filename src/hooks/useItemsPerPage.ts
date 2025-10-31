import { useEffect, useState } from 'react';
import { calculateItemsPerPage } from './useItemsPerPage/useItemsPerPage.utils';
import { useMediaQuery } from './useMediaQuery';

export function useItemsPerPage(): number {
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [itemsPerPage, setItemsPerPage] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return calculateItemsPerPage(window.innerHeight, isDesktop, isTablet);
    }
    return isDesktop ? 21 : isTablet ? 14 : 10;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const calculate = () => {
      const newItemsPerPage = calculateItemsPerPage(window.innerHeight, isDesktop, isTablet);
      setItemsPerPage(newItemsPerPage);
    };

    calculate();

    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, [isDesktop, isTablet]);

  return itemsPerPage;
}
