export interface IQueryData {
  [key: string]: string;
}

export function getQueryString(query: IQueryData): string {
  const params = Object.keys(query).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);

  return params.length > 0 ? `?${params.join('&')}` : '';
}
