import { useState, useEffect, useCallback } from 'react';
import { fetchPopularShows, getPosterUrl, type TmdbPopularShow } from '../services/tmdb';

export interface BrowseShow {
  tmdbId: number;
  title: string;
  year: string;
  posterUrl: string;
  genreIds: number[];
  rating: number;
  voteCount: number;
  overview: string;
}

function mapShow(s: TmdbPopularShow): BrowseShow {
  return {
    tmdbId:   s.id,
    title:    s.name,
    year:     s.first_air_date ? s.first_air_date.slice(0, 4) : '—',
    posterUrl: getPosterUrl(s.poster_path, 'w342'),
    genreIds:  s.genre_ids,
    rating:    Math.round(s.vote_average * 10) / 10,
    voteCount: s.vote_count,
    overview:  s.overview,
  };
}

export function useTmdbBrowse() {
  const [shows, setShows]           = useState<BrowseShow[]>([]);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(false);

  const load = useCallback(async (p: number) => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchPopularShows(p);
      if (!data) throw new Error('no data');
      setTotalPages(data.total_pages);
      setShows(data.results.map(mapShow));
      setPage(p);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load first page on mount
  useEffect(() => { load(1); }, [load]);

  const goTo     = (p: number) => load(p);
  const nextPage = () => { if (page < totalPages) load(page + 1); };
  const prevPage = () => { if (page > 1)          load(page - 1); };

  return { shows, page, totalPages, loading, error, goTo, nextPage, prevPage };
}
