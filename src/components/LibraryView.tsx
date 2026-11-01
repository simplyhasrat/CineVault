import React, { useState, useMemo } from 'react';
import {
  Search,
  LayoutGrid,
  List,
  Filter,
  X,
  Plus,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Heart,
  Bookmark
} from 'lucide-react';
import { FilterState, Movie, SortField } from '../types/movie';
import { MovieCard } from './MovieCard';

interface LibraryViewProps {
  movies: Movie[];
  initialStatusFilter?: 'all' | 'watched' | 'watchlist' | 'favorites';
  onSelectMovie: (movie: Movie) => void;
  onToggleFavorite: (e: React.MouseEvent, movieId: string) => void;
  onOpenAddModal: () => void;
}

const ALL_GENRES = [
  'All',
  'Sci-Fi',
  'Action',
  'Drama',
  'Thriller',
  'Comedy',
  'Romance',
  'Crime',
  'Animation',
  'Adventure',
  'Mystery',
  'Horror',
  'Music'
];

export const LibraryView: React.FC<LibraryViewProps> = ({
  movies,
  initialStatusFilter = 'all',
  onSelectMovie,
  onToggleFavorite,
  onOpenAddModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'watched' | 'watchlist' | 'favorites'>(
    initialStatusFilter
  );
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortField>('dateWatched_desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sync initialStatusFilter if prop changes (e.g. clicked from nav)
  React.useEffect(() => {
    setStatusFilter(initialStatusFilter);
  }, [initialStatusFilter]);

  // Filtered and Sorted list
  const filteredMovies = useMemo(() => {
    return movies
      .filter((movie) => {
        // Status filter
        if (statusFilter === 'watched' && movie.status !== 'watched') return false;
        if (statusFilter === 'watchlist' && movie.status !== 'watchlist') return false;
        if (statusFilter === 'favorites' && !movie.isFavorite) return false;

        // Genre filter
        if (selectedGenre !== 'All') {
          if (!movie.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase())) {
            return false;
          }
        }

        // Min rating filter (only applies if movie has personalRating or tmdbRating)
        if (minRating > 0) {
          const rating = movie.personalRating || movie.tmdbRating || 0;
          if (rating < minRating) return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = movie.title.toLowerCase().includes(q);
          const matchDirector = movie.director.toLowerCase().includes(q);
          const matchCast = movie.cast?.some((actor) => actor.toLowerCase().includes(q));
          const matchTag = movie.tags?.some((tag) => tag.toLowerCase().includes(q));
          if (!matchTitle && !matchDirector && !matchCast && !matchTag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'dateWatched_desc':
            return (b.dateWatched || b.dateAdded || '').localeCompare(a.dateWatched || a.dateAdded || '');
          case 'dateWatched_asc':
            return (a.dateWatched || a.dateAdded || '').localeCompare(b.dateWatched || b.dateAdded || '');
          case 'rating_desc':
            return (b.personalRating || b.tmdbRating || 0) - (a.personalRating || a.tmdbRating || 0);
          case 'rating_asc':
            return (a.personalRating || a.tmdbRating || 0) - (b.personalRating || b.tmdbRating || 0);
          case 'title_asc':
            return a.title.localeCompare(b.title);
          case 'title_desc':
            return b.title.localeCompare(a.title);
          case 'year_desc':
            return (b.releaseYear || 0) - (a.releaseYear || 0);
          case 'year_asc':
            return (a.releaseYear || 0) - (b.releaseYear || 0);
          case 'runtime_desc':
            return (b.runtimeMinutes || 0) - (a.runtimeMinutes || 0);
          default:
            return 0;
        }
      });
  }, [movies, statusFilter, selectedGenre, minRating, searchQuery, sortBy]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedGenre !== 'All' ||
    minRating > 0 ||
    statusFilter !== 'all';

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setMinRating(0);
    setStatusFilter('all');
  };

  return (
    <div className="library-view">
      {/* Top Filter & Search Controls (PRD Feature 5) */}
      <div className="filter-bar">
        <div className="filter-row-top">
          {/* Search Bar */}
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by title, director, cast, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="library-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Status Tabs */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-surface-2)',
              padding: '4px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              className={`genre-pill ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              All ({movies.length})
            </button>
            <button
              className={`genre-pill ${statusFilter === 'watched' ? 'active' : ''}`}
              onClick={() => setStatusFilter('watched')}
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              Watched ({movies.filter((m) => m.status === 'watched').length})
            </button>
            <button
              className={`genre-pill ${statusFilter === 'favorites' ? 'active' : ''}`}
              onClick={() => setStatusFilter('favorites')}
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              Favorites ({movies.filter((m) => m.isFavorite).length})
            </button>
            <button
              className={`genre-pill ${statusFilter === 'watchlist' ? 'active' : ''}`}
              onClick={() => setStatusFilter('watchlist')}
              style={{ borderRadius: 'var(--radius-sm)' }}
            >
              Watchlist ({movies.filter((m) => m.status === 'watchlist').length})
            </button>
          </div>

          {/* Min Rating Filter */}
          <select
            className="filter-select"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            id="rating-filter-select"
          >
            <option value={0}>Rating: Any</option>
            <option value={9}>★ 9.0+ Masterpiece</option>
            <option value={8}>★ 8.0+ Great</option>
            <option value={7}>★ 7.0+ Good</option>
          </select>

          {/* Sort By Dropdown */}
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortField)}
            id="sort-select"
          >
            <option value="dateWatched_desc">Recently Watched</option>
            <option value="dateWatched_asc">Oldest Watched</option>
            <option value="rating_desc">Highest Rated</option>
            <option value="rating_asc">Lowest Rated</option>
            <option value="year_desc">Release Year: Newest</option>
            <option value="year_asc">Release Year: Oldest</option>
            <option value="title_asc">Title: A to Z</option>
            <option value="title_desc">Title: Z to A</option>
            <option value="runtime_desc">Longest Runtime</option>
          </select>

          {/* View Mode Toggle (Grid vs List) */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-surface-2)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              padding: '2px',
            }}
          >
            <button
              onClick={() => setViewMode('grid')}
              className={`btn-ghost ${viewMode === 'grid' ? 'active' : ''}`}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                color: viewMode === 'grid' ? 'var(--accent-gold)' : 'var(--text-muted)',
                background: viewMode === 'grid' ? 'var(--bg-surface-3)' : 'transparent',
              }}
              title="Poster Grid View (2:3)"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`btn-ghost ${viewMode === 'list' ? 'active' : ''}`}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                color: viewMode === 'list' ? 'var(--accent-gold)' : 'var(--text-muted)',
                background: viewMode === 'list' ? 'var(--bg-surface-3)' : 'transparent',
              }}
              title="Compact List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Genre Filter Pills */}
        <div className="pills-container">
          {ALL_GENRES.map((genre) => (
            <button
              key={genre}
              className={`genre-pill ${selectedGenre === genre ? 'active' : ''}`}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: 600,
                marginLeft: 'auto',
                whiteSpace: 'nowrap',
              }}
            >
              <X size={13} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Gallery Header Info */}
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 className="section-title">
            {statusFilter === 'favorites' ? 'Favorite Films' : statusFilter === 'watchlist' ? 'Watchlist' : 'Movie Gallery'}
          </h2>
          <span className="section-count">
            Showing {filteredMovies.length} of {movies.length}
          </span>
        </div>

        <button className="btn btn-primary" onClick={onOpenAddModal} style={{ padding: '7px 14px' }}>
          <Plus size={16} />
          <span>Add Film</span>
        </button>
      </div>

      {/* Movies Content */}
      {filteredMovies.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Filter size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: 8 }}>No matching movies found</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20, maxWidth: 460 }}>
            {hasActiveFilters
              ? "We couldn't find any films matching your active search and filter combinations."
              : 'Your CineVault is empty! Add your first movie to get started.'}
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            {hasActiveFilters && (
              <button className="btn btn-secondary" onClick={clearAllFilters}>
                <X size={15} />
                <span>Clear All Filters</span>
              </button>
            )}
            <button className="btn btn-primary" onClick={onOpenAddModal}>
              <Plus size={16} />
              <span>Add a Movie</span>
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="poster-grid">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onToggleFavorite={onToggleFavorite}
              viewMode="grid"
            />
          ))}
        </div>
      ) : (
        <div className="movie-list-view">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onToggleFavorite={onToggleFavorite}
              viewMode="list"
            />
          ))}
        </div>
      )}
    </div>
  );
};
