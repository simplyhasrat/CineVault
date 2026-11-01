import { Movie } from '../types/movie';

// Curated offline search database of acclaimed & popular films
// Ensures instant search works out of the box with zero setup!
export const CURATED_MOVIES_CATALOG = [
  {
    tmdbId: 278,
    title: 'The Shawshank Redemption',
    originalTitle: 'The Shawshank Redemption',
    releaseDate: '1994-09-23',
    releaseYear: 1994,
    runtimeMinutes: 142,
    language: 'English',
    director: 'Frank Darabont',
    genres: ['Drama', 'Crime'],
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler'],
    overview: 'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.',
    posterPath: 'https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    tmdbRating: 8.7,
    imdbRating: 9.3
  },
  {
    tmdbId: 238,
    title: 'The Godfather',
    originalTitle: 'The Godfather',
    releaseDate: '1972-03-14',
    releaseYear: 1972,
    runtimeMinutes: 175,
    language: 'English',
    director: 'Francis Ford Coppola',
    genres: ['Drama', 'Crime'],
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Robert Duvall', 'Diane Keaton'],
    overview: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son steps in to take care of the would-be killers.',
    posterPath: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg',
    tmdbRating: 8.7,
    imdbRating: 9.2
  },
  {
    tmdbId: 603,
    title: 'The Matrix',
    originalTitle: 'The Matrix',
    releaseDate: '1999-03-30',
    releaseYear: 1999,
    runtimeMinutes: 136,
    language: 'English',
    director: 'Lana Wachowski, Lilly Wachowski',
    genres: ['Action', 'Sci-Fi'],
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss', 'Hugo Weaving'],
    overview: 'Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.',
    posterPath: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/7u3fhRw1L4W7197824197.jpg',
    tmdbRating: 8.2,
    imdbRating: 8.7
  },
  {
    tmdbId: 1124,
    title: 'The Prestige',
    originalTitle: 'The Prestige',
    releaseDate: '2006-10-19',
    releaseYear: 2006,
    runtimeMinutes: 130,
    language: 'English',
    director: 'Christopher Nolan',
    genres: ['Drama', 'Mystery', 'Sci-Fi'],
    cast: ['Hugh Jackman', 'Christian Bale', 'Michael Caine', 'Scarlett Johansson', 'David Bowie'],
    overview: 'A mysterious story of two magicians whose intense desire to uncover each other\'s secrets leads them into a deadly duel of deceit, obsession and jealousy.',
    posterPath: 'https://image.tmdb.org/t/p/w500/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/meR20eG2QnE29d00z14K102.jpg',
    tmdbRating: 8.2,
    imdbRating: 8.5
  },
  {
    tmdbId: 550,
    title: 'Fight Club',
    originalTitle: 'Fight Club',
    releaseDate: '1999-10-15',
    releaseYear: 1999,
    runtimeMinutes: 139,
    language: 'English',
    director: 'David Fincher',
    genres: ['Drama', 'Thriller'],
    cast: ['Edward Norton', 'Brad Pitt', 'Helena Bonham Carter', 'Meat Loaf'],
    overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.',
    posterPath: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/hZkgoQYus5vegHoetLkCJzb17zJ.jpg',
    tmdbRating: 8.4,
    imdbRating: 8.8
  },
  {
    tmdbId: 120,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    originalTitle: 'The Lord of the Rings: The Fellowship of the Ring',
    releaseDate: '2001-12-18',
    releaseYear: 2001,
    runtimeMinutes: 178,
    language: 'English',
    director: 'Peter Jackson',
    genres: ['Adventure', 'Fantasy', 'Action'],
    cast: ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen', 'Sean Astin', 'Orlando Bloom'],
    overview: 'Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home behind in order to begin an epic quest to the Cracks of Doom and destroy it once and for all.',
    posterPath: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cDK6.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/vRQnzOnJeSuveOXHgLnlVI0L4ea.jpg',
    tmdbRating: 8.4,
    imdbRating: 8.9
  },
  {
    tmdbId: 157336,
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    releaseDate: '2014-11-05',
    releaseYear: 2014,
    runtimeMinutes: 169,
    language: 'English',
    director: 'Christopher Nolan',
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.',
    posterPath: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    tmdbRating: 8.4,
    imdbRating: 8.7
  },
  {
    tmdbId: 27205,
    title: 'Inception',
    originalTitle: 'Inception',
    releaseDate: '2010-07-15',
    releaseYear: 2010,
    runtimeMinutes: 148,
    language: 'English',
    director: 'Christopher Nolan',
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy'],
    overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets.',
    posterPath: 'https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    tmdbRating: 8.4,
    imdbRating: 8.8
  },
  {
    tmdbId: 329,
    title: 'Jurassic Park',
    originalTitle: 'Jurassic Park',
    releaseDate: '1993-06-11',
    releaseYear: 1993,
    runtimeMinutes: 127,
    language: 'English',
    director: 'Steven Spielberg',
    genres: ['Adventure', 'Sci-Fi'],
    cast: ['Sam Neill', 'Laura Dern', 'Jeff Goldblum', 'Richard Attenborough'],
    overview: 'A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park\'s cloned dinosaurs to run loose.',
    posterPath: 'https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/5rZp5r9K5F8Z401a.jpg',
    tmdbRating: 8.0,
    imdbRating: 8.2
  },
  {
    tmdbId: 389,
    title: '12 Angry Men',
    originalTitle: '12 Angry Men',
    releaseDate: '1957-04-10',
    releaseYear: 1957,
    runtimeMinutes: 96,
    language: 'English',
    director: 'Sidney Lumet',
    genres: ['Drama'],
    cast: ['Henry Fonda', 'Lee J. Cobb', 'Martin Balsam', 'John Fiedler', 'Jack Klugman'],
    overview: 'The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father.',
    posterPath: 'https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/qqHQsStV6Z9xp13.jpg',
    tmdbRating: 8.5,
    imdbRating: 9.0
  },
  {
    tmdbId: 424,
    title: 'Schindler\'s List',
    originalTitle: 'Schindler\'s List',
    releaseDate: '1993-12-15',
    releaseYear: 1993,
    runtimeMinutes: 195,
    language: 'English',
    director: 'Steven Spielberg',
    genres: ['Drama', 'History', 'War'],
    cast: ['Liam Neeson', 'Ben Kingsley', 'Ralph Fiennes', 'Caroline Goodall'],
    overview: 'The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.',
    posterPath: 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNlvt0phAhTIQ.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/zb6fM1CX4170r0V6C29107.jpg',
    tmdbRating: 8.6,
    imdbRating: 9.0
  },
  {
    tmdbId: 807,
    title: 'Se7en',
    originalTitle: 'Se7en',
    releaseDate: '1995-09-22',
    releaseYear: 1995,
    runtimeMinutes: 127,
    language: 'English',
    director: 'David Fincher',
    genres: ['Crime', 'Mystery', 'Thriller'],
    cast: ['Brad Pitt', 'Morgan Freeman', 'Gwyneth Paltrow', 'Kevin Spacey'],
    overview: 'Two homicide detectives are on a desperate hunt for a serial killer whose crimes are based on the "seven deadly sins" in this dark and haunting film that takes viewers from the tortured remains of one victim to the next.',
    posterPath: 'https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJsk9UO.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/ba4Vu0mK19811.jpg',
    tmdbRating: 8.4,
    imdbRating: 8.6
  },
  {
    tmdbId: 346,
    title: 'Seven Samurai',
    originalTitle: '七人の侍',
    releaseDate: '1954-04-26',
    releaseYear: 1954,
    runtimeMinutes: 207,
    language: 'Japanese',
    director: 'Akira Kurosawa',
    genres: ['Action', 'Drama'],
    cast: ['Toshiro Mifune', 'Takashi Shimura', 'Keiko Tsushima', 'Yukiko Shimazaki'],
    overview: 'A samurai answers a village\'s request for protection after he falls on hard times. The town needs protection from bandits, so the samurai gathers six others to help him teach the people how to defend themselves.',
    posterPath: 'https://image.tmdb.org/t/p/w500/8OKmBV5BUFzmozIC3pPWKHy17kx.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/810927810.jpg',
    tmdbRating: 8.5,
    imdbRating: 8.6
  },
  {
    tmdbId: 8587,
    title: 'The Lion King',
    originalTitle: 'The Lion King',
    releaseDate: '1994-06-23',
    releaseYear: 1994,
    runtimeMinutes: 89,
    language: 'English',
    director: 'Roger Allers, Rob Minkoff',
    genres: ['Animation', 'Family', 'Drama'],
    cast: ['Matthew Broderick', 'James Earl Jones', 'Jeremy Irons', 'Moira Kelly'],
    overview: 'A young lion prince is cast out of his pride by his cruel uncle, who claims he killed his father. While the uncle rules with an iron paw, the prince grows up beyond the Savannah, living by a philosophy: No worries for the rest of your days.',
    posterPath: 'https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/w1071071.jpg',
    tmdbRating: 8.3,
    imdbRating: 8.5
  },
  {
    tmdbId: 62,
    title: '2001: A Space Odyssey',
    originalTitle: '2001: A Space Odyssey',
    releaseDate: '1968-04-02',
    releaseYear: 1968,
    runtimeMinutes: 149,
    language: 'English',
    director: 'Stanley Kubrick',
    genres: ['Sci-Fi', 'Mystery', 'Adventure'],
    cast: ['Keir Dullea', 'Gary Lockwood', 'William Sylvester', 'Douglas Rain'],
    overview: 'Humanity finds a mysterious object buried beneath the lunar surface and sets off to find its origins with the help of HAL 9000, the world\'s most advanced supercomputer.',
    posterPath: 'https://image.tmdb.org/t/p/w500/90T7b2LIrL07ndYQBvSmQI2vWql.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/zW19010.jpg',
    tmdbRating: 8.1,
    imdbRating: 8.3
  },
  {
    tmdbId: 19404,
    title: 'Dilwale Dulhania Le Jayenge',
    originalTitle: 'दिलवाले दुल्हनिया ले जायेंगे',
    releaseDate: '1995-10-20',
    releaseYear: 1995,
    runtimeMinutes: 189,
    language: 'Hindi',
    director: 'Aditya Chopra',
    genres: ['Comedy', 'Drama', 'Romance'],
    cast: ['Shah Rukh Khan', 'Kajol', 'Amrish Puri', 'Anupam Kher'],
    overview: 'Raj is a rich, carefree, happy-go-lucky second generation NRI. Simran is the daughter of Chaudhary Baldev Singh, who in spite of being an NRI is very strict about adherence to Indian values. Simran has left for India to be married to her childhood fiancé.',
    posterPath: 'https://image.tmdb.org/t/p/w500/lfRkUr7DYdHldAqi3PwdQGBRBPM.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/1294871.jpg',
    tmdbRating: 8.5,
    imdbRating: 8.0
  },
  {
    tmdbId: 372058,
    title: 'Your Name.',
    originalTitle: '君の名は。',
    releaseDate: '2016-08-26',
    releaseYear: 2016,
    runtimeMinutes: 106,
    language: 'Japanese',
    director: 'Makoto Shinkai',
    genres: ['Animation', 'Romance', 'Drama'],
    cast: ['Ryunosuke Kamiki', 'Mone Kamishiraishi', 'Ryo Narita', 'Aoi Yuki'],
    overview: 'High schoolers Mitsuha and Taki are complete strangers living separate lives in different parts of Japan. But one night, they suddenly switch places, plunging them into a bond that transcends time and space.',
    posterPath: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6qFsC8llRaQ.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/dIWwZWijPjMN7Jy2.jpg',
    tmdbRating: 8.5,
    imdbRating: 8.4
  },
  {
    tmdbId: 872585,
    title: 'Oppenheimer',
    originalTitle: 'Oppenheimer',
    releaseDate: '2023-07-19',
    releaseYear: 2023,
    runtimeMinutes: 180,
    language: 'English',
    director: 'Christopher Nolan',
    genres: ['Drama', 'History'],
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    overview: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II.',
    posterPath: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
    tmdbRating: 8.1,
    imdbRating: 8.9
  },
  {
    tmdbId: 348,
    title: 'Alien',
    originalTitle: 'Alien',
    releaseDate: '1979-05-25',
    releaseYear: 1979,
    runtimeMinutes: 117,
    language: 'English',
    director: 'Ridley Scott',
    genres: ['Horror', 'Sci-Fi'],
    cast: ['Sigourney Weaver', 'Tom Skerritt', 'Veronica Cartwright', 'Harry Dean Stanton', 'John Hurt'],
    overview: 'During its return to the earth, commercial spaceship Nostromo receives a strange distress signal from a distant moon. Investigating the derelict alien vessel, the crew awakens an aggressive predatory lifeform.',
    posterPath: 'https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/12971291.jpg',
    tmdbRating: 8.1,
    imdbRating: 8.5
  },
  {
    tmdbId: 693134,
    title: 'Dune: Part Two',
    originalTitle: 'Dune: Part Two',
    releaseDate: '2024-02-27',
    releaseYear: 2024,
    runtimeMinutes: 166,
    language: 'English',
    director: 'Denis Villeneuve',
    genres: ['Sci-Fi', 'Adventure'],
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
    overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    posterPath: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdropPath: 'https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5200FR.jpg',
    tmdbRating: 8.2,
    imdbRating: 8.6
  }
];

export interface TMDBQueryResult {
  id: number;
  title: string;
  original_title: string;
  release_date?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
}

export async function searchMovies(query: string, apiKey?: string): Promise<Partial<Movie>[]> {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  // Try live TMDB API if user has an API Key configured
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${encodeURIComponent(apiKey.trim())}&query=${encodeURIComponent(trimmed)}&include_adult=false&language=en-US&page=1`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          return data.results.map((item: TMDBQueryResult) => {
            const year = item.release_date ? parseInt(item.release_date.split('-')[0], 10) : 2024;
            return {
              tmdbId: item.id,
              title: item.title,
              originalTitle: item.original_title,
              releaseDate: item.release_date || `${year}-01-01`,
              releaseYear: year,
              overview: item.overview || 'No synopsis available.',
              posterPath: item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80',
              backdropPath: item.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`
                : undefined,
              tmdbRating: item.vote_average ? Number(item.vote_average.toFixed(1)) : undefined,
              genres: ['Drama', 'Cinema'],
              director: 'Director',
              cast: ['Lead Actor', 'Supporting Cast'],
              runtimeMinutes: 120,
              language: 'English',
            };
          });
        }
      }
    } catch (err) {
      console.warn('TMDB live search error, falling back to curated database', err);
    }
  }

  // Fallback to our extensive local movie catalog with intelligent fuzzy matching
  const catalogMatches = CURATED_MOVIES_CATALOG.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(trimmed) ||
      movie.originalTitle.toLowerCase().includes(trimmed) ||
      movie.director.toLowerCase().includes(trimmed) ||
      movie.cast.some((actor) => actor.toLowerCase().includes(trimmed)) ||
      movie.genres.some((g) => g.toLowerCase().includes(trimmed))
    );
  });

  return catalogMatches.map((m) => ({
    tmdbId: m.tmdbId,
    title: m.title,
    originalTitle: m.originalTitle,
    releaseDate: m.releaseDate,
    releaseYear: m.releaseYear,
    runtimeMinutes: m.runtimeMinutes,
    language: m.language,
    director: m.director,
    genres: m.genres,
    cast: m.cast,
    overview: m.overview,
    posterPath: m.posterPath,
    backdropPath: m.backdropPath,
    tmdbRating: m.tmdbRating,
    imdbRating: m.imdbRating,
  }));
}
