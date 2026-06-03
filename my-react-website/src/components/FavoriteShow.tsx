import { type Show } from '../types';

interface FavoriteShowProps {
  show: Show;
}

export default function FavoriteShow({ show }: FavoriteShowProps) {
  // posterUrl is '' while loading (hook hasn't resolved yet), null means "no poster found"
  const isLoading = show.posterUrl === '';

  return (
    <div className="favorite-show" title={show.title}>
      {isLoading ? (
        <div className="poster-loading" />
      ) : show.posterUrl ? (
        <img src={show.posterUrl} alt={show.title} />
      ) : (
        <div className="poster-placeholder">
          <span className="poster-title">{show.title}</span>
          <span className="poster-year">{show.year}</span>
        </div>
      )}
    </div>
  );
}
