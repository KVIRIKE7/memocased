import { type User } from '../types';

interface NavbarProps {
  user: User;
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <div className="logo-dots">
            <span className="dot dot-orange" />
            <span className="dot dot-green" />
            <span className="dot dot-blue" />
          </div>
          <span className="logo-wordmark">Memocased</span>
        </div>
        <div className="navbar-username">
          <div className="navbar-avatar">
            {user.displayName.charAt(0).toUpperCase()}
          </div>
          <span>{user.username}</span>
        </div>
      </div>

      <div className="navbar-right">
        <a className="nav-link">Shows</a>
        <a className="nav-link">Journal</a>
        <button className="nav-search-btn" aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button className="log-btn">+ LOG</button>
      </div>
    </nav>
  );
}
