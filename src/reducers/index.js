import { combineReducers } from 'redux';
import { movieReducer } from './movieReducer';
import { userReducer, viewReducer } from './userReducer';
import { errorReducer } from './errorReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  currentUser: userReducer,
  currentView: viewReducer,
  errors: errorReducer
});

export default rootReducer;
