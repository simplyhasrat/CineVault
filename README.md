# CineVault — Personal Movie Library & Digital Film Diary

> **"The movie poster is the entry point, but the personal movie history is the product."**

**CineVault** is a dark, cinematic, poster-focused personal movie diary built according to the Product Requirements Document (PRD v1.0). It tracks watched films, high-resolution posters, backdrops, personal ratings, reviews, rewatch histories, viewing statistics, and custom tags.

---

## 🌟 Key Features

### 1. 🎬 Personal Movie Dashboard
- **Overview Metrics**: Total watched movies, average personal rating (out of 10), total hours/days watched, and favorites count.
- **Hero Spotlight**: Dynamic banner featuring your top-rated or most recent masterpiece with high-res backdrop glow.
- **Recently Logged**: Quick visual carousel of your latest cinema entries.
- **Watchlist Radar**: Instant preview of anticipated films on your watchlist.

### 2. 🖼️ Poster Gallery (My Library)
- **Strict 2:3 Aspect Ratio Cards**: High-definition movie posters matching real cinema proportions.
- **Interactive Badges**: Personal rating badge, TMDB score, favorite toggle with micro-animations, release year, runtime, and rewatch count.
- **View Modes**: Switch between responsive **Poster Grid** and **Compact List View**.
- **Search & Filter Suite**:
  - Live search across **Title**, **Director**, **Cast**, and **Custom Tags**.
  - Status tabs: **All**, **Watched**, **Favorites**, **Watchlist**.
  - Genre filter pills: Sci-Fi, Action, Drama, Thriller, Comedy, Romance, Crime, Animation, Horror, etc.
  - Rating filters (★ 9.0+ Masterpiece, ★ 8.0+ Great, ★ 7.0+ Good).
  - Sorting: Recently Watched, Oldest Watched, Highest/Lowest Rated, Release Year, Title A-Z, Longest Runtime.
  - One-click filter reset.

### 3. 📖 Movie Information Page & Diary
- **Cinematic Backdrop**: High-resolution movie still with atmospheric gradient fade.
- **Comprehensive Metadata**: Release date, runtime formatted in hours and minutes, language, age rating, director, and cast chips.
- **External vs Personal Rating**: Compare external TMDB rating with your personal 1–10 rating.
- **Interactive Diary**:
  - 10-star rating selector with instant score calculation.
  - Status switcher (Watched vs Watchlist).
  - Watch date logger.
  - Personal review and reflections textarea.
  - **Rewatch Log**: Record multiple viewings with individual watch dates and screening notes (e.g. *IMAX 70mm re-release with friends*).
  - **Custom Tags**: Add labels like `Mind-blowing ending`, `Comfort movie`, `Hans Zimmer Score`, `A24`, etc.
  - Edit imported metadata and safe removal with confirmation.

### 4. 🔍 Add a Movie (Dual Methods)
- **Method A — Live Search & Import**:
  - Search any film title (e.g. *Inception*, *The Godfather*, *The Matrix*, *Oppenheimer*).
  - Pre-populates title, release year, runtime, director, cast, genres, plot synopsis, poster, backdrop, and TMDB rating.
  - **Duplicate Entry Detection**: Alerts if a film is already in your vault, offering to log a rewatch instead of creating duplicates.
  - Configure personal rating, review, tags, and watch date before adding.
- **Method B — Add Manually**:
  - Full manual input for indie films, short films, or unlisted cinema titles.

### 5. 📊 Cinema Statistics & Insights
- **Habit Telemetry**: Total runtime formatted in hours and full days (e.g. *14 movies • 34h • 1.4 days of pure cinema*).
- **Genre Distribution**: Visual bars showing watched counts and percentage breakdowns.
- **Rating Distribution Histogram**: Interactive 1–10 score distribution.
- **Hall of Fame**: Showcase of your highest-rated cinema titles.
- **Top Directors & Frequent Actors**: Automatically tallied from your real collection.
- **Collector Achievements**: Milestone badges (e.g. *Century Club*, *Sci-Fi Explorer*, *Discerning Critic*, *Rewatch Connoisseur*).

### 6. ⚙️ Settings & Data Portability
- **Collector Profile**: Display name, handle, film bio, and custom avatar selector.
- **TMDB API Key Configuration**: Add your personal TMDB key for infinite global search, or use the built-in curated catalog.
- **1-Click Export**: Export full JSON backup or structured CSV spreadsheet (compatible with Excel, Google Sheets, Notion).
- **1-Click Import**: Restore library from JSON backup.
- **Showcase Reset**: Reload curated sample cinema titles (*Interstellar*, *Inception*, *The Dark Knight*, *Parasite*, *La La Land*, *Dune*, etc.).

---

## 🛠️ Technology Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS with tailored HSL tokens, dark cinematic glassmorphism, responsive grid layout, and fluid typography (`Outfit`, `Inter`, `JetBrains Mono`).
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Storage**: Browser LocalStorage with automatic seed initialization and error fallback.

---

## 🚀 Running Locally

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

Open `http://localhost:5173` in your browser.
