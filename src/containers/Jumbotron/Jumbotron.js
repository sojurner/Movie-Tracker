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
      displayModal: false
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
    const trailer = `https://www.youtube.com/embed/${
      trailerLink.results[0].key
    }?autoplay=1&mute=1`;

    this.setState({ trailer, displayModal: true });
  };

  onCloseModal = () => {
    this.setState({ displayModal: false });
  };

  render() {
    const { currentIndex } = this.state;
    const { nowPlayingMovies, currentView } = this.props;
    const jumboMovies = nowPlayingMovies.slice(0, 20);

    return (
      <div className={!currentView ? `jumbotron` : `jumbotron-half`}>
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
          trailer={this.state.trailer}
          displayModal={this.state.displayModal}
          onCloseModal={this.onCloseModal}
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
