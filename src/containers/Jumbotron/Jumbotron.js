import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMovieTrailer } from '../../helpers/apiCalls';

import { TrailerModal } from '../../components/TrailerModal/TrailerModal';
import Slide from '../../components/Slide/Slide';

import './Jumbotron.css';

export class Jumbotron extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
      trailer: '',
      displayModal: false,
      error: null
    };
  }

  goToPrevSlide = () => {
    if (this.state.currentIndex > 0) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex - 1
      }));
    }
  };

  goToNextSlide = () => {
    const jumboMovies = this.props.nowPlayingMovies.slice(0, 20);
    if (this.state.currentIndex < jumboMovies.length - 1) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1
      }));
    }
  };

  handleTrailerClick = async movieId => {
    const trailerLink = await getMovieTrailer(movieId);
    if (trailerLink) {
      const trailer = `https://www.youtube.com/embed/${trailerLink}?autoplay=1&mute=1`;
      this.setState({ trailer, displayModal: true });
    } else {
      this.setState({ displayModal: true, error: 'Trailer Unavailable' });
    }
  };

  onCloseModal = () => {
    this.setState({ displayModal: false });
  };

  render() {
    const { currentIndex, error, trailer, displayModal } = this.state;
    const { nowPlayingMovies, currentView } = this.props;
    const jumboMovies = nowPlayingMovies.slice(0, 20);

    return (
      <div className="jumbotron">
        {jumboMovies[currentIndex] && (
          <Slide
            currentView={currentView}
            handleTrailerClick={this.handleTrailerClick}
            movie={jumboMovies[currentIndex]}
          />
        )}
        <section
          className={
            !currentView
              ? `arrow-icons-container`
              : `arrows-icons-container-half`
          }
        >
          <div className="backArrow">
            <i
              className="fas fa-angle-left jumbo-arrow"
              onClick={this.goToPrevSlide}
            />
          </div>
          <div className="nextArrow">
            <i
              className="fas fa-angle-right jumbo-arrow"
              onClick={this.goToNextSlide}
            />
          </div>
        </section>
        <TrailerModal
          trailer={trailer}
          displayModal={displayModal}
          onCloseModal={this.onCloseModal}
          error={error}
        />
      </div>
    );
  }
}

Jumbotron.propTypes = {
  nowPlayingMovies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  nowPlayingMovies: state.movies.nowPlaying,
  error: state.errors.favoriteError,
  currentView: state.currentView
});

export default connect(mapStateToProps)(Jumbotron);
