import { takeLatest, put } from 'redux-saga/effects';
import * as call from '../helpers/apiCalls';

function* retrieveAddMovies() {
  const nowPlaying = yield call.getNowPlaying();
  yield put({ type: 'ADD_NOW_PLAYING', movies: nowPlaying });

  const popular = yield call.getPopularMovies();
  yield put({ type: 'ADD_POPULAR', movies: popular });

  const dramas = yield call.getPopularDramas();
  yield put({ type: 'ADD_DRAMAS', movies: dramas });

  const actions = yield call.getPopularAction();
  yield put({ type: 'ADD_ACTIONS', movies: actions });

  const animated = yield call.getPopularAnimated();
  yield put({ type: 'ADD_ANIMATED', movies: animated });

  const comedies = yield call.getPopularComedies();
  yield put({ type: 'ADD_COMEDIES', movies: comedies });

  const horrors = yield call.getPopularHorror();
  yield put({ type: 'ADD_HORRORS', movies: horrors });

  const sciFi = yield call.getPopularSciFi();
  yield put({ type: 'ADD_SCI_FI', movies: sciFi });
}

function* fetchMoviesBySearch({ input }) {
  const moviesBySearch = yield call.getMoviesBySearch(input);
  yield put({ type: 'SET_SEARCHED', movies: moviesBySearch });
}

function* fetchSimilarMovies({ movieId }) {
  const similarMovies = yield call.getSimilarMovies(movieId);
  yield put({ type: 'SET_SIMILAR_MOVIES', movies: similarMovies });
}

export function* fetchMovies() {
  yield takeLatest('FETCH_MOVIES', retrieveAddMovies);
  yield takeLatest('FETCH_MOVIES_BY_SEARCH', fetchMoviesBySearch);
  yield takeLatest('FETCH_MOVIES_SIMILAR', fetchSimilarMovies);
}
