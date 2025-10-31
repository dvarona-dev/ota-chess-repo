export function getVisiblePages(currentPage: number, totalPages: number): number[] {
  return Array.from({ length: totalPages }, (_, i) => i + 1).filter((page) => {
    if (page === 1 || page === totalPages) return true;
    if (Math.abs(page - currentPage) <= 1) return true;
    return false;
  });
}

export function shouldShowEllipsis(prevPage: number | undefined, currentPage: number): boolean {
  if (!prevPage) return false;
  return currentPage - prevPage > 1;
}

export function filterUsernames(usernames: string[], searchTerm: string): string[] {
  const normalizedSearch = searchTerm.toLowerCase().trim();

  if (!normalizedSearch) {
    return usernames;
  }

  return usernames.filter((username) => username.toLowerCase().includes(normalizedSearch));
}
