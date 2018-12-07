import { stat } from 'fs';

const initialState = {
  nowPlaying: [],
  popular: [],
  dramas: [],
  action: [],
  animated: [],
  comedy: [],
  horror: [],
  sciFi: [],
  searched: null,
  favorites: [],
  trailer: ''
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOW_PLAYING':
      return {
        ...state,
        nowPlaying: action.movies
      };

    case 'ADD_POPULAR':
      return {
        ...state,
        popular: action.movies
      };

    case 'ADD_DRAMAS':
      return {
        ...state,
        dramas: action.movies
      };

    case 'ADD_ACTIONS':
      return {
        ...state,
        action: action.movies
      };

    case 'ADD_ANIMATED':
      return {
        ...state,
        animated: action.movies
      };

    case 'ADD_COMEDIES':
      return {
        ...state,
        comedy: action.movies
      };

    case 'ADD_HORRORS':
      return {
        ...state,
        horror: action.movies
      };

    case 'ADD_SCI_FI':
      return {
        ...state,
        sciFi: action.movies
      };

    case 'SET_SEARCHED':
      return {
        ...state,
        searched: action.movies
      };

    case 'TOGGLE_MOVIE_STATUS': {
      const nowPlaying = state.nowPlaying.map(movie =>
        movie.movie_id !== action.changedMovie.movie_id
          ? movie
          : {
              ...action.changedMovie,
              favorite: !action.changedMovie.favorite
            }
      );
      return {
        ...state,
        nowPlaying
      };
    }

    case 'ADD_FAVORITE_TO_STATE':
      return {
        ...state,
        favorites: [...state.favorites, action.movieId]
      };

    case 'REMOVE_FAVORITE_FROM_STATE': {
      const favorites = state.favorites.filter(
        favorite => favorite !== action.movieId
      );
      return {
        ...state,
        favorites
      };
    }

    case 'POPULATE_FAVORITES_STATE': {
      const nowPlaying = state.nowPlaying.map(movie =>
        action.movieIds.includes(movie.movie_id)
          ? { ...movie, favorite: true }
          : movie
      );
      return {
        nowPlaying,
        favorites: action.movieIds
      };
    }

    case 'CLEAR_FAVORITES': {
      const nowPlaying = state.nowPlaying.map(movie => ({
        ...movie,
        favorite: false
      }));
      return {
        nowPlaying,
        favorites: []
      };
    }

    case 'ADD_TRAILER_TO_STATE': {
      return { ...state, trailer: action.trailer };
    }

    default:
      return state;
  }
};
