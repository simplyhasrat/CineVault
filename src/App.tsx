import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Movie, UserProfile } from './types/movie';
import {
  calculateCollectionStats,
  loadMovies,
  loadProfile,
  resetLibrary,
  saveMovies,
  saveProfile
} from './services/storageService';
import { Header, NavTab } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { LibraryView } from './components/LibraryView';
import { StatsView } from './components/StatsView';
import { SettingsView } from './components/SettingsView';
import { MovieDetailModal } from './components/MovieDetailModal';
import { AddMovieModal } from './components/AddMovieModal';
import { CheckCircle2, Film } from 'lucide-react';

export const App: React.FC = () => {
  // Collection & Profile State
  const [movies, setMovies] = useState<Movie[]>(() => loadMovies());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadProfile());

  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // Modals State
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sync movies to storage
  const updateMoviesState = (newMovies: Movie[]) => {
    setMovies(newMovies);
    saveMovies(newMovies);
  };

  // Sync profile to storage
  const handleUpdateProfile = (newProfile: UserProfile) => {
    setUserProfile(newProfile);
    saveProfile(newProfile);
    showToast('Profile updated successfully!');
  };

  // Calculate live statistics
  const stats = useMemo(() => calculateCollectionStats(movies), [movies]);

  // Handlers for Movie Actions
  const handleToggleFavorite = (e: React.MouseEvent, movieId: string) => {
    e.stopPropagation();
    const updated = movies.map((m) => {
      if (m.id === movieId) {
        const nextFav = !m.isFavorite;
        showToast(nextFav ? `Added "${m.title}" to Favorites!` : `Removed "${m.title}" from Favorites.`);
        return { ...m, isFavorite: nextFav };
      }
      return m;
    });
    updateMoviesState(updated);
  };

  const handleAddMovie = (newMovie: Movie) => {
    const updated = [newMovie, ...movies];
    updateMoviesState(updated);
    showToast(`"${newMovie.title}" logged in CineVault!`);

    // Festive confetti pop
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f59e0b', '#fbbf24', '#ffffff', '#eab308']
      });
    } catch (e) {
      // Confetti fallback
    }
  };

  const handleUpdateMovie = (updatedMovie: Movie) => {
    const updated = movies.map((m) => (m.id === updatedMovie.id ? updatedMovie : m));
    updateMoviesState(updated);
    setSelectedMovie(updatedMovie);
    showToast(`Updated details for "${updatedMovie.title}".`);
  };

  const handleDeleteMovie = (movieId: string) => {
    const target = movies.find((m) => m.id === movieId);
    const updated = movies.filter((m) => m.id !== movieId);
    updateMoviesState(updated);
    showToast(`Removed "${target?.title || 'Movie'}" from library.`);
  };

  const handleResetToSample = () => {
    const sample = resetLibrary();
    setMovies(sample);
    showToast('Restored sample showcase collection.');
  };

  const handleClearLibrary = () => {
    updateMoviesState([]);
    showToast('All movies have been cleared.');
  };

  const handleImportMovies = (importedList: Movie[]) => {
    updateMoviesState(importedList);
    showToast(`Successfully imported ${importedList.length} movies!`);
  };

  // Keyboard shortcut: Escape closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMovie(null);
        setIsAddModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-container">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        userProfile={userProfile}
        watchedCount={stats.totalWatched}
        favoriteCount={stats.totalFavorites}
        watchlistCount={stats.totalWatchlist}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <DashboardView
            movies={movies}
            stats={stats}
            userProfile={userProfile}
            onSelectMovie={setSelectedMovie}
            onToggleFavorite={handleToggleFavorite}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onNavigateToLibrary={() => setActiveTab('library')}
            onNavigateToFavorites={() => setActiveTab('favorites')}
          />
        )}

        {activeTab === 'library' && (
          <LibraryView
            movies={movies}
            initialStatusFilter="all"
            onSelectMovie={setSelectedMovie}
            onToggleFavorite={handleToggleFavorite}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {activeTab === 'favorites' && (
          <LibraryView
            movies={movies}
            initialStatusFilter="favorites"
            onSelectMovie={setSelectedMovie}
            onToggleFavorite={handleToggleFavorite}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {activeTab === 'watchlist' && (
          <LibraryView
            movies={movies}
            initialStatusFilter="watchlist"
            onSelectMovie={setSelectedMovie}
            onToggleFavorite={handleToggleFavorite}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {activeTab === 'stats' && (
          <StatsView
            stats={stats}
            movies={movies}
            onSelectMovie={setSelectedMovie}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            movies={movies}
            onImportMovies={handleImportMovies}
            onResetLibrary={handleResetToSample}
            onClearLibrary={handleClearLibrary}
          />
        )}
      </main>

      {/* Movie Detail Modal / Information Page (Feature 3) */}
      <MovieDetailModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onUpdateMovie={handleUpdateMovie}
        onDeleteMovie={handleDeleteMovie}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Add Movie Modal (Feature 4) */}
      <AddMovieModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMovie={handleAddMovie}
        existingMovies={movies}
        userProfile={userProfile}
      />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <CheckCircle2 size={18} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '24px',
          textAlign: 'center',
          color: 'var(--text-dim)',
          fontSize: '0.82rem',
          background: 'rgba(8, 9, 12, 0.95)',
        }}
      >
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Film size={16} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>CineVault</span>
            <span>— The Personal Film Diary & Library</span>
          </div>
          <div>
            Built with modern React, TypeScript & TMDB Metadata
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
