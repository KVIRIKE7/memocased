import { useState } from 'react';
import db from './data/db.json';
import { type AppData } from './types';
import { useTmdbPosters } from './hooks/useTmdbPosters';

import Navbar            from './components/Navbar';
import ProfileHeader     from './components/ProfileHeader';
import ProfileTabs       from './components/ProfileTabs';
import FavoriteShow      from './components/FavoriteShow';
import CurrentlyWatching from './components/CurrentlyWatching';
import ShowItem          from './components/ShowItem';
import BrowseSection     from './components/BrowseSection';

const data = db as AppData;

export default function App() {
  const [activeTab, setActiveTab] = useState('Profile');

  const { user, shows, userShows } = data;

  const posters = useTmdbPosters(shows);

  const enrichedShows = shows.map(s => ({
    ...s,
    posterUrl: posters[s.id] ?? s.posterUrl,
  }));

  const getShow = (showId: number) => enrichedShows.find(s => s.id === showId)!;

  const favoriteShows = user.favoriteShowIds
    .map(id => enrichedShows.find(s => s.id === id))
    .filter(Boolean) as typeof enrichedShows;

  const currentlyWatching = userShows.filter(us => us.status === 'watching');

  const handleMenuSelect = (item: string) => {
    if (item === 'Login' || item === 'Signup') return;
    setActiveTab(item);
  };

  return (
    <div className="app">
      <Navbar user={user} onMenuSelect={handleMenuSelect} onNavLink={setActiveTab} />

      <main className="main-content">
        <ProfileHeader user={user} userShows={userShows} />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'Profile' && (
          <div className="profile-body">
            <div className="profile-main">
              <section className="section">
                <h2 className="section-title">Favorite Shows</h2>
                <div className="favorite-shows-grid">
                  {favoriteShows.map(show => (
                    <FavoriteShow key={show.id} show={show} />
                  ))}
                </div>
              </section>
              <section className="section">
                <h2 className="section-title">Currently Watching</h2>
                <div className="currently-watching-list">
                  {currentlyWatching.length === 0 ? (
                    <p className="empty-state">Nothing being watched right now.</p>
                  ) : (
                    currentlyWatching.map(us => (
                      <CurrentlyWatching key={us.id} userShow={us} show={getShow(us.showId)} />
                    ))
                  )}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'Shows' && (
          <div className="shows-tab-content">
            <div className="shows-section-header">
              <h2 className="shows-section-title">My Shows</h2>
              <span className="shows-section-count">{userShows.length}</span>
            </div>
            <div className="shows-grid">
              {userShows.map(us => (
                <ShowItem key={us.id} userShow={us} show={getShow(us.showId)} />
              ))}
            </div>

            {/* Live TMDB browse with pagination */}
            <BrowseSection />
          </div>
        )}

        {activeTab !== 'Profile' && activeTab !== 'Shows' && (
          <div className="empty-tab">
            <p>{activeTab} — coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
}
