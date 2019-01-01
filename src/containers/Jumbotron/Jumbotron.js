import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMovieTrailer } from '../../helpers/apiCalls';

import { TrailerModal } from '../../components/TrailerModal/TrailerModal';
import JumbotronArrows from '../../components/JumbotronArrows/JumbotronArrows';
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
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
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

    return (
      <div className="jumbotron">
        <Slide
          currentIndex={currentIndex}
          handleTrailerClick={this.handleTrailerClick}
        />
        <JumbotronArrows
          currentIndex={currentIndex}
          goToNextSlide={this.goToNextSlide}
          goToPrevSlide={this.goToPrevSlide}
        />
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
  error: state.errors.favoriteError
});

export default connect(mapStateToProps)(Jumbotron);
