import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Plus,
  Film,
  Calendar,
  Clock,
  User,
  Star,
  Check,
  AlertCircle,
  Sparkles,
  Bookmark,
  Layers
} from 'lucide-react';
import { Movie, UserProfile } from '../types/movie';
import { searchMovies } from '../services/tmdbService';

interface AddMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMovie: (movie: Movie) => void;
  existingMovies: Movie[];
  userProfile: UserProfile;
}

export const AddMovieModal: React.FC<AddMovieModalProps> = ({
  isOpen,
  onClose,
  onAddMovie,
  existingMovies,
  userProfile,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'search' | 'manual'>('search');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Partial<Movie>[]>([]);
  const [selectedResult, setSelectedResult] = useState<Partial<Movie> | null>(null);

  // Diary info to save with the movie
  const [personalRating, setPersonalRating] = useState<number>(8.5);
  const [personalReview, setPersonalReview] = useState('');
  const [dateWatched, setDateWatched] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<'watched' | 'watchlist'>('watched');
  const [isFavorite, setIsFavorite] = useState(false);
  const [tagsInput, setTagsInput] = useState('First Watch');

  // Manual Entry Form State
  const [manualTitle, setManualTitle] = useState('');
  const [manualYear, setManualYear] = useState(new Date().getFullYear());
  const [manualDirector, setManualDirector] = useState('');
  const [manualRuntime, setManualRuntime] = useState(120);
  const [manualGenres, setManualGenres] = useState('Sci-Fi, Drama');
  const [manualCast, setManualCast] = useState('');
  const [manualOverview, setManualOverview] = useState('');
  const [manualPoster, setManualPoster] = useState('');

  // Duplicate Check
  const duplicateMovie = selectedResult
    ? existingMovies.find(
        (m) =>
          (m.tmdbId && m.tmdbId === selectedResult.tmdbId) ||
          m.title.toLowerCase() === (selectedResult.title || '').toLowerCase()
      )
    : null;

  // Real-time search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchMovies(searchQuery, userProfile.tmdbApiKey);
        setSearchResults(results);
      } catch (err) {
        console.error('Search error', err);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [searchQuery, userProfile.tmdbApiKey]);

  // Handle Search Result Add
  const handleSaveSearchedMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResult || !selectedResult.title) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newMovie: Movie = {
      id: `m-${Date.now()}`,
      tmdbId: selectedResult.tmdbId,
      title: selectedResult.title,
      originalTitle: selectedResult.originalTitle || selectedResult.title,
      releaseDate: selectedResult.releaseDate || `${selectedResult.releaseYear || 2024}-01-01`,
      releaseYear: selectedResult.releaseYear || 2024,
      overview: selectedResult.overview || 'No synopsis provided.',
      posterPath:
        selectedResult.posterPath ||
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80',
      backdropPath: selectedResult.backdropPath,
      runtimeMinutes: selectedResult.runtimeMinutes || 120,
      language: selectedResult.language || 'English',
      director: selectedResult.director || 'Unknown Director',
      genres: selectedResult.genres || ['Cinema'],
      cast: selectedResult.cast || [],
      tmdbRating: selectedResult.tmdbRating,
      imdbRating: selectedResult.imdbRating,
      status,
      personalRating: status === 'watched' && personalRating > 0 ? personalRating : undefined,
      personalReview: personalReview.trim() || undefined,
      isFavorite,
      dateAdded: new Date().toISOString(),
      dateWatched: status === 'watched' ? dateWatched : undefined,
      rewatchHistory: [],
      tags: parsedTags,
    };

    onAddMovie(newMovie);
    onClose();
  };

  // Handle Manual Form Add
  const handleSaveManualMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;

    const parsedGenres = manualGenres
      .split(',')
      .map((g) => g.trim())
      .filter(Boolean);

    const parsedCast = manualCast
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newMovie: Movie = {
      id: `m-${Date.now()}`,
      title: manualTitle.trim(),
      releaseDate: `${manualYear}-01-01`,
      releaseYear: Number(manualYear),
      overview: manualOverview.trim() || 'User added film in collection.',
      posterPath:
        manualPoster.trim() ||
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80',
      runtimeMinutes: Number(manualRuntime),
      language: 'English',
      director: manualDirector.trim() || 'Unknown Director',
      genres: parsedGenres.length > 0 ? parsedGenres : ['Drama'],
      cast: parsedCast,
      status,
      personalRating: status === 'watched' && personalRating > 0 ? personalRating : undefined,
      personalReview: personalReview.trim() || undefined,
      isFavorite,
      dateAdded: new Date().toISOString(),
      dateWatched: status === 'watched' ? dateWatched : undefined,
      rewatchHistory: [],
      tags: parsedTags,
    };

    onAddMovie(newMovie);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        style={{ maxWidth: 780, maxHeight: '92vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div
          style={{
            padding: '24px 28px 16px 28px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Film size={22} style={{ color: 'var(--accent-gold)' }} />
              <span>Add to CineVault</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Search our live film database or enter custom metadata manually.
            </p>
          </div>

          {/* Tab Switcher */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-surface-2)',
              padding: '3px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginRight: 36,
            }}
          >
            <button
              className={`genre-pill ${activeTab === 'search' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('search');
                setSelectedResult(null);
              }}
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              Search & Add
            </button>
            <button
              className={`genre-pill ${activeTab === 'manual' ? 'active' : ''}`}
              onClick={() => setActiveTab('manual')}
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              Add Manually
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto' }}>
          {activeTab === 'search' ? (
            <div>
              {/* If no result selected yet, show search input & list */}
              {!selectedResult ? (
                <div>
                  <div className="search-input-wrapper" style={{ marginBottom: '16px' }}>
                    <Search size={18} className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Type movie name (e.g. Inception, Godfather, Matrix, Oppenheimer)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      id="search-add-input"
                    />
                  </div>

                  {isSearching && (
                    <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                      Searching movie universe...
                    </div>
                  )}

                  {!isSearching && searchQuery.trim() && searchResults.length === 0 && (
                    <div className="empty-state" style={{ padding: '36px 20px' }}>
                      <AlertCircle size={32} style={{ color: 'var(--accent-gold)', marginBottom: 8 }} />
                      <p style={{ color: 'var(--text-main)', fontWeight: 600 }}>No title matches "{searchQuery}"</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16 }}>
                        You can add it directly using the manual form.
                      </p>
                      <button className="btn btn-secondary" onClick={() => setActiveTab('manual')}>
                        <span>Switch to Manual Add</span>
                      </button>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {searchResults.map((result, idx) => (
                      <div
                        key={result.tmdbId || idx}
                        onClick={() => setSelectedResult(result)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          padding: '10px 14px',
                          background: 'var(--bg-surface-2)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          transition: 'all 150ms',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent-gold)';
                          e.currentTarget.style.background = 'var(--bg-surface-3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-subtle)';
                          e.currentTarget.style.background = 'var(--bg-surface-2)';
                        }}
                      >
                        <img
                          src={result.posterPath}
                          alt={result.title}
                          style={{
                            width: 44,
                            height: 66,
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-sm)',
                          }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: 2 }}>
                            {result.title} ({result.releaseYear})
                          </h4>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            <span>{result.director}</span> • <span>{result.genres?.join(', ')}</span>
                          </div>
                          <p
                            style={{
                              fontSize: '0.75rem',
                              color: 'var(--text-dim)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              marginTop: 2,
                            }}
                          >
                            {result.overview}
                          </p>
                        </div>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                          Select
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Selected result preview & personal diary configuration form */
                <form onSubmit={handleSaveSearchedMovie}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Configuring diary entry for:
                    </span>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      style={{ fontSize: '0.8rem', padding: '4px 8px' }}
                      onClick={() => setSelectedResult(null)}
                    >
                      ← Back to Search Results
                    </button>
                  </div>

                  {/* Duplicate Entry Warning Banner (PRD Feature 4 Validation) */}
                  {duplicateMovie && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        background: 'rgba(245, 158, 11, 0.12)',
                        border: '1px solid rgba(245, 158, 11, 0.35)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--accent-gold-light)',
                        fontSize: '0.85rem',
                        marginBottom: '18px',
                      }}
                    >
                      <AlertCircle size={20} style={{ flexShrink: 0 }} />
                      <div>
                        <strong>Notice:</strong> "{duplicateMovie.title}" is already in your CineVault! If you've
                        rewatched it, you can add another viewing or update your review.
                      </div>
                    </div>
                  )}

                  {/* Movie Info Box */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '18px',
                      padding: '14px',
                      background: 'var(--bg-surface-2)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '20px',
                    }}
                  >
                    <img
                      src={selectedResult.posterPath}
                      alt={selectedResult.title}
                      style={{
                        width: 70,
                        height: 105,
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    />
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: 4 }}>
                        {selectedResult.title} ({selectedResult.releaseYear})
                      </h3>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                        <span>Director: {selectedResult.director}</span> •{' '}
                        <span>{selectedResult.genres?.join(', ')}</span>
                      </div>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text-dim)',
                          lineHeight: 1.45,
                          maxHeight: 50,
                          overflow: 'hidden',
                        }}
                      >
                        {selectedResult.overview}
                      </p>
                    </div>
                  </div>

                  {/* Diary Options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Status & Favorite */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                          Library Status:
                        </label>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            type="button"
                            className={`btn ${status === 'watched' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ flex: 1, padding: '8px' }}
                            onClick={() => setStatus('watched')}
                          >
                            <Check size={14} />
                            <span>Watched</span>
                          </button>
                          <button
                            type="button"
                            className={`btn ${status === 'watchlist' ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ flex: 1, padding: '8px' }}
                            onClick={() => setStatus('watchlist')}
                          >
                            <Bookmark size={14} />
                            <span>Watchlist</span>
                          </button>
                        </div>
                      </div>

                      <div style={{ width: 140 }}>
                        <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                          Favorite?
                        </label>
                        <button
                          type="button"
                          className={`btn ${isFavorite ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ width: '100%', padding: '8px' }}
                          onClick={() => setIsFavorite(!isFavorite)}
                        >
                          <Star size={14} fill={isFavorite ? 'currentColor' : 'none'} />
                          <span>{isFavorite ? 'Favorited' : 'No'}</span>
                        </button>
                      </div>
                    </div>

                    {status === 'watched' && (
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                            Personal Rating (1 to 10): <strong>{personalRating}</strong>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            value={personalRating}
                            onChange={(e) => setPersonalRating(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
                          />
                        </div>

                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                            Date Watched:
                          </label>
                          <input
                            type="date"
                            value={dateWatched}
                            onChange={(e) => setDateWatched(e.target.value)}
                            style={{
                              width: '100%',
                              background: 'var(--bg-surface-2)',
                              border: '1px solid var(--border-medium)',
                              padding: '8px 12px',
                              borderRadius: 'var(--radius-sm)',
                              color: '#fff',
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                        Personal Review & Reaction:
                      </label>
                      <textarea
                        value={personalReview}
                        onChange={(e) => setPersonalReview(e.target.value)}
                        placeholder="Write your personal thoughts, memorable scenes, or review..."
                        rows={3}
                        style={{
                          width: '100%',
                          background: 'var(--bg-surface-2)',
                          border: '1px solid var(--border-medium)',
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-md)',
                          color: '#fff',
                          fontFamily: 'var(--font-body)',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                        Tags (comma separated):
                      </label>
                      <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="e.g. Masterpiece, Mind-bending, Comfort movie"
                        style={{
                          width: '100%',
                          background: 'var(--bg-surface-2)',
                          border: '1px solid var(--border-medium)',
                          padding: '8px 12px',
                          borderRadius: 'var(--radius-sm)',
                          color: '#fff',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ padding: '12px', fontSize: '1rem', marginTop: 8 }}
                      id="confirm-add-movie-btn"
                    >
                      <Plus size={18} />
                      <span>Add to My CineVault</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Method B: Manual Entry Form (PRD Feature 4 Method B) */
            <form onSubmit={handleSaveManualMovie} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 2 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    Movie Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Blade Runner"
                    value={manualTitle}
                    onChange={(e) => setManualTitle(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-surface-2)',
                      border: '1px solid var(--border-medium)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    Release Year *
                  </label>
                  <input
                    type="number"
                    required
                    value={manualYear}
                    onChange={(e) => setManualYear(Number(e.target.value))}
                    style={{
                      width: '100%',
                      background: 'var(--bg-surface-2)',
                      border: '1px solid var(--border-medium)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    Director
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ridley Scott"
                    value={manualDirector}
                    onChange={(e) => setManualDirector(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-surface-2)',
                      border: '1px solid var(--border-medium)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                    }}
                  />
                </div>
                <div style={{ width: 140 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    Runtime (min)
                  </label>
                  <input
                    type="number"
                    value={manualRuntime}
                    onChange={(e) => setManualRuntime(Number(e.target.value))}
                    style={{
                      width: '100%',
                      background: 'var(--bg-surface-2)',
                      border: '1px solid var(--border-medium)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                  Genres (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sci-Fi, Mystery, Thriller"
                  value={manualGenres}
                  onChange={(e) => setManualGenres(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface-2)',
                    border: '1px solid var(--border-medium)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                  Poster Image URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://... (leave blank for cinema poster fallback)"
                  value={manualPoster}
                  onChange={(e) => setManualPoster(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface-2)',
                    border: '1px solid var(--border-medium)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                  Plot Synopsis
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief synopsis..."
                  value={manualOverview}
                  onChange={(e) => setManualOverview(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface-2)',
                    border: '1px solid var(--border-medium)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    Personal Rating: {personalRating}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={personalRating}
                    onChange={(e) => setPersonalRating(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>
                    Watch Date:
                  </label>
                  <input
                    type="date"
                    value={dateWatched}
                    onChange={(e) => setDateWatched(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-surface-2)',
                      border: '1px solid var(--border-medium)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '12px', marginTop: 10 }}
              >
                <Plus size={18} />
                <span>Save Movie to Library</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
