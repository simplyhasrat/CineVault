import { Movie, UserProfile } from '../types/movie';
import userMoviesData from './userMovies.json';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Hasrat Marwaha',
  handle: '@simplyhasrat',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Cinephile diary & personal archive spanning 1,000+ films across global cinema, anime, and Indian cinema.',
  favoriteGenres: ['Sci-Fi', 'Thriller', 'Horror', 'Drama', 'Animation', 'Romance'],
  tmdbApiKey: '',
  themeAccent: 'gold',
};

export const INITIAL_MOVIES: Movie[] = userMoviesData as Movie[];
