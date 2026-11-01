export interface RewatchEntry {
  id: string;
  watchedAt: string; // YYYY-MM-DD
  notes?: string;
  rating?: number; // Optional rewatch rating
}

export interface Movie {
  id: string; // Unique identifier in user collection (UUID)
  tmdbId?: number; // External TMDB ID if linked
  title: string;
  originalTitle?: string;
  releaseDate: string; // YYYY-MM-DD
  releaseYear: number;
  overview: string;
  posterPath: string; // Full URL or TMDB path
  backdropPath?: string; // Full URL or TMDB path
  runtimeMinutes: number; // e.g. 148
  language: string; // e.g. "English" or "Korean"
  director: string;
  genres: string[]; // e.g. ["Sci-Fi", "Action", "Thriller"]
  cast: string[]; // e.g. ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
  imdbRating?: number; // External rating e.g. 8.8
  tmdbRating?: number; // TMDB rating e.g. 8.4

  // User collection fields (PRD Section 4 & 9)
  status: 'watched' | 'watchlist';
  personalRating?: number; // 0.5 to 10 (or 0-10)
  personalReview?: string;
  isFavorite: boolean;
  dateAdded: string; // ISO string
  dateWatched?: string; // YYYY-MM-DD
  rewatchHistory: RewatchEntry[];
  tags: string[]; // e.g. ["Comfort movie", "Mind-bending", "With Friends"]
}

export type SortField =
  | 'dateWatched_desc'
  | 'dateWatched_asc'
  | 'rating_desc'
  | 'rating_asc'
  | 'title_asc'
  | 'title_desc'
  | 'year_desc'
  | 'year_asc'
  | 'runtime_desc';

export interface FilterState {
  searchQuery: string;
  status: 'all' | 'watched' | 'watchlist' | 'favorites';
  genre: string; // 'all' or specific genre
  minRating: number; // 0 for any, 7+, 8+, 9+, etc.
  yearRange: [number, number]; // [1920, 2030]
  selectedTag: string; // 'all' or tag
  sortBy: SortField;
  viewMode: 'grid' | 'list';
}

export interface UserProfile {
  name: string;
  handle: string;
  avatarUrl: string;
  bio: string;
  favoriteGenres: string[];
  tmdbApiKey?: string;
  themeAccent: 'gold' | 'amber' | 'emerald' | 'cyan' | 'crimson' | 'purple';
}

export interface CollectionStats {
  totalWatched: number;
  totalWatchlist: number;
  totalFavorites: number;
  totalMinutes: number;
  totalHours: number;
  totalDays: string;
  averageRating: number;
  highestRated: Movie[];
  genreCounts: { [genre: string]: number };
  ratingDistribution: { [rating: number]: number }; // 1-10
  decadesCount: { [decade: string]: number };
  topDirectors: { name: string; count: number; avgRating: number }[];
  topActors: { name: string; count: number }[];
  monthlyWatched: { month: string; count: number }[];
}
