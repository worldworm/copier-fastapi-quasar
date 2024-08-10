export function sortByStr(sortBy: string, descending: boolean): string {
  if (!sortBy) return "";
  const sortOrder = descending ? "desc" : "asc";
  return `&sort=${sortBy}:${sortOrder}`;
}

export function pageSizeStr(size: number): string {
  if (size <= 0) return "";
  return `&size=${size}`;
}

export function filterStr(key: string, filter: string): string {
  if (!filter) return "";
  const wildcard = encodeURIComponent("%");
  return `&filter=${key}:${wildcard}${encodeURIComponent(filter.trim())}${wildcard}`;
}

export function fullParamsStr(page: number, size: number, sortBy: string, descending: boolean, filterKey: string, filter: string): string {
  return `?page=${page - 1}${pageSizeStr(size)}${sortByStr(sortBy, descending)}${filterStr(filterKey, filter)}`;
}
