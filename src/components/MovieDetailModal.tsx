import React, { useState } from 'react';
import {
  X,
  Star,
  Heart,
  Calendar,
  Clock,
  Film,
  User,
  Tag,
  Plus,
  Trash2,
  Edit3,
  Bookmark,
  Check,
  History,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Movie, RewatchEntry } from '../types/movie';

interface MovieDetailModalProps {
  movie: Movie | null;
  onClose: () => void;
  onUpdateMovie: (updated: Movie) => void;
  onDeleteMovie: (movieId: string) => void;
  onToggleFavorite: (e: React.MouseEvent, movieId: string) => void;
}

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  onClose,
  onUpdateMovie,
  onDeleteMovie,
  onToggleFavorite,
}) => {
  if (!movie) return null;

  // Local state for personal tracking editing
  const [personalRating, setPersonalRating] = useState<number>(movie.personalRating || 0);
  const [personalReview, setPersonalReview] = useState<string>(movie.personalReview || '');
  const [dateWatched, setDateWatched] = useState<string>(
    movie.dateWatched || new Date().toISOString().split('T')[0]
  );
  const [status, setStatus] = useState<'watched' | 'watchlist'>(movie.status);
  const [tags, setTags] = useState<string[]>(movie.tags || []);
  const [newTagInput, setNewTagInput] = useState('');

  // Rewatch addition state
  const [showRewatchForm, setShowRewatchForm] = useState(false);
  const [rewatchDate, setRewatchDate] = useState(new Date().toISOString().split('T')[0]);
  const [rewatchNote, setRewatchNote] = useState('');

  // Edit metadata mode
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [editTitle, setEditTitle] = useState(movie.title);
  const [editDirector, setEditDirector] = useState(movie.director);
  const [editRuntime, setEditRuntime] = useState(movie.runtimeMinutes);
  const [editOverview, setEditOverview] = useState(movie.overview);

  // Save changes handler
  const handleSaveAll = () => {
    const updated: Movie = {
      ...movie,
      title: editTitle,
      director: editDirector,
      runtimeMinutes: Number(editRuntime),
      overview: editOverview,
      personalRating: personalRating > 0 ? personalRating : undefined,
      personalReview: personalReview.trim() || undefined,
      dateWatched: status === 'watched' ? dateWatched : undefined,
      status,
      tags,
    };
    onUpdateMovie(updated);
    setIsEditingMetadata(false);
  };

  // Add Tag
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const updatedTags = [...tags, trimmed];
      setTags(updatedTags);
      setNewTagInput('');
      onUpdateMovie({ ...movie, tags: updatedTags });
    }
  };

  // Remove Tag
  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((t) => t !== tagToRemove);
    setTags(updatedTags);
    onUpdateMovie({ ...movie, tags: updatedTags });
  };

  // Add Rewatch Entry
  const handleAddRewatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewatchDate) return;

    const newEntry: RewatchEntry = {
      id: `rw-${Date.now()}`,
      watchedAt: rewatchDate,
      notes: rewatchNote.trim() || undefined,
    };

    const updatedHistory = [...(movie.rewatchHistory || []), newEntry];
    const updated: Movie = {
      ...movie,
      rewatchHistory: updatedHistory,
      dateWatched: rewatchDate, // update latest watch date
      status: 'watched',
    };

    onUpdateMovie(updated);
    setShowRewatchForm(false);
    setRewatchNote('');
  };

  // Quick rating setter
  const handleRatingClick = (score: number) => {
    setPersonalRating(score);
    onUpdateMovie({ ...movie, personalRating: score, status: 'watched' });
  };

  const formatRuntime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h > 0 ? `${h}h ` : ''}${m}m (${mins} min)`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Backdrop Banner with gradient fade */}
        <div
          className="detail-banner"
          style={{
            backgroundImage: movie.backdropPath
              ? `url(${movie.backdropPath})`
              : `url(${movie.posterPath})`,
          }}
        >
          <div className="detail-banner-gradient" />
        </div>

        {/* Body */}
        <div className="detail-body">
          {/* Header Row: Poster + Title Info */}
          <div className="detail-header-row">
            <div className="detail-poster-wrapper">
              <img src={movie.posterPath} alt={movie.title} />
            </div>

            <div className="detail-meta-column">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    background: status === 'watched' ? 'var(--color-success-subtle)' : 'rgba(59, 130, 246, 0.2)',
                    color: status === 'watched' ? 'var(--color-success)' : '#60a5fa',
                    border: `1px solid ${status === 'watched' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {status === 'watched' ? 'Watched' : 'In Watchlist'}
                </span>

                {movie.tmdbRating && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <Star size={13} style={{ color: 'var(--accent-gold)' }} fill="currentColor" />
                    <span>TMDB {movie.tmdbRating.toFixed(1)}/10</span>
                  </span>
                )}
              </div>

              {isEditingMetadata ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{
                      background: 'var(--bg-surface-2)',
                      border: '1px solid var(--accent-gold)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 12px',
                      color: '#fff',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                    }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Director"
                      value={editDirector}
                      onChange={(e) => setEditDirector(e.target.value)}
                      style={{
                        background: 'var(--bg-surface-2)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '6px 10px',
                        color: '#fff',
                        flex: 1,
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Runtime (min)"
                      value={editRuntime}
                      onChange={(e) => setEditRuntime(Number(e.target.value))}
                      style={{
                        background: 'var(--bg-surface-2)',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '6px 10px',
                        color: '#fff',
                        width: '120px',
                      }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 style={{ fontSize: '2rem', lineHeight: 1.15, marginBottom: '4px' }}>
                    {movie.title}
                  </h1>

                  {movie.originalTitle && movie.originalTitle !== movie.title && (
                    <div
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-dim)',
                        fontStyle: 'italic',
                        marginBottom: '6px',
                      }}
                    >
                      Original Title: {movie.originalTitle}
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      marginBottom: '14px',
                    }}
                  >
                    <span>{movie.releaseYear}</span>
                    <span>•</span>
                    <span>{formatRuntime(movie.runtimeMinutes)}</span>
                    <span>•</span>
                    <span>{movie.language || 'English'}</span>
                    <span>•</span>
                    <span style={{ color: '#fff', fontWeight: 600 }}>Dir. {movie.director}</span>
                  </div>
                </>
              )}

              {/* Genres Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {movie.genres.map((g) => (
                  <span
                    key={g}
                    style={{
                      fontSize: '0.75rem',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--bg-surface-2)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  className={`btn ${movie.isFavorite ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={(e) => onToggleFavorite(e, movie.id)}
                  style={{ padding: '8px 14px' }}
                >
                  <Heart size={16} fill={movie.isFavorite ? 'currentColor' : 'none'} />
                  <span>{movie.isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditingMetadata(!isEditingMetadata)}
                  style={{ padding: '8px 14px' }}
                >
                  <Edit3 size={15} />
                  <span>{isEditingMetadata ? 'Cancel Edit' : 'Edit Info'}</span>
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to remove "${movie.title}" from your library?`)) {
                      onDeleteMovie(movie.id);
                      onClose();
                    }
                  }}
                  style={{ padding: '8px 14px', marginLeft: 'auto' }}
                  title="Remove from CineVault"
                >
                  <Trash2 size={15} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>

          {/* Synopsis */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#fff' }}>Plot Synopsis</h3>
            {isEditingMetadata ? (
              <textarea
                value={editOverview}
                onChange={(e) => setEditOverview(e.target.value)}
                rows={4}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-2)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                }}
              />
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                {movie.overview}
              </p>
            )}
          </div>

          {/* Cast */}
          {movie.cast && movie.cast.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#fff' }}>Starring Cast</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {movie.cast.map((actor) => (
                  <div
                    key={actor}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      background: 'var(--bg-surface-2)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.82rem',
                    }}
                  >
                    <User size={13} style={{ color: 'var(--text-dim)' }} />
                    <span>{actor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border-subtle)', margin: '28px 0' }} />

          {/* Personal Diary & Tracking Section (Feature 6 of PRD) */}
          <div
            style={{
              background: 'var(--bg-surface-2)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} style={{ color: 'var(--accent-gold)' }} />
                <span>My Movie Diary & Ratings</span>
              </h3>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className={`btn ${status === 'watched' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  onClick={() => setStatus('watched')}
                >
                  <Check size={14} />
                  <span>Watched</span>
                </button>
                <button
                  type="button"
                  className={`btn ${status === 'watchlist' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  onClick={() => setStatus('watchlist')}
                >
                  <Bookmark size={14} />
                  <span>Watchlist</span>
                </button>
              </div>
            </div>

            {/* Rating Selector */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                }}
              >
                Personal Rating (1 to 10 Scale):{' '}
                <strong style={{ color: 'var(--accent-gold)', fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>
                  {personalRating > 0 ? `${personalRating.toFixed(1)} / 10` : 'Not rated yet'}
                </strong>
              </label>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => handleRatingClick(score)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-sm)',
                      background: personalRating >= score ? 'var(--accent-gold)' : 'var(--bg-surface-3)',
                      color: personalRating >= score ? '#000' : 'var(--text-muted)',
                      border: '1px solid var(--border-subtle)',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 150ms',
                    }}
                    title={`Rate ${score}/10`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>

            {/* Watch Date */}
            {status === 'watched' && (
              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    marginBottom: '8px',
                  }}
                >
                  Date Watched:
                </label>
                <input
                  type="date"
                  value={dateWatched}
                  onChange={(e) => setDateWatched(e.target.value)}
                  style={{
                    background: 'var(--bg-surface-3)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 12px',
                    color: '#fff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
            )}

            {/* Personal Review */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                }}
              >
                Personal Review & Reflections:
              </label>
              <textarea
                value={personalReview}
                onChange={(e) => setPersonalReview(e.target.value)}
                placeholder="What did you think of the cinematography, acting, ending, or soundtrack? Write your personal diary entry..."
                rows={4}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-3)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                }}
              />
            </div>

            {/* Custom Tags */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  marginBottom: '8px',
                }}
              >
                Custom Labels & Tags:
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(245, 158, 11, 0.15)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      color: 'var(--accent-gold-light)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>

              <form onSubmit={handleAddTag} style={{ display: 'flex', gap: '8px', maxWidth: 360 }}>
                <input
                  type="text"
                  placeholder="e.g. Mind-blowing ending, Comfort movie"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'var(--bg-surface-3)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '6px 10px',
                    color: '#fff',
                    fontSize: '0.85rem',
                  }}
                />
                <button type="submit" className="btn btn-secondary" style={{ padding: '6px 12px' }}>
                  <Plus size={14} />
                  <span>Add Tag</span>
                </button>
              </form>
            </div>

            {/* Rewatch History Log (PRD Feature 6) */}
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <History size={16} style={{ color: 'var(--accent-gold)' }} />
                  <span>Rewatch Log ({movie.rewatchHistory ? movie.rewatchHistory.length : 0} rewatches)</span>
                </h4>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '5px 10px', fontSize: '0.78rem' }}
                  onClick={() => setShowRewatchForm(!showRewatchForm)}
                >
                  <RotateCcw size={13} />
                  <span>{showRewatchForm ? 'Cancel' : '+ Log Rewatch'}</span>
                </button>
              </div>

              {/* Rewatch Form */}
              {showRewatchForm && (
                <form
                  onSubmit={handleAddRewatch}
                  style={{
                    background: 'var(--bg-surface-3)',
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    marginBottom: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                        Rewatch Date:
                      </label>
                      <input
                        type="date"
                        value={rewatchDate}
                        onChange={(e) => setRewatchDate(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'var(--bg-surface-2)',
                          border: '1px solid var(--border-subtle)',
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-sm)',
                          color: '#fff',
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                      Viewing Notes (Format, friends, theater vs home):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. IMAX 70mm re-release with friends. Even better on second watch."
                      value={rewatchNote}
                      onChange={(e) => setRewatchNote(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'var(--bg-surface-2)',
                        border: '1px solid var(--border-subtle)',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        color: '#fff',
                        fontSize: '0.85rem',
                      }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '6px 14px' }}>
                    Save Rewatch Entry
                  </button>
                </form>
              )}

              {/* Rewatch List */}
              {movie.rewatchHistory && movie.rewatchHistory.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {movie.rewatchHistory.map((entry, idx) => (
                    <div
                      key={entry.id || idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        background: 'var(--bg-surface-3)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.82rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'var(--accent-gold-light)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          {entry.watchedAt}
                        </span>
                        <span style={{ color: 'var(--text-muted)' }}>{entry.notes || 'Rewatched'}</span>
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Viewing #{idx + 2}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  No extra rewatches recorded yet. Click "+ Log Rewatch" whenever you watch this film again!
                </p>
              )}
            </div>

            {/* Save All Changes Button */}
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-primary" onClick={handleSaveAll} style={{ padding: '10px 24px' }}>
                <Check size={16} />
                <span>Save All Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
