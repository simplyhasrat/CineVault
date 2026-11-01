import { CollectionStats, Movie, UserProfile } from '../types/movie';
import { INITIAL_MOVIES, INITIAL_USER_PROFILE } from '../data/initialMovies';

const STORAGE_KEY_MOVIES = 'cinevault_movies_v1';
const STORAGE_KEY_PROFILE = 'cinevault_profile_v1';

export function loadMovies(): Movie[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_MOVIES);
    if (!data) {
      saveMovies(INITIAL_MOVIES);
      return INITIAL_MOVIES;
    }
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_MOVIES;
  } catch (err) {
    console.error('Error loading movies from localStorage', err);
    return INITIAL_MOVIES;
  }
}

export function saveMovies(movies: Movie[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_MOVIES, JSON.stringify(movies));
  } catch (err) {
    console.error('Error saving movies to localStorage', err);
  }
}

export function loadProfile(): UserProfile {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (!data) {
      saveProfile(INITIAL_USER_PROFILE);
      return INITIAL_USER_PROFILE;
    }
    return { ...INITIAL_USER_PROFILE, ...JSON.parse(data) };
  } catch (err) {
    console.error('Error loading profile from localStorage', err);
    return INITIAL_USER_PROFILE;
  }
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Error saving profile to localStorage', err);
  }
}

export function resetLibrary(): Movie[] {
  saveMovies(INITIAL_MOVIES);
  return INITIAL_MOVIES;
}

export function exportToJson(movies: Movie[]): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(movies, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `cinevault_backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportToCsv(movies: Movie[]): void {
  const headers = [
    'Title',
    'Release Year',
    'Director',
    'Genres',
    'Runtime (Mins)',
    'Status',
    'Personal Rating',
    'Watch Date',
    'Favorite',
    'Tags',
    'Personal Review'
  ];

  const escapeCsv = (val: string | number | undefined | boolean): string => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = movies.map((m) => [
    escapeCsv(m.title),
    escapeCsv(m.releaseYear),
    escapeCsv(m.director),
    escapeCsv(m.genres.join(', ')),
    escapeCsv(m.runtimeMinutes),
    escapeCsv(m.status),
    escapeCsv(m.personalRating ?? ''),
    escapeCsv(m.dateWatched ?? ''),
    escapeCsv(m.isFavorite ? 'Yes' : 'No'),
    escapeCsv(m.tags.join(', ')),
    escapeCsv(m.personalReview ?? '')
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', encodedUri);
  downloadAnchor.setAttribute('download', `cinevault_collection_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function calculateCollectionStats(movies: Movie[]): CollectionStats {
  const watchedMovies = movies.filter((m) => m.status === 'watched');
  const watchlistMovies = movies.filter((m) => m.status === 'watchlist');
  const favoriteMovies = movies.filter((m) => m.isFavorite);

  // Total runtime in minutes
  const totalMinutes = watchedMovies.reduce((acc, m) => acc + (m.runtimeMinutes || 0), 0);
  const totalHours = Math.round(totalMinutes / 60);
  const totalDays = (totalMinutes / (60 * 24)).toFixed(1);

  // Average rating
  const ratedMovies = watchedMovies.filter((m) => typeof m.personalRating === 'number' && m.personalRating > 0);
  const avgRating =
    ratedMovies.length > 0
      ? Number((ratedMovies.reduce((acc, m) => acc + (m.personalRating || 0), 0) / ratedMovies.length).toFixed(1))
      : 0;

  // Highest rated movies (top 5)
  const highestRated = [...ratedMovies]
    .sort((a, b) => (b.personalRating || 0) - (a.personalRating || 0))
    .slice(0, 5);

  // Genre breakdown
  const genreCounts: { [genre: string]: number } = {};
  watchedMovies.forEach((m) => {
    m.genres.forEach((g) => {
      genreCounts[g] = (genreCounts[g] || 0) + 1;
    });
  });

  // Rating distribution (1 to 10 rounded)
  const ratingDistribution: { [rating: number]: number } = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0
  };
  ratedMovies.forEach((m) => {
    const rounded = Math.min(10, Math.max(1, Math.round(m.personalRating || 0)));
    ratingDistribution[rounded] = (ratingDistribution[rounded] || 0) + 1;
  });

  // Decades count
  const decadesCount: { [decade: string]: number } = {};
  watchedMovies.forEach((m) => {
    if (m.releaseYear) {
      const decade = `${Math.floor(m.releaseYear / 10) * 10}s`;
      decadesCount[decade] = (decadesCount[decade] || 0) + 1;
    }
  });

  // Top directors
  const directorMap: { [name: string]: { count: number; totalRating: number; ratedCount: number } } = {};
  watchedMovies.forEach((m) => {
    if (m.director) {
      // Split if multiple directors
      const directors = m.director.split(',').map((d) => d.trim());
      directors.forEach((d) => {
        if (!directorMap[d]) {
          directorMap[d] = { count: 0, totalRating: 0, ratedCount: 0 };
        }
        directorMap[d].count += 1;
        if (m.personalRating) {
          directorMap[d].totalRating += m.personalRating;
          directorMap[d].ratedCount += 1;
        }
      });
    }
  });

  const topDirectors = Object.entries(directorMap)
    .map(([name, data]) => ({
      name,
      count: data.count,
      avgRating: data.ratedCount > 0 ? Number((data.totalRating / data.ratedCount).toFixed(1)) : 0
    }))
    .sort((a, b) => b.count - a.count || b.avgRating - a.avgRating)
    .slice(0, 6);

  // Top actors
  const actorMap: { [name: string]: number } = {};
  watchedMovies.forEach((m) => {
    if (m.cast && Array.isArray(m.cast)) {
      m.cast.slice(0, 4).forEach((actor) => {
        actorMap[actor] = (actorMap[actor] || 0) + 1;
      });
    }
  });

  const topActors = Object.entries(actorMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // Monthly watched activity
  const monthMap: { [month: string]: number } = {};
  watchedMovies.forEach((m) => {
    if (m.dateWatched) {
      const monthKey = m.dateWatched.substring(0, 7); // YYYY-MM
      monthMap[monthKey] = (monthMap[monthKey] || 0) + 1;
    }
  });

  const monthlyWatched = Object.entries(monthMap)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-8); // Last 8 active months

  return {
    totalWatched: watchedMovies.length,
    totalWatchlist: watchlistMovies.length,
    totalFavorites: favoriteMovies.length,
    totalMinutes,
    totalHours,
    totalDays,
    averageRating: avgRating,
    highestRated,
    genreCounts,
    ratingDistribution,
    decadesCount,
    topDirectors,
    topActors,
    monthlyWatched
  };
}
