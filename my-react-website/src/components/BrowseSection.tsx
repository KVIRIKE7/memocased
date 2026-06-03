import { useTmdbBrowse } from '../hooks/useTmdbBrowse';
import BrowseShowCard from './BrowseShowCard';

// Skeleton card shown while loading
function SkeletonCard() {
  return (
    <div className="show-card browse-card browse-skeleton">
      <div className="show-card-poster"><div className="poster-loading" /></div>
      <div className="show-card-info">
        <div className="skel-line skel-title" />
        <div className="skel-line skel-sub" />
        <div className="skel-line skel-sub skel-short" />
      </div>
    </div>
  );
}

// Compact page-number paginator
function Paginator({
  page, totalPages, onPrev, onNext, onGoTo
}: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (p: number) => void;
}) {
  // Build page window: always show first, last, current ±2
  const pages: (number | '…')[] = [];
  const range = new Set<number>();
  range.add(1);
  range.add(totalPages);
  for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) range.add(i);
  const sorted = Array.from(range).sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) pages.push('…');
    pages.push(sorted[i]);
  }

  return (
    <div className="browse-paginator">
      <button className="page-btn page-arrow" onClick={onPrev} disabled={page === 1}>‹</button>
      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="page-ellipsis">…</span>
        ) : (
          <button
            key={p}
            className={`page-btn ${p === page ? 'page-btn--active' : ''}`}
            onClick={() => onGoTo(p as number)}
          >
            {p}
          </button>
        )
      )}
      <button className="page-btn page-arrow" onClick={onNext} disabled={page === totalPages}>›</button>
    </div>
  );
}

export default function BrowseSection() {
  const { shows, page, totalPages, loading, error, goTo, nextPage, prevPage } = useTmdbBrowse();

  return (
    <div>
      <div className="shows-section-header" style={{ marginTop: '36px' }}>
        <h2 className="shows-section-title">Browse</h2>
        {!loading && !error && (
          <span className="shows-section-count">Page {page} of {totalPages}</span>
        )}
      </div>
      <p className="shows-section-sub">Popular shows from TMDB — shows you haven't tracked yet</p>

      {error && (
        <p className="browse-error">Couldn't load shows. Check your connection and try refreshing.</p>
      )}

      <div className="shows-grid">
        {loading
          ? Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />)
          : shows.map(show => <BrowseShowCard key={show.tmdbId} show={show} />)
        }
      </div>

      {!loading && !error && totalPages > 1 && (
        <Paginator
          page={page}
          totalPages={totalPages}
          onPrev={prevPage}
          onNext={nextPage}
          onGoTo={goTo}
        />
      )}
    </div>
  );
}
