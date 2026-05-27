export type ShowStatus = 'completed' | 'watching' | 'dropped' | 'watchlist';

export interface Show {
  id: number;
  title: string;
  year: number;
  posterUrl: string;
  genres: string[];
  totalEpisodes: number;
}

export interface UserShow {
  id: number;
  showId: number;
  status: ShowStatus;
  rating: number | null; // 0.5–5 in 0.5 steps, null if not rated
  episodesWatched: number;
  currentSeason: number | null;
  currentEpisode: number | null;
  dateAdded: string; // ISO date string
  dateFinished: string | null;
  review: string | null;
  liked: boolean;
}

export interface User {
  id: number;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  favoriteShowIds: number[]; // max 4, references Show.id
}

export interface AppData {
  user: User;
  shows: Show[];
  userShows: UserShow[];
}
