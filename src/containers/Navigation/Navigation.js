import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { setCurrentUser } from '../../actions/userActions';
import {
  clearFavorites,
  resetSearch,
  resetSimilar
} from '../../actions/movieActions';

import './Navigation.css';

export class Navigation extends Component {
  state = {
    previous: 0,
    current: 0
  };
  componentDidMount() {
    window.addEventListener('scroll', e => this.handleScroll(e), true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  handleScroll = event => {
    let { scrollTop } = event.srcElement;
    this.setState(prev => {
      if (prev.current !== scrollTop) {
        return {
          previous: prev.current,
          current: scrollTop
        };
      }
    });
  };

  logoutUser = () => {
    const { setCurrentUser, clearFavorites, history } = this.props;
    setCurrentUser(null);
    clearFavorites();
    history.replace('/');
  };

  resetSearch = () => {
    this.props.resetSearch();
    this.props.resetSimilar();
  };

  render() {
    const { current, previous } = this.state;
    return (
      <header
        className={
          current > previous
            ? 'header-container header-container-hide'
            : 'header-container'
        }
      >
        <Link to="/" onClick={this.resetSearch} className="nav-link brand">
          <i className="fas fa-film" />
          MovieTracker
        </Link>
        <nav className="nav-btns">
          {this.props.currentUser !== null ? (
            <div className="nav-btn-wrapper">
              <NavLink exact to="/favorites" className="nav-link nav-link-fav">
                <i className="fas fa-heart" />
                Favorites
              </NavLink>
              <Link
                exact
                to="/"
                className="nav-link nav-link-logout"
                onClick={this.logoutUser}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="nav-btn-wrapper">
              <NavLink
                exact
                to="/register"
                className="nav-link nav-link-register"
                onClick={this.resetSearch}
              >
                <i className="fas fa-user-plus" />
              </NavLink>
              <NavLink
                exact
                to="/login"
                onClick={this.resetSearch}
                className="nav-link nav-link-login"
              >
                <i className="fas fa-sign-in-alt" />
              </NavLink>
            </div>
          )}
        </nav>
      </header>
    );
  }
}

Navigation.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  clearFavorites: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  history: PropTypes.object
};

export const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearFavorites: () => dispatch(clearFavorites()),
  resetSearch: () => dispatch(resetSearch()),
  resetSimilar: () => dispatch(resetSimilar())
});

export const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigation)
);
