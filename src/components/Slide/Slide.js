import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';

import './Slide.css';

const Slide = ({ nowPlayingMovies, handleTrailerClick, currentIndex }) => {
  if (nowPlayingMovies.length) {
    const currMovie = nowPlayingMovies.slice(0, 20)[currentIndex];
    const {
      title,
      release_date,
      vote_average,
      movie_id,
      overview,
      backdrop_path
    } = currMovie;
    return (
      <div
        className="slide"
        style={{
          backgroundImage: `url(${backdrop_path})`
        }}
      >
        <div className="jumbotron-overlay">
          <div className="inner-content">
            <div className="jumbo-text-container">
              <div className="jumbo-left">
                <h1 className={`jumbo-title`}>{title}</h1>
                <p className="jumbo-release-date">{`Released: ${release_date}`}</p>
                <div className="star-rating">
                  <StarRatingComponent
                    name="rate2"
                    editing={false}
                    renderStarIcon={() => <span>★</span>}
                    starCount={10}
                    value={vote_average}
                  />
                </div>
                <i
                  onClick={handleTrailerClick.bind(null, movie_id)}
                  className="fab fa-youtube"
                />
              </div>
              <section className="jumbo-right">
                <p className="jumbo-overview">{overview}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="gif-container" />;
  }
};

const mapStateToProps = state => ({
  nowPlayingMovies: state.movies.nowPlaying
});

export default connect(mapStateToProps)(Slide);
