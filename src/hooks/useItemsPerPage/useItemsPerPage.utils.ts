import {
  DESKTOP_CARD_HEIGHT,
  DESKTOP_COLUMNS,
  DESKTOP_CONTAINER_PADDING,
  DESKTOP_GRID_GAP,
  DESKTOP_HEADER_HEIGHT,
  DESKTOP_MAX_ITEMS,
  DESKTOP_MIN_ITEMS,
  DESKTOP_PAGINATION_HEIGHT,
  MOBILE_CARD_HEIGHT,
  MOBILE_COLUMNS,
  MOBILE_CONTAINER_PADDING,
  MOBILE_GRID_GAP,
  MOBILE_HEADER_HEIGHT,
  MOBILE_MAX_ITEMS,
  MOBILE_MIN_ITEMS,
  MOBILE_PAGINATION_HEIGHT,
  TABLET_CARD_HEIGHT,
  TABLET_COLUMNS,
  TABLET_CONTAINER_PADDING,
  TABLET_GRID_GAP,
  TABLET_HEADER_HEIGHT,
  TABLET_MAX_ITEMS,
  TABLET_MIN_ITEMS,
  TABLET_PAGINATION_HEIGHT,
} from './useItemsPerPage.constants';

interface LayoutConfig {
  columns: number;
  cardHeight: number;
  gridGap: number;
  headerHeight: number;
  paginationHeight: number;
  containerPadding: number;
  minItems: number;
  maxItems: number;
}

function getLayoutConfig(isDesktop: boolean, isTablet: boolean): LayoutConfig {
  if (isDesktop) {
    return {
      columns: DESKTOP_COLUMNS,
      cardHeight: DESKTOP_CARD_HEIGHT,
      gridGap: DESKTOP_GRID_GAP,
      headerHeight: DESKTOP_HEADER_HEIGHT,
      paginationHeight: DESKTOP_PAGINATION_HEIGHT,
      containerPadding: DESKTOP_CONTAINER_PADDING,
      minItems: DESKTOP_MIN_ITEMS,
      maxItems: DESKTOP_MAX_ITEMS,
    };
  }

  if (isTablet) {
    return {
      columns: TABLET_COLUMNS,
      cardHeight: TABLET_CARD_HEIGHT,
      gridGap: TABLET_GRID_GAP,
      headerHeight: TABLET_HEADER_HEIGHT,
      paginationHeight: TABLET_PAGINATION_HEIGHT,
      containerPadding: TABLET_CONTAINER_PADDING,
      minItems: TABLET_MIN_ITEMS,
      maxItems: TABLET_MAX_ITEMS,
    };
  }

  return {
    columns: MOBILE_COLUMNS,
    cardHeight: MOBILE_CARD_HEIGHT,
    gridGap: MOBILE_GRID_GAP,
    headerHeight: MOBILE_HEADER_HEIGHT,
    paginationHeight: MOBILE_PAGINATION_HEIGHT,
    containerPadding: MOBILE_CONTAINER_PADDING,
    minItems: MOBILE_MIN_ITEMS,
    maxItems: MOBILE_MAX_ITEMS,
  };
}

export function calculateItemsPerPage(
  windowHeight: number,
  isDesktop: boolean,
  isTablet: boolean
): number {
  const config = getLayoutConfig(isDesktop, isTablet);

  const availableHeight =
    windowHeight - config.headerHeight - config.paginationHeight - config.containerPadding;

  const rows = Math.floor(
    (availableHeight + config.gridGap) / (config.cardHeight + config.gridGap)
  );

  const visibleRows = Math.max(1, rows);
  const items = visibleRows * config.columns;

  return Math.max(config.minItems, Math.min(config.maxItems, items));
}
