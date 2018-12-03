import React from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';

import './Slide.css';

const Slide = ({ movie, handleTrailerClick, currentView }) => {
  const { title, release_date, vote_average, movie_id } = movie;
  return (
    <div
      className="slide"
      style={{
        backgroundImage: `url(${movie.backdrop_path})`
      }}
    >
      <div className="jumbotron-overlay">
        <div className="inner-content">
          <div className="jumbo-text-container">
            <div className="jumbo-left">
              <h1 className={!currentView ? `jumbo-title` : `jumbo-title-half`}>
                {title}
              </h1>
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
              <p className="jumbo-overview">{movie.overview}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

Slide.propTypes = {
  movie: PropTypes.object.isRequired
};

export default Slide;
