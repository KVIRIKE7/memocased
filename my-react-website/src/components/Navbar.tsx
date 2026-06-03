import { useState, useRef, useEffect } from 'react';
import { type User } from '../types';

interface NavbarProps {
  user: User;
  onMenuSelect?: (item: string) => void;
  onNavLink?: (tab: string) => void;
}

export default function Navbar({ user, onMenuSelect, onNavLink }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (item: string) => {
    setOpen(false);
    onMenuSelect?.(item);
  };

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
      </div>

      <div className="navbar-right">
        <a className="nav-link" onClick={() => onNavLink?.('Shows')}>Shows</a>
        <a className="nav-link" onClick={() => onNavLink?.('Diary')}>Journal</a>
        <button className="nav-search-btn" aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>


        <div className="profile-menu" ref={dropdownRef}>
          <button
            className="profile-menu-trigger"
            onClick={() => setOpen(o => !o)}
            aria-label="Profile menu"
            aria-expanded={open}
          >
            <div className="navbar-avatar profile-menu-avatar">
              {user.displayName.charAt(0).toUpperCase()}
            </div>
          </button>

          {open && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-dropdown-avatar">
                  {user.displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="profile-dropdown-name">{user.displayName}</div>
                  <div className="profile-dropdown-username">@{user.username}</div>
                </div>
              </div>
              <div className="profile-dropdown-divider" />
              <button className="profile-dropdown-item" onClick={() => handleSelect('Profile')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                Profile
              </button>
              <button className="profile-dropdown-item" onClick={() => handleSelect('Settings')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                Settings
              </button>
              <div className="profile-dropdown-divider" />
              <button className="profile-dropdown-item" onClick={() => handleSelect('Login')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                Log in
              </button>
              <button className="profile-dropdown-item" onClick={() => handleSelect('Signup')}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
                </svg>
                Sign up
              </button>
              <div className="profile-dropdown-divider" />
              <button className="profile-dropdown-item profile-dropdown-item--danger">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
