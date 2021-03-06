import { movieCleaner, similarMovieCleaner } from './dataCleaners';

export const getNowPlaying = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;
  const response = await fetch(url);
  const nowPlaying = await response.json();
  return movieCleaner(nowPlaying);
};

export const getPopularMovies = async () => {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;
  const response = await fetch(url);
  const nowPlaying = await response.json();
  return movieCleaner(nowPlaying);
};

export const getPopularDramas = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;
  const response = await fetch(url);
  const dramas = await response.json();
  return movieCleaner(dramas);
};

export const getPopularAction = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=28&sort_by=vote_average.desc&vote_count.gte=10&api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;
  const response = await fetch(url);
  const actions = await response.json();
  return movieCleaner(actions);
};

export const getPopularAnimated = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=16&sort_by=vote_average.desc&vote_count.gte=10&api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;
  const response = await fetch(url);
  const animated = await response.json();
  return movieCleaner(animated);
};

export const getPopularComedies = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=35&sort_by=vote_average.desc&vote_count.gte=10&api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;
  const response = await fetch(url);
  const comedies = await response.json();
  return movieCleaner(comedies);
};

export const getPopularHorror = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=27&sort_by=vote_average.desc&vote_count.gte=10&api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;
  const response = await fetch(url);
  const horror = await response.json();
  return movieCleaner(horror);
};

export const getPopularSciFi = async () => {
  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=878&sort_by=vote_average.desc&vote_count.gte=10&api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;
  const response = await fetch(url);
  const sciFi = await response.json();
  return movieCleaner(sciFi);
};

export const getMoviesBySearch = async query => {
  query = query.toLowerCase().replace(/ /g, '+');
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }&query=${query}`;
  const response = await fetch(url);
  const matches = await response.json();
  return movieCleaner(matches);
};

export const getSimilarMovies = async id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;

  const result = await (await fetch(url)).json();
  return similarMovieCleaner(result.results);
};

export const registerUser = async user => {
  const response = await fetch(
    'https://movie-tracker-server.herokuapp.com/api/users/new/',
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  const result = await response.json();
  if (result.status === 'success') {
    return await findUser(user.email);
  }
};

export const findUser = async email => {
  const response = await fetch(
    'https://movie-tracker-server.herokuapp.com/api/users'
  );
  const users = await response.json();
  return users.data.find(user => user.email === email);
};

export const loginUser = async email => {
  const response = await fetch(
    'https://movie-tracker-server.herokuapp.com/api/users'
  );
  const users = await response.json();

  const user = users.data.find(user => user.email === email);
  return user;
};

export const addFavorite = async (movie, currentUser) => {
  const {
    movie_id,
    title,
    release_date,
    overview,
    poster_path,
    vote_average
  } = movie;
  const { id: user_id } = currentUser;
  const favoriteMovie = {
    movie_id,
    title,
    release_date,
    overview,
    poster_path,
    vote_average,
    user_id
  };

  const response = await fetch(
    'https://movie-tracker-server.herokuapp.com/api/users/favorites/new',
    {
      method: 'POST',
      body: JSON.stringify(favoriteMovie),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  const addedFavorite = await response.json();
  if (addedFavorite.status === 'success') {
    return movie.movie_id;
  }
};

export const getFavorites = async currentUser => {
  const response = await fetch(
    `https://movie-tracker-server.herokuapp.com/api/users/${
      currentUser.id
    }/favorites`
  );
  const favorites = await response.json();
  return favorites;
};

export const removeFavorite = async (movie, currentUser) => {
  const response = await fetch(
    `https://movie-tracker-server.herokuapp.com/api/users/${
      currentUser.id
    }/favorites/${movie.movie_id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  const removedFavorite = await response.json();
  if (removedFavorite.status === 'success') {
    return movie.movie_id;
  }
};

export const getMovieTrailer = async id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${
    process.env.REACT_APP_TMDB_API_KEY
  }`;
  const videoResponse = await fetch(url);
  const vidResults = await videoResponse.json();
  if (vidResults.results.length) {
    return vidResults.results.find(vid => vid.type === 'Trailer').key;
  }
  return null;
};
