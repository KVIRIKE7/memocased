import { type Show, type UserShow } from '../types';

interface ShowItemProps {
  userShow: UserShow;
  show: Show;
}

function renderStars(rating: number | null): string {
  if (rating === null) return '';
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  return '★'.repeat(full) + (half ? '½' : '');
}

const STATUS_LABEL: Record<string, string> = {
  watching:  'Watching',
  completed: 'Completed',
  dropped:   'Dropped',
  watchlist: 'Watchlist',
};

export default function ShowItem({ userShow, show }: ShowItemProps) {
  const isLoading = show.posterUrl === '';
  const progress  = Math.min(100, Math.round((userShow.episodesWatched / show.totalEpisodes) * 100));
  const remaining = show.totalEpisodes - userShow.episodesWatched;

  return (
    <div className="show-card">

      {/* Left: wide poster */}
      <div className="show-card-poster">
        {isLoading ? (
          <div className="poster-loading" />
        ) : show.posterUrl ? (
          <img src={show.posterUrl} alt={show.title} />
        ) : (
          <div className="poster-placeholder">
            <span className="poster-title">{show.title}</span>
          </div>
        )}
        {/* Gradient bleed into info panel */}
        <div className="show-card-poster-fade" />
      </div>

      {/* Right: info */}
      <div className="show-card-info">
        <div className="show-card-top">
          <div className="show-card-title-row">
            <span className="show-card-title">{show.title}</span>
            {userShow.liked && <span className="show-card-heart">♥</span>}
          </div>
          <div className="show-card-genres">{show.genres.slice(0, 2).join(' · ')}</div>
        </div>

        <div className="show-card-mid">
          <span className={`show-card-status show-card-status--${userShow.status}`}>
            {STATUS_LABEL[userShow.status]}
          </span>
          {userShow.currentSeason !== null && userShow.currentEpisode !== null && (
            <span className="show-card-episode">
              S{String(userShow.currentSeason).padStart(2,'0')} · E{String(userShow.currentEpisode).padStart(2,'0')}
            </span>
          )}
          {userShow.rating !== null && (
            <span className="show-card-stars">{renderStars(userShow.rating)}</span>
          )}
        </div>

        <div className="show-card-bottom">
          <div className="show-card-bar-track">
            <div className="show-card-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="show-card-bar-labels">
            <span>{userShow.episodesWatched} / {show.totalEpisodes} eps</span>
            {userShow.status === 'watching' && remaining > 0 && (
              <span>{remaining} left</span>
            )}
            {userShow.status === 'completed' && (
              <span className="show-card-complete">100%</span>
            )}
            {userShow.status === 'dropped' && (
              <span className="show-card-dropped">{progress}%</span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
