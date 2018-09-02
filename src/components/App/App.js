import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { getNowPlaying } from '../../helpers/apiCalls.js';

import { addNowPlaying, clearFavorites } from '../../actions/movieActions';
import { setCurrentUser } from '../../actions/userActions.js';
import Navigation from '../Navigation/Navigation';
import Routes from '../Routes/Routes';
import Jumbotron from '../Jumbotron/Jumbotron';

import './App.css';

export class App extends Component {
  async componentDidMount() {
    try {
      const nowPlaying = await getNowPlaying();
      this.props.addNowPlaying(nowPlaying);
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <header className="container header-container">
            <Navigation />
          </header>
          <main className="container main-container">
            <Jumbotron />
            <Routes />
          </main>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  addNowPlaying: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  clearFavorites: PropTypes.func.isRequired,
  currentUser: PropTypes.object
};

export const mapDispatchToProps = dispatch => ({
  addNowPlaying: movies => dispatch(addNowPlaying(movies)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearFavorites: () => dispatch(clearFavorites())
});

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
