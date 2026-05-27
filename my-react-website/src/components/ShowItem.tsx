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

export default function ShowItem({ userShow, show }: ShowItemProps) {
  return (
    <div className="show-item">
      <div className="show-item-poster">
        {show.posterUrl ? (
          <img src={show.posterUrl} alt={show.title} />
        ) : (
          <div className="poster-placeholder">
            <span className="poster-title">{show.title}</span>
          </div>
        )}
        {userShow.liked && <span className="show-item-heart">♥</span>}
      </div>
      <div className="show-item-info">
        <div className="show-item-title">{show.title}</div>
        <div className="show-item-year">{show.year}</div>
        {userShow.rating !== null && (
          <div className="show-item-stars">{renderStars(userShow.rating)}</div>
        )}
        <div className={`show-item-status show-item-status--${userShow.status}`}>
          {userShow.status}
        </div>
      </div>
    </div>
  );
}
