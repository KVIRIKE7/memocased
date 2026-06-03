import { useState, useEffect } from 'react';
import { searchShow, getPosterUrl, type PosterSize } from '../services/tmdb';
import type { Show } from '../types';

// Cache across renders so we don't re-fetch on tab switches
const posterCache = new Map<number, string>();

export function useTmdbPosters(shows: Show[], size: PosterSize = 'w342') {
  const [posters, setPosters] = useState<Record<number, string>>(() => {
    // Seed from cache on first render
    const initial: Record<number, string> = {};
    shows.forEach(s => {
      if (posterCache.has(s.id)) initial[s.id] = posterCache.get(s.id)!;
    });
    return initial;
  });

  useEffect(() => {
    const missing = shows.filter(s => !posterCache.has(s.id));
    if (missing.length === 0) return;

    let cancelled = false;

    (async () => {
      await Promise.all(
        missing.map(async (show) => {
          try {
            const result = await searchShow(show.title, show.year);
            const url = result?.poster_path ? getPosterUrl(result.poster_path, size) : '';
            posterCache.set(show.id, url);
            if (!cancelled) {
              setPosters(prev => ({ ...prev, [show.id]: url }));
            }
          } catch {
            posterCache.set(show.id, '');
          }
        })
      );
    })();

    return () => { cancelled = true; };
  }, [shows, size]);

  return posters;
}
