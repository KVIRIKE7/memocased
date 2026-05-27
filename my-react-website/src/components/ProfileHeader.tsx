import { type User, type UserShow } from '../types';

interface ProfileHeaderProps {
  user: User;
  userShows: UserShow[];
}

export default function ProfileHeader({ user, userShows }: ProfileHeaderProps) {
  const completed = userShows.filter(us => us.status === 'completed').length;
  const watching  = userShows.filter(us => us.status === 'watching').length;
  const dropped   = userShows.filter(us => us.status === 'dropped').length;

  return (
    <div className="profile-header">
      <div className="profile-avatar">
        {user.avatarUrl
          ? <img src={user.avatarUrl} alt={user.displayName} />
          : <span>{user.displayName.charAt(0).toUpperCase()}</span>
        }
      </div>

      <div className="profile-info">
        <h1 className="profile-name">{user.displayName}</h1>
      </div>

      <div className="profile-stats">
        <div className="stat">
          <span className="stat-num">{completed}</span>
          <span className="stat-label">Shows Completed</span>
        </div>
        <div className="stat">
          <span className="stat-num">{watching}</span>
          <span className="stat-label">Currently Watching</span>
        </div>
        <div className="stat">
          <span className="stat-num">{dropped}</span>
          <span className="stat-label">Dropped</span>
        </div>
      </div>
    </div>
  );
}
