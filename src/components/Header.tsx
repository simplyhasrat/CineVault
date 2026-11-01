import React from 'react';
import { Film, Compass, Heart, Bookmark, BarChart3, Settings, Plus, Sparkles } from 'lucide-react';
import { UserProfile } from '../types/movie';

export type NavTab = 'dashboard' | 'library' | 'favorites' | 'watchlist' | 'stats' | 'settings';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenAddModal: () => void;
  userProfile: UserProfile;
  watchedCount: number;
  favoriteCount: number;
  watchlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenAddModal,
  userProfile,
  watchedCount,
  favoriteCount,
  watchlistCount
}) => {
  return (
    <header className="header-wrapper">
      <div className="header-inner">
        {/* Brand Logo */}
        <div className="brand-logo" onClick={() => onTabChange('dashboard')}>
          <div className="brand-icon">
            <Film size={22} strokeWidth={2.5} />
          </div>
          <div className="brand-name">
            CineVault
            <span className="brand-badge">Diary</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-links">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onTabChange('dashboard')}
          >
            <Compass size={17} />
            <span>Dashboard</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => onTabChange('library')}
          >
            <Film size={17} />
            <span>My Library</span>
            {watchedCount > 0 && <span className="section-count">{watchedCount}</span>}
          </button>

          <button
            className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => onTabChange('favorites')}
          >
            <Heart size={17} />
            <span>Favorites</span>
            {favoriteCount > 0 && <span className="section-count">{favoriteCount}</span>}
          </button>

          <button
            className={`nav-item ${activeTab === 'watchlist' ? 'active' : ''}`}
            onClick={() => onTabChange('watchlist')}
          >
            <Bookmark size={17} />
            <span>Watchlist</span>
            {watchlistCount > 0 && <span className="section-count">{watchlistCount}</span>}
          </button>

          <button
            className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => onTabChange('stats')}
          >
            <BarChart3 size={17} />
            <span>Stats</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => onTabChange('settings')}
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <button className="btn btn-primary" onClick={onOpenAddModal} id="add-movie-nav-btn">
            <Plus size={18} strokeWidth={2.5} />
            <span>Add Movie</span>
          </button>

          {/* User Profile Pill */}
          <div
            className="user-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px 10px 4px 6px',
              background: 'var(--bg-surface-2)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer'
            }}
            onClick={() => onTabChange('settings')}
            title="Profile & Settings"
          >
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {userProfile.name.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
