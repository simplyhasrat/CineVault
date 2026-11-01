import React from 'react';
import { Film, Star, Clock, Heart, Plus, Sparkles, TrendingUp, Compass, ArrowRight, Bookmark } from 'lucide-react';
import { CollectionStats, Movie, UserProfile } from '../types/movie';
import { MovieCard } from './MovieCard';

interface DashboardViewProps {
  movies: Movie[];
  stats: CollectionStats;
  userProfile: UserProfile;
  onSelectMovie: (movie: Movie) => void;
  onToggleFavorite: (e: React.MouseEvent, movieId: string) => void;
  onOpenAddModal: () => void;
  onNavigateToLibrary: () => void;
  onNavigateToFavorites: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  movies,
  stats,
  userProfile,
  onSelectMovie,
  onToggleFavorite,
  onOpenAddModal,
  onNavigateToLibrary,
  onNavigateToFavorites,
}) => {
  // Recently watched or added movies
  const watchedMovies = movies.filter((m) => m.status === 'watched');
  const recentlyWatched = [...watchedMovies]
    .sort((a, b) => (b.dateWatched || '').localeCompare(a.dateWatched || ''))
    .slice(0, 6);

  // Spotlight movie: highest rated or first favorite
  const spotlightMovie =
    movies.find((m) => m.isFavorite && m.personalRating && m.personalRating >= 9) ||
    watchedMovies[0] ||
    movies[0];

  return (
    <div className="dashboard-view">
      {/* Cinematic Hero Banner */}
      <div className="hero-banner">
        <div className="hero-backdrop-glow" />
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={14} />
            <span>Welcome Back, {userProfile.name}</span>
          </div>
          <h1 className="hero-title">
            Your Personal <span>Movie Universe</span>
          </h1>
          <p className="hero-subtitle">
            Every ticket, every late-night stream, every unforgettable scene cataloged in your private digital cinema archive.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={onOpenAddModal} id="hero-add-movie-btn">
              <Plus size={18} strokeWidth={2.5} />
              <span>Log New Film</span>
            </button>
            <button className="btn btn-secondary" onClick={onNavigateToLibrary}>
              <Film size={17} />
              <span>Browse All ({movies.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core PRD Stats Metrics */}
      <div className="stats-grid">
        <div className="stat-card glass-card">
          <div className="stat-info">
            <span className="stat-label">Movies Watched</span>
            <span className="stat-value">{stats.totalWatched}</span>
          </div>
          <div className="stat-icon-wrapper">
            <Film size={24} />
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-info">
            <span className="stat-label">Average Rating</span>
            <span className="stat-value">★ {stats.averageRating || '—'}</span>
          </div>
          <div className="stat-icon-wrapper" style={{ color: 'var(--accent-gold)' }}>
            <Star size={24} fill="currentColor" />
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-info">
            <span className="stat-label">Time Watched</span>
            <span className="stat-value">{stats.totalHours}h</span>
          </div>
          <div className="stat-icon-wrapper">
            <Clock size={24} />
          </div>
        </div>

        <div className="stat-card glass-card" onClick={onNavigateToFavorites} style={{ cursor: 'pointer' }}>
          <div className="stat-info">
            <span className="stat-label">Favorites</span>
            <span className="stat-value">{stats.totalFavorites}</span>
          </div>
          <div className="stat-icon-wrapper" style={{ color: '#ef4444' }}>
            <Heart size={24} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Spotlight Feature Banner */}
      {spotlightMovie && (
        <div
          className="glass-card"
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            marginBottom: '36px',
            cursor: 'pointer',
            border: '1px solid var(--border-medium)',
          }}
          onClick={() => onSelectMovie(spotlightMovie)}
        >
          {spotlightMovie.backdropPath && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${spotlightMovie.backdropPath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 30%',
                opacity: 0.28,
                filter: 'blur(2px)',
              }}
            />
          )}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              padding: '32px',
              display: 'flex',
              gap: '28px',
              alignItems: 'center',
              flexWrap: 'wrap',
              background: 'linear-gradient(90deg, rgba(16,18,23,0.95) 0%, rgba(16,18,23,0.7) 100%)',
            }}
          >
            <img
              src={spotlightMovie.posterPath}
              alt={spotlightMovie.title}
              style={{
                width: 110,
                aspectRatio: '2/3',
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            />
            <div style={{ flex: 1, minWidth: 260 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--accent-gold-light)',
                  }}
                >
                  Featured In Vault
                </span>
                {spotlightMovie.personalRating && (
                  <span className="rating-badge">
                    <Star size={11} fill="currentColor" />
                    <span>{spotlightMovie.personalRating} / 10</span>
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
                {spotlightMovie.title} ({spotlightMovie.releaseYear})
              </h2>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  maxWidth: 680,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {spotlightMovie.personalReview || spotlightMovie.overview}
              </p>
            </div>
            <div style={{ alignSelf: 'center' }}>
              <button className="btn btn-secondary" style={{ pointerEvents: 'none' }}>
                <span>View Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recently Watched Section */}
      <div style={{ marginBottom: '40px' }}>
        <div className="section-header">
          <h2 className="section-title">
            <Clock size={20} style={{ color: 'var(--accent-gold)' }} />
            <span>Recently Watched</span>
          </h2>
          <button className="btn btn-ghost" onClick={onNavigateToLibrary}>
            <span>View All ({stats.totalWatched})</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {recentlyWatched.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Film size={28} />
            </div>
            <h3 style={{ marginBottom: 6 }}>No movies watched yet</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>
              Start building your CineVault by logging your first movie.
            </p>
            <button className="btn btn-primary" onClick={onOpenAddModal}>
              <Plus size={16} />
              <span>Log Movie</span>
            </button>
          </div>
        ) : (
          <div className="poster-grid">
            {recentlyWatched.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={onSelectMovie}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      {/* Watchlist Preview (PRD Feature) */}
      {stats.totalWatchlist > 0 && (
        <div>
          <div className="section-header">
            <h2 className="section-title">
              <Bookmark size={20} style={{ color: '#60a5fa' }} />
              <span>On Your Radar (Watchlist)</span>
            </h2>
            <button className="btn btn-ghost" onClick={onNavigateToLibrary}>
              <span>View Watchlist ({stats.totalWatchlist})</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="poster-grid">
            {movies
              .filter((m) => m.status === 'watchlist')
              .slice(0, 4)
              .map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={onSelectMovie}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
