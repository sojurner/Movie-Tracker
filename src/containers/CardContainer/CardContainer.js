import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { setCurrentView } from '../../actions/userActions';
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import PropTypes from 'prop-types';

import './CardContainer.css';

export const CardContainer = ({ movies, similar }) => {
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

  const icons = [
    'fas fa-film',
    'fas fa-fire',
    'fas fa-helicopter',
    'far fa-grin-hearts',
    'fab fa-hornbill',
    'far fa-laugh-squint',
    'fas fa-ghost',
    'fas fa-atom'
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
  let movieSectionCarousel;
  if (!similar) {
    movieSectionCarousel = movieSections.map((section, index) => {
      if (movies.hasOwnProperty(section)) {
        const movieCards = movies[section].map(movie => {
          return <MovieCard key={movie.movie_id} movie={movie} />;
        });

        return (
          <div
            className={`carousel-container carousel-${section}`}
            key={`movie-${index}`}
          >
            <div className="carousel-header">
              <span className="in-theaters-text">{section.toUpperCase()}</span>
              <i className={icons[index]} />
            </div>
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
    return <div>{movieSectionCarousel}</div>;
  } else {
    movieSectionCarousel = similar.map((movie, index) => {
      return <MovieCard key={`similar-${index}`} movie={movie} />;
    });
    return (
      <div className={`carousel-container carousel-similar`}>
        <div className="carousel-header">
          <span className="in-theaters-text">Similar</span>
        </div>
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
          {movieSectionCarousel}
        </AliceCarousel>
      </div>
    );
  }
};
// const popularMovies = movies.popular.map(movie => {
//   return <MovieCard key={movie.movie_id} movie={movie} />;
// });

CardContainer.propTypes = {
  movies: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  movies: state.movies,
  similar: state.movies.similar
});

const mapDispatchToProps = dispatch => ({
  setCurrentView: view => dispatch(setCurrentView(view))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardContainer);
