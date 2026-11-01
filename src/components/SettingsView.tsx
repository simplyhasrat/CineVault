import React, { useState } from 'react';
import {
  Settings,
  User,
  Key,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  Check,
  Shield,
  Palette,
  ExternalLink,
  Sparkles,
  FileSpreadsheet,
  FileCode
} from 'lucide-react';
import { Movie, UserProfile } from '../types/movie';
import { exportToCsv, exportToJson } from '../services/storageService';

interface SettingsViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  movies: Movie[];
  onImportMovies: (imported: Movie[]) => void;
  onResetLibrary: () => void;
  onClearLibrary: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
];

export const SettingsView: React.FC<SettingsViewProps> = ({
  userProfile,
  onUpdateProfile,
  movies,
  onImportMovies,
  onResetLibrary,
  onClearLibrary,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [handle, setHandle] = useState(userProfile.handle);
  const [bio, setBio] = useState(userProfile.bio);
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl);
  const [tmdbApiKey, setTmdbApiKey] = useState(userProfile.tmdbApiKey || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      name,
      handle,
      bio,
      avatarUrl,
      tmdbApiKey: tmdbApiKey.trim(),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            onImportMovies(parsed);
            alert(`Successfully imported ${parsed.length} movies!`);
          } else {
            alert('Invalid JSON file format. Expected array of movies.');
          }
        } else {
          alert('Currently JSON format is supported for full restore.');
        }
      } catch (err) {
        alert('Failed to parse file: ' + err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="settings-view" style={{ maxWidth: 840, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Preferences & Settings</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Personalize your CineVault profile, configure movie metadata APIs, and manage data backups.
        </p>
      </div>

      {/* User Profile Section */}
      <div className="glass-card" style={{ padding: '28px', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <User size={19} style={{ color: 'var(--accent-gold)' }} />
          <span>Collector Profile</span>
        </h3>

        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Avatar picker */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 8 }}>
              Profile Avatar:
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <img
                src={avatarUrl}
                alt={name}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--accent-gold)',
                }}
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                {PRESET_AVATARS.map((preset, idx) => (
                  <img
                    key={idx}
                    src={preset}
                    alt="preset"
                    onClick={() => setAvatarUrl(preset)}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: avatarUrl === preset ? '2px solid var(--accent-gold)' : '1px solid var(--border-medium)',
                      opacity: avatarUrl === preset ? 1 : 0.65,
                      transition: 'all 150ms',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                Display Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-2)',
                  border: '1px solid var(--border-medium)',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  color: '#fff',
                }}
                required
              />
            </div>

            <div style={{ flex: 1, minWidth: 220 }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                Handle:
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-surface-2)',
                  border: '1px solid var(--border-medium)',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-sm)',
                  color: '#fff',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
              Film Bio / Manifesto:
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others about your cinematic taste..."
              style={{
                width: '100%',
                background: 'var(--bg-surface-2)',
                border: '1px solid var(--border-medium)',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                color: '#fff',
                fontFamily: 'var(--font-body)',
              }}
            />
          </div>

          {/* TMDB API Key Config */}
          <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              <Key size={15} style={{ color: 'var(--accent-gold)' }} />
              <span>TMDB (The Movie Database) API Key (Optional):</span>
            </label>
            <input
              type="text"
              placeholder="Enter your personal TMDB v3 API Key (optional)"
              value={tmdbApiKey}
              onChange={(e) => setTmdbApiKey(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-surface-2)',
                border: '1px solid var(--border-medium)',
                padding: '9px 12px',
                borderRadius: 'var(--radius-sm)',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
              }}
            />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: 6, lineHeight: 1.4 }}>
              If left blank, CineVault automatically uses its built-in offline movie catalog with dozens of curated
              cinematic classics. Adding your own free TMDB API key enables live real-time search across hundreds of
              thousands of global titles.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: 10 }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '9px 22px' }}>
              {isSaved ? <Check size={16} /> : <Check size={16} />}
              <span>{isSaved ? 'Changes Saved!' : 'Save Preferences'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Data Management: Export & Import (PRD Section 8 & Section 10) */}
      <div className="glass-card" style={{ padding: '28px', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Download size={19} style={{ color: 'var(--accent-gold)' }} />
          <span>Library Backup & Portability</span>
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px' }}>
          Your CineVault data is stored directly in your browser. Export backups anytime or export your movie list to CSV
          to view in Excel or Notion.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => exportToJson(movies)}
            id="export-json-btn"
          >
            <FileCode size={16} />
            <span>Export JSON Backup ({movies.length} movies)</span>
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => exportToCsv(movies)}
            id="export-csv-btn"
          >
            <FileSpreadsheet size={16} />
            <span>Export CSV Spreadsheet</span>
          </button>

          <label
            className="btn btn-secondary"
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Upload size={16} />
            <span>Import JSON File</span>
            <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        </div>

        {/* Danger Zone */}
        <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
          <h4 style={{ fontSize: '0.95rem', color: '#fca5a5', marginBottom: '10px' }}>Reset & Recovery Options</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (window.confirm('Restore CineVault to sample showcase movies?')) {
                  onResetLibrary();
                }
              }}
            >
              <RotateCcw size={15} />
              <span>Reload Sample Showcase</span>
            </button>

            <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('Are you sure you want to completely erase your library? This cannot be undone.')) {
                  onClearLibrary();
                }
              }}
            >
              <Trash2 size={15} />
              <span>Clear Entire Library</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
