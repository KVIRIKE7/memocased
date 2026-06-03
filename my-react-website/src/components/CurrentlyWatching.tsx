import { type Show, type UserShow } from '../types';

interface CurrentlyWatchingProps {
  userShow: UserShow;
  show: Show;
}

function renderStars(rating: number | null): string {
  if (rating === null) return '';
  const full  = Math.floor(rating);
  const half  = rating % 1 !== 0;
  return '★'.repeat(full) + (half ? '½' : '');
}

export default function CurrentlyWatching({ userShow, show }: CurrentlyWatchingProps) {
  const progress = Math.round((userShow.episodesWatched / show.totalEpisodes) * 100);
  const isLoading = show.posterUrl === '';

  return (
    <div className="currently-watching-card">
      <div className="cw-poster">
        {isLoading ? (
          <div className="poster-loading" />
        ) : show.posterUrl ? (
          <img src={show.posterUrl} alt={show.title} />
        ) : (
          <div className="poster-placeholder">
            <span className="poster-title">{show.title}</span>
          </div>
        )}
      </div>

      <div className="cw-info">
        <div className="cw-title">{show.title}</div>
        <div className="cw-meta">
          {show.year} &middot; {show.genres[0]}
        </div>
        {userShow.currentSeason !== null && userShow.currentEpisode !== null && (
          <div className="cw-episode">
            Season {userShow.currentSeason} &middot; Episode {userShow.currentEpisode}
          </div>
        )}
        <div className="cw-progress-wrap">
          <div className="cw-progress-bar">
            <div className="cw-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="cw-progress-label">
            {userShow.episodesWatched}/{show.totalEpisodes} eps
          </span>
        </div>
        {userShow.rating !== null && (
          <div className="cw-rating">{renderStars(userShow.rating)}</div>
        )}
      </div>
    </div>
  );
}
