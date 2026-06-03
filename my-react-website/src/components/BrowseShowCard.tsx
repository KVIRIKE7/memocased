import { type BrowseShow } from '../hooks/useTmdbBrowse';
import { GENRE_MAP } from '../services/tmdb';

interface BrowseShowCardProps {
  show: BrowseShow;
}

export default function BrowseShowCard({ show }: BrowseShowCardProps) {
  const genres = show.genreIds.slice(0, 2).map(id => GENRE_MAP[id] ?? 'Unknown');
  const stars  = Math.round(show.rating / 2); // TMDB is /10, show /5

  return (
    <div className="show-card browse-card">
      {/* Poster */}
      <div className="show-card-poster">
        {show.posterUrl ? (
          <img src={show.posterUrl} alt={show.title} />
        ) : (
          <div className="poster-placeholder">
            <span className="poster-title">{show.title}</span>
          </div>
        )}
        <div className="show-card-poster-fade" />
      </div>

      {/* Info */}
      <div className="show-card-info">
        <div className="show-card-top">
          <div className="show-card-title-row">
            <span className="show-card-title">{show.title}</span>
          </div>
          <div className="show-card-genres">{genres.join(' · ') || 'General'}</div>
        </div>

        <div className="show-card-mid">
          <span className="browse-year-badge">{show.year}</span>
          {show.rating > 0 && (
            <span className="browse-rating" title={`${show.rating}/10 (${show.voteCount.toLocaleString()} votes)`}>
              {'★'.repeat(stars)}{'☆'.repeat(Math.max(0, 5 - stars))} {show.rating}
            </span>
          )}
        </div>

        {show.overview && (
          <p className="browse-overview">{show.overview}</p>
        )}
      </div>
    </div>
  );
}
