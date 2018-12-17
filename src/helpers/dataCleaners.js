import * as moment from 'moment';

export const movieCleaner = data => {
  const { results } = data;
  const modifiedObj = results.map(result => {
    return {
      movie_id: result.id,
      title: result.title,
      release_date: moment(result.release_date).format('MMM D, YYYY'),
      overview: result.overview,
      vote_average: result.vote_average,
      backdrop_path: `http://image.tmdb.org/t/p/original${
        result.backdrop_path
      }`,
      poster_path: `http://image.tmdb.org/t/p/original${result.poster_path}`,
      favorite: false
    };
  });
  return modifiedObj;
};

export const similarMovieCleaner = data => {
  const modifiedObj = data.map(result => {
    return {
      movie_id: result.id,
      title: result.title,
      release_date: moment(result.release_date).format('MMM D, YYYY'),
      overview: result.overview,
      vote_average: result.vote_average,
      backdrop_path: `http://image.tmdb.org/t/p/original${
        result.backdrop_path
      }`,
      poster_path: `http://image.tmdb.org/t/p/original${result.poster_path}`,
      favorite: false
    };
  });
  return modifiedObj;
};
