import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { setCurrentView } from '../../actions/userActions';
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import PropTypes from 'prop-types';

import './CardContainer.css';

export const CardContainer = ({ movies, category, setCurrentView }) => {
  const movieSections = [
    'nowPlaying',
    'popular',
    'action',
    'dramas',
    'animated',
    'comedy',
    'horror',
    'sciFi'
  ];

  // if (category === 'favorites') {
  //   if (movies.favorites.length === 0) {
  //     displayCards = <p>You have not added anything to your favorites yet!</p>;
  //   } else {
  //     displayCards = movies[category].map(movieId => {
  //       const movie = movies.nowPlaying.find(
  //         movie => movie.movie_id === movieId
  //       );
  //       return <MovieCard key={movie.movie_id} movie={movie} />;
  //     });
  //   }
  // } else {
  // return (
  //   <div className="card-container-root">
  //     <h1 className="movie-header">Latest Releases</h1>
  //     <div className="card-container">{displayCards}</div>
  //   </div>
  // );

  const responsive = {
    0: {
      items: 1
    },
    600: {
      items: 3
    },
    1024: {
      items: 5
    }
  };

  const movieSectionCarousel = movieSections.map((section, index) => {
    if (movies.hasOwnProperty(section)) {
      const movieCards = movies[section].map(movie => {
        return <MovieCard key={movie.movie_id} movie={movie} />;
      });

      return (
        <div className={`carousel-${section}`} key={`movie-${index}`}>
          <h3 className="in-theaters-text">{section.toUpperCase()}</h3>
          <AliceCarousel
            duration={400}
            autoPlay={true}
            startIndex={1}
            fadeOutAnimation={true}
            dotsDisabled={true}
            mouseDragEnabled={true}
            responsive={responsive}
            autoPlayInterval={Math.random() * 3 * 1000 + 3000}
            autoPlayDirection="rtl"
            autoPlayActionDisabled={true}
          >
            {movieCards}
          </AliceCarousel>
        </div>
      );
    }
  });
  // const nowPlayingMovies = movies.nowPlaying.map(movie => {
  //   return <MovieCard key={movie.movie_id} movie={movie} />;
  // });

  // const popularMovies = movies.popular.map(movie => {
  //   return <MovieCard key={movie.movie_id} movie={movie} />;
  // });

  return <div>{movieSectionCarousel}</div>;
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
