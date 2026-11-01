import React from 'react';
import { Heart, Star, Calendar, Clock, Bookmark } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  onToggleFavorite: (e: React.MouseEvent, movieId: string) => void;
  viewMode?: 'grid' | 'list';
}

const FALLBACK_POSTER =
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80';

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelect,
  onToggleFavorite,
  viewMode = 'grid',
}) => {
  const [imgSrc, setImgSrc] = React.useState(movie.posterPath || FALLBACK_POSTER);

  const handleImageError = () => {
    setImgSrc(FALLBACK_POSTER);
  };

  if (viewMode === 'list') {
    return (
      <div
        className="movie-list-row"
        onClick={() => onSelect(movie)}
        id={`movie-row-${movie.id}`}
      >
        <img
          src={imgSrc}
          alt={movie.title}
          className="movie-list-thumb"
          onError={handleImageError}
          loading="lazy"
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {movie.title}
            </h4>
            {movie.status === 'watchlist' && (
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#60a5fa',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                }}
              >
                Watchlist
              </span>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginTop: '4px',
            }}
          >
            <span>{movie.releaseYear}</span>
            <span>•</span>
            <span>{movie.director}</span>
            <span>•</span>
            <span>{movie.runtimeMinutes}m</span>
            <span>•</span>
            <span style={{ color: 'var(--text-dim)' }}>
              {movie.genres.slice(0, 3).join(', ')}
            </span>
          </div>
        </div>

        {/* Rating and Favorite */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {movie.personalRating ? (
            <div className="rating-badge">
              <Star size={13} fill="currentColor" />
              <span>{movie.personalRating.toFixed(1)}</span>
            </div>
          ) : movie.tmdbRating ? (
            <div
              className="rating-badge"
              style={{
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-muted)',
              }}
            >
              <span>TMDB {movie.tmdbRating.toFixed(1)}</span>
            </div>
          ) : null}

          {movie.dateWatched && (
            <span
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-dim)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {movie.dateWatched}
            </span>
          )}

          <button
            className={`fav-btn ${movie.isFavorite ? 'active' : ''}`}
            onClick={(e) => onToggleFavorite(e, movie.id)}
            title={movie.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-label="Toggle favorite"
          >
            <Heart size={15} fill={movie.isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    );
  }

  // Grid view (Strict 2:3 aspect ratio)
  return (
    <div
      className="movie-card"
      onClick={() => onSelect(movie)}
      id={`movie-card-${movie.id}`}
    >
      <div className="poster-container">
        <img
          src={imgSrc}
          alt={movie.title}
          className="poster-img"
          onError={handleImageError}
          loading="lazy"
        />

        <div className="poster-overlay">
          <div className="poster-top-actions">
            {movie.personalRating ? (
              <div className="rating-badge">
                <Star size={12} fill="currentColor" />
                <span>{movie.personalRating.toFixed(1)}</span>
              </div>
            ) : movie.status === 'watchlist' ? (
              <div
                className="rating-badge"
                style={{
                  background: 'rgba(29, 78, 216, 0.85)',
                  borderColor: 'rgba(96, 165, 250, 0.4)',
                  color: '#93c5fd',
                }}
              >
                <Bookmark size={11} fill="currentColor" />
                <span>Watchlist</span>
              </div>
            ) : movie.tmdbRating ? (
              <div
                className="rating-badge"
                style={{
                  background: 'rgba(23, 26, 34, 0.85)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-muted)',
                }}
              >
                <Star size={11} />
                <span>{movie.tmdbRating.toFixed(1)}</span>
              </div>
            ) : <span />}

            <button
              className={`fav-btn ${movie.isFavorite ? 'active' : ''}`}
              onClick={(e) => onToggleFavorite(e, movie.id)}
              title={movie.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label="Toggle favorite"
            >
              <Heart size={14} fill={movie.isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          {movie.rewatchHistory && movie.rewatchHistory.length > 0 && (
            <div
              style={{
                alignSelf: 'flex-start',
                padding: '2px 6px',
                borderRadius: '4px',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(4px)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-gold-light)',
              }}
            >
              {movie.rewatchHistory.length + 1}x Watched
            </div>
          )}
        </div>
      </div>

      <div className="movie-card-info">
        <h3 className="movie-card-title" title={movie.title}>
          {movie.title}
        </h3>

        <div className="movie-card-meta">
          <span>{movie.releaseYear}</span>
          <span>•</span>
          <span>{movie.runtimeMinutes}m</span>
        </div>

        <div className="movie-card-genres">
          {movie.genres.slice(0, 2).join(' · ')}
        </div>
      </div>
    </div>
  );
};
