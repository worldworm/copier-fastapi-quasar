export function sortByStr(sortBy: string, descending: boolean): string {
  if (!sortBy) return "";
  const sortOrder = descending ? "desc" : "asc";
  return `&sort=${sortBy}:${sortOrder}`;
}

export function pageSizeStr(size: number): string {
  if (size <= 0) return "";
  return `&size=${size}`;
}

export function filterStr(filter: Record<string, string | null> | null): string {
  if (!filter) return "";
  //const wildcard = encodeURIComponent("%");
  const wildcard = "";
  return (
    Object.entries(filter)
      .filter(([, value]) => value !== null)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map(([key, value]) => `&filter=${key}:${wildcard}${encodeURIComponent(value!.trim())}${wildcard}`)
      .join("")
  );
}

export function fullParamsStr(page: number, size: number, sortBy: string, descending: boolean, filter: Record<string, string | null> | null): string {
  return `?page=${page - 1}${pageSizeStr(size)}${sortByStr(sortBy, descending)}${filterStr(filter)}`;
}
