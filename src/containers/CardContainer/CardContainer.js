import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { setCurrentView } from '../../actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './CardContainer.css';

export const CardContainer = ({ movies, category, setCurrentView }) => {
  let displayCards;
  setCurrentView('');
  if (category === 'favorites') {
    if (movies.favorites.length === 0) {
      displayCards = <p>You have not added anything to your favorites yet!</p>;
    } else {
      displayCards = movies[category].map(movieId => {
        const movie = movies.nowPlaying.find(
          movie => movie.movie_id === movieId
        );
        return <MovieCard key={movie.movie_id} movie={movie} />;
      });
    }
  } else {
    displayCards = movies[category].map(movie => {
      return <MovieCard key={movie.movie_id} movie={movie} />;
    });
  }

  return (
    <div className="card-container">
      <h1 className="movie-header">Latest in theaters</h1>
      {displayCards}
    </div>
  );
};

CardContainer.propTypes = {
  movies: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  movies: state.movies
});

const mapDispatchToProps = dispatch => ({
  setCurrentView: view => dispatch(setCurrentView(view))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardContainer);
