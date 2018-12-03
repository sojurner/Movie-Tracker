import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TrailerModal } from '../../components/TrailerModal/TrailerModal';

import * as call from '../../helpers/apiCalls';
import * as actions from '../../actions/movieActions';
import * as moment from 'moment';
import { setFavoritesErrorState } from '../../actions/errorActions';

import './MovieCard.css';
import StarRatingComponent from 'react-star-rating-component';

export class MovieCard extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      displayModal: false,
      trailer: ''
    };
  }

  handleFavoriteClick = async () => {
    const { currentUser, movie, setFavoritesErrorState } = this.props;

    if (!currentUser) {
      setFavoritesErrorState('Please create an account to add favorites');
      return;
    }
    const favorites = await call.getFavorites(currentUser);
    const alreadyFavorite = favorites.data.find(
      favorite => favorite.movie_id === movie.movie_id
    );
    this.handleAlreadyFavorite(alreadyFavorite);
  };

  handleAlreadyFavorite = async alreadyFavorite => {
    const { currentUser, movie, actions } = this.props;
    const {
      addFavoriteToState,
      removeFavoriteFromState,
      toggleMovieStatus
    } = actions;
    if (alreadyFavorite) {
      const removedMovieId = await call.removeFavorite(movie, currentUser);
      toggleMovieStatus(movie);
      await removeFavoriteFromState(removedMovieId);
    } else {
      const addedMovieId = await call.addFavorite(movie, currentUser);
      toggleMovieStatus(movie);
      await addFavoriteToState(addedMovieId);
    }
  };

  handleMovieClick = async movieId => {
    const trailerLink = await call.getMovieTrailer(movieId);
    const trailer = `https://www.youtube.com/embed/${
      trailerLink.results[0].key
    }?autoplay=1`;

    this.setState({ trailer, displayModal: true });
  };

  hoverOn = () => {
    this.setState({ hover: true });
  };

  hoverOff = () => {
    this.setState({ hover: false });
    this.props.setFavoritesErrorState('');
  };

  onCloseModal = () => {
    this.setState({ displayModal: false });
  };

  render() {
    const {
      release_date,
      overview,
      poster_path,
      vote_average,
      favorite,
      movie_id
    } = this.props.movie;
    return (
      <div
        onMouseEnter={this.hoverOn}
        onMouseLeave={this.hoverOff}
        className="movie-card"
        style={{
          backgroundImage: `url(${poster_path})`
        }}
      >
        <div className={this.state.hover ? 'overlay' : 'display-none'}>
          <p>
            <i className="far fa-calendar-alt" />{' '}
            {moment(release_date).format('MMM Do YY')}
          </p>
          <p className="overview-text">
            {overview.length > 150 ? `${overview.slice(0, 150)}...` : overview}
          </p>
          <div>
            <StarRatingComponent
              name="rate2"
              editing={false}
              renderStarIcon={() => <span>★</span>}
              starCount={10}
              value={vote_average}
            />
          </div>
          <i
            onClick={this.handleFavoriteClick}
            className={`star ${favorite ? 'fas fa-heart' : 'far fa-heart'}`}
          />

          <i
            onClick={() => this.handleMovieClick(movie_id)}
            className="view-trailer fas fa-video"
          />
          <p className="favorite-error">{this.props.error}</p>
        </div>
        <TrailerModal
          trailer={this.state.trailer}
          displayModal={this.state.displayModal}
          onCloseModal={this.onCloseModal}
        />
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  addFavoriteToState: PropTypes.func.isRequired,
  removeFavoriteFromState: PropTypes.func.isRequired,
  toggleMovieStatus: PropTypes.func.isRequired,
  addTrailerToState: PropTypes.func,
  setFavoritesErrorState: PropTypes.func,
  error: PropTypes.string
};

export const mapStateToProps = state => ({
  currentUser: state.currentUser,
  error: state.errors.favoriteError
});

export const mapDispatchToProps = dispatch => ({
  addFavoriteToState: movieId => dispatch(actions.addFavoriteToState(movieId)),
  removeFavoriteFromState: movieId =>
    dispatch(actions.removeFavoriteFromState(movieId)),
  toggleMovieStatus: movie => dispatch(actions.toggleMovieStatus(movie)),
  setFavoritesErrorState: message => dispatch(setFavoritesErrorState(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieCard);
