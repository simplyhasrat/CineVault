import React from 'react';
import {
  BarChart3,
  Film,
  Star,
  Clock,
  Heart,
  TrendingUp,
  Award,
  Calendar,
  Sparkles,
  UserCheck,
  Clapperboard
} from 'lucide-react';
import { CollectionStats, Movie } from '../types/movie';

interface StatsViewProps {
  stats: CollectionStats;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const StatsView: React.FC<StatsViewProps> = ({ stats, movies, onSelectMovie }) => {
  // Sort genres by frequency
  const sortedGenres = Object.entries(stats.genreCounts).sort((a, b) => b[1] - a[1]);
  const maxGenreCount = sortedGenres.length > 0 ? sortedGenres[0][1] : 1;

  // Maximum rating count for histogram scaling
  const maxRatingCount = Math.max(...Object.values(stats.ratingDistribution), 1);

  // Dynamic milestone badges based on real user data
  const badges = [
    {
      title: 'First Film In Vault',
      desc: 'Logged your very first movie',
      achieved: stats.totalWatched >= 1,
      icon: '🎬'
    },
    {
      title: 'Movie Marathoner',
      desc: 'Over 10 films tracked',
      achieved: stats.totalWatched >= 10,
      icon: '🍿'
    },
    {
      title: 'Century Club',
      desc: 'Watched 100+ movies',
      achieved: stats.totalWatched >= 100,
      icon: '👑'
    },
    {
      title: 'Sci-Fi Explorer',
      desc: 'Watched 5+ Sci-Fi masterworks',
      achieved: (stats.genreCounts['Sci-Fi'] || 0) >= 5,
      icon: '🚀'
    },
    {
      title: 'Discerning Critic',
      desc: 'Maintained an 8.5+ vault average rating',
      achieved: stats.averageRating >= 8.5 && stats.totalWatched >= 3,
      icon: '✨'
    },
    {
      title: 'Rewatch Connoisseur',
      desc: 'Logged repeat viewings of favorite films',
      achieved: movies.some((m) => m.rewatchHistory && m.rewatchHistory.length > 0),
      icon: '🔁'
    }
  ];

  return (
    <div className="stats-view">
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold-light)', marginBottom: '6px' }}>
          <Sparkles size={16} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Data Insights & Analytics
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Cinema Habits & Statistics</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Deep-dive telemetry into your genres, directors, watch timeline, and personal rating habits.
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="stats-grid">
        <div className="stat-card glass-card">
          <div className="stat-info">
            <span className="stat-label">Watched Titles</span>
            <span className="stat-value">{stats.totalWatched}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4 }}>
              +{stats.totalWatchlist} in watchlist
            </span>
          </div>
          <div className="stat-icon-wrapper">
            <Film size={24} />
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-info">
            <span className="stat-label">Time Dedicated</span>
            <span className="stat-value">{stats.totalHours} hrs</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4 }}>
              ~{stats.totalDays} full days
            </span>
          </div>
          <div className="stat-icon-wrapper">
            <Clock size={24} />
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-info">
            <span className="stat-label">Average Score</span>
            <span className="stat-value">★ {stats.averageRating || '—'}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4 }}>
              Out of 10 scale
            </span>
          </div>
          <div className="stat-icon-wrapper" style={{ color: 'var(--accent-gold)' }}>
            <Star size={24} fill="currentColor" />
          </div>
        </div>

        <div className="stat-card glass-card">
          <div className="stat-info">
            <span className="stat-label">All-Time Favorites</span>
            <span className="stat-value">{stats.totalFavorites}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 4 }}>
              Hearted gems
            </span>
          </div>
          <div className="stat-icon-wrapper" style={{ color: '#ef4444' }}>
            <Heart size={24} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* 2-Column Analytics Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '36px' }}>
        {/* Genre Breakdown */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <Clapperboard size={18} style={{ color: 'var(--accent-gold)' }} />
            <span>Top Watched Genres</span>
          </h3>

          {sortedGenres.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No genre data recorded yet.</p>
          ) : (
            <div>
              {sortedGenres.slice(0, 7).map(([genre, count]) => {
                const percent = Math.round((count / (stats.totalWatched || 1)) * 100);
                return (
                  <div key={genre} className="stat-bar-container">
                    <div className="stat-bar-header">
                      <span style={{ fontWeight: 600, color: '#fff' }}>{genre}</span>
                      <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {count} films ({percent}%)
                      </span>
                    </div>
                    <div className="stat-bar-track">
                      <div className="stat-bar-fill" style={{ width: `${(count / maxGenreCount) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Rating Distribution Histogram (1 to 10) */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <Star size={18} style={{ color: 'var(--accent-gold)' }} fill="currentColor" />
            <span>Personal Rating Distribution (1–10)</span>
          </h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '8px',
              height: 180,
              paddingTop: '20px',
              borderBottom: '1px solid var(--border-medium)',
              paddingBottom: '8px',
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => {
              const count = stats.ratingDistribution[score] || 0;
              const heightPercent = maxRatingCount > 0 ? (count / maxRatingCount) * 100 : 0;
              return (
                <div
                  key={score}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-end',
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {count > 0 ? count : ''}
                  </span>
                  <div
                    style={{
                      width: '100%',
                      height: `${Math.max(heightPercent, 4)}%`,
                      background: count > 0 ? 'linear-gradient(180deg, var(--accent-gold), var(--accent-gold-dark))' : 'var(--bg-surface-3)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 500ms ease',
                    }}
                    title={`Score ${score}: ${count} movies`}
                  />
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: count > 0 ? 'var(--accent-gold-light)' : 'var(--text-dim)',
                    }}
                  >
                    {score}
                  </span>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: 10, textAlign: 'center' }}>
            Scores recorded in your personal diary entries
          </p>
        </div>
      </div>

      {/* Directors & Actors Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '36px' }}>
        {/* Top Directors */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Award size={18} style={{ color: 'var(--accent-gold)' }} />
            <span>Most Watched Directors</span>
          </h3>

          {stats.topDirectors.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No director records available.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {stats.topDirectors.map((director, i) => (
                <div
                  key={director.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: 'var(--bg-surface-2)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', width: 18 }}>
                      #{i + 1}
                    </span>
                    <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{director.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{director.count} films</span>
                    {director.avgRating > 0 && (
                      <span className="rating-badge" style={{ padding: '2px 6px', fontSize: '0.72rem' }}>
                        ★ {director.avgRating}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Actors */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <UserCheck size={18} style={{ color: 'var(--accent-gold)' }} />
            <span>Most Frequent Actors</span>
          </h3>

          {stats.topActors.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No actor records available.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {stats.topActors.map((actor, i) => (
                <div
                  key={actor.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: 'var(--bg-surface-2)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', width: 18 }}>
                      #{i + 1}
                    </span>
                    <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{actor.name}</span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {actor.count} appearances
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Highest-Rated Showcase (Top 5) */}
      <div style={{ marginBottom: '36px' }}>
        <h3 style={{ fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Star size={18} style={{ color: 'var(--accent-gold)' }} fill="currentColor" />
          <span>Hall of Fame: Your Highest Rated Titles</span>
        </h3>

        <div className="poster-grid">
          {stats.highestRated.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => onSelectMovie(movie)}
              style={{ cursor: 'pointer' }}
            >
              <div className="poster-container">
                <img src={movie.posterPath} alt={movie.title} className="poster-img" />
                <div className="poster-overlay">
                  <div className="poster-top-actions">
                    <div className="rating-badge">
                      <Star size={12} fill="currentColor" />
                      <span>{movie.personalRating?.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="movie-card-info">
                <h4 className="movie-card-title">{movie.title}</h4>
                <div className="movie-card-meta">
                  <span>{movie.releaseYear}</span> • <span>Dir. {movie.director}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cinephile Milestone Badges */}
      <div className="glass-card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Award size={20} style={{ color: 'var(--accent-gold)' }} />
          <span>Collector Milestones & Achievements</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {badges.map((badge) => (
            <div
              key={badge.title}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px',
                background: badge.achieved ? 'var(--bg-surface-2)' : 'rgba(23, 26, 34, 0.3)',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${badge.achieved ? 'var(--border-active)' : 'var(--border-subtle)'}`,
                opacity: badge.achieved ? 1 : 0.45,
              }}
            >
              <div style={{ fontSize: '2rem' }}>{badge.icon}</div>
              <div>
                <h4 style={{ fontSize: '0.92rem', color: badge.achieved ? '#fff' : 'var(--text-muted)' }}>
                  {badge.title}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{badge.desc}</p>
                {badge.achieved && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-success)', fontWeight: 600 }}>
                    ✓ Unlocked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
