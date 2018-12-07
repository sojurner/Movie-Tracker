export const addNowPlaying = movies => ({
  type: 'ADD_NOW_PLAYING',
  movies
});

export const addPopular = movies => ({
  type: 'ADD_POPULAR',
  movies
});

export const addDramas = movies => ({
  type: 'ADD_DRAMAS',
  movies
});

export const addActions = movies => ({
  type: 'ADD_ACTIONS',
  movies
});

export const addAnimated = movies => ({
  type: 'ADD_ANIMATED',
  movies
});

export const addComedies = movies => ({
  type: 'ADD_COMEDIES',
  movies
});

export const addHorrors = movies => ({
  type: 'ADD_HORRORS',
  movies
});

export const addSciFi = movies => ({
  type: 'ADD_SCI_FI',
  movies
});

export const setSearchedMovies = movies => ({
  type: 'SET_SEARCHED',
  movies
});

export const toggleMovieStatus = changedMovie => ({
  type: 'TOGGLE_MOVIE_STATUS',
  changedMovie
});

export const addFavoriteToState = movieId => ({
  type: 'ADD_FAVORITE_TO_STATE',
  movieId
});

export const removeFavoriteFromState = movieId => ({
  type: 'REMOVE_FAVORITE_FROM_STATE',
  movieId
});

export const populateFavoritesState = movieIds => ({
  type: 'POPULATE_FAVORITES_STATE',
  movieIds
});

export const clearFavorites = () => ({
  type: 'CLEAR_FAVORITES'
});

export const addTrailerToState = trailer => ({
  type: 'ADD_TRAILER_TO_STATE',
  trailer
});
