import { type Show } from '../types';

interface FavoriteShowProps {
  show: Show;
}

export default function FavoriteShow({ show }: FavoriteShowProps) {
  return (
    <div className="favorite-show" title={show.title}>
      {show.posterUrl ? (
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
