export const fetchMovies = () => ({
  type: 'FETCH_MOVIES'
});

export const fetchMoviesBySearch = input => ({
  type: 'FETCH_MOVIES_BY_SEARCH',
  input
});

export const resetSearch = () => ({
  type: 'RESET_SEARCH'
});

export const fetchSimilarMovies = movieId => ({
  type: 'FETCH_MOVIES_SIMILAR',
  movieId
});

export const resetSimilar = () => ({
  type: 'RESET_SIMILAR'
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
