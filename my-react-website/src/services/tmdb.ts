const TMDB_API_KEY   = '8b36f3468cf78d7fae1fee4d8e05eaba';
const TMDB_BASE_URL  = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p';

export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';

export function getPosterUrl(path: string | null, size: PosterSize = 'w342'): string {
  if (!path) return '';
  return `${TMDB_IMAGE_URL}/${size}${path}`;
}

export interface TmdbShow {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  genre_ids: number[];
  number_of_episodes?: number;
}

export async function searchShow(title: string, year: number): Promise<TmdbShow | null> {
  const params = new URLSearchParams({
    api_key: TMDB_API_KEY,
    query: title,
    first_air_date_year: String(year),
  });
  const res = await fetch(`${TMDB_BASE_URL}/search/tv?${params}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.results?.[0] ?? null;
}

export async function getShowDetails(tmdbId: number): Promise<TmdbShow | null> {
  const params = new URLSearchParams({ api_key: TMDB_API_KEY });
  const res = await fetch(`${TMDB_BASE_URL}/tv/${tmdbId}?${params}`);
  if (!res.ok) return null;
  return res.json();
}

export interface TmdbPopularShow {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  overview: string;
  origin_country: string[];
}

export interface TmdbPopularResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: TmdbPopularShow[];
}

export async function fetchPopularShows(page: number = 1): Promise<TmdbPopularResult | null> {
  const params = new URLSearchParams({ api_key: TMDB_API_KEY, page: String(page) });
  const res = await fetch(`${TMDB_BASE_URL}/tv/popular?${params}`);
  if (!res.ok) return null;
  return res.json();
}

// TMDB genre ID → name map for TV
export const GENRE_MAP: Record<number, string> = {
  10759: 'Action & Adventure',
  16:    'Animation',
  35:    'Comedy',
  80:    'Crime',
  99:    'Documentary',
  18:    'Drama',
  10751: 'Family',
  10762: 'Kids',
  9648:  'Mystery',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
  37:    'Western',
};
