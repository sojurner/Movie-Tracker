import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import * as call from '../../helpers/apiCalls.js';
import FilterBar from '../FilterBar/FilterBar';
import * as action from '../../actions/movieActions';
import { setCurrentUser } from '../../actions/userActions.js';
import Navigation from '../Navigation/Navigation';
import Routes from '../../components/Routes/Routes';
import Jumbotron from '../Jumbotron/Jumbotron';

import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      errors: '',
      path: ''
    };
  }

  componentDidUpdate() {}

  componentDidMount() {
    this.populateMovies();
  }

  populateMovies = async () => {
    const {
      addNowPlaying,
      addPopular,
      addActions,
      addComedies,
      addDramas,
      addHorrors,
      addAnimated,
      addSciFi
    } = this.props;
    try {
      const nowPlaying = await call.getNowPlaying();
      const popular = await call.getPopularMovies();
      const dramas = await call.getPopularDramas();
      const actions = await call.getPopularAction();
      const animated = await call.getPopularAnimated();
      const comedies = await call.getPopularComedies();
      const horrors = await call.getPopularHorror();
      const sciFi = await call.getPopularSciFi();
      addNowPlaying(nowPlaying);
      addPopular(popular);
      addDramas(dramas);
      addActions(actions);
      addAnimated(animated);
      addComedies(comedies);
      addHorrors(horrors);
      addSciFi(sciFi);
    } catch (error) {
      this.setState({
        errors: error.message
      });
    }
  };

  render() {
    const { path } = this.state;
    const { currentView } = this.props;
    return (
      <div>
        <Router>
          <div className="app">
            <FilterBar />
            <header className="container header-container">
              <Navigation />
            </header>
            <main
              className={
                !currentView
                  ? `container main-container`
                  : `container half-container`
              }
            >
              <Jumbotron path={path} />
              <Routes />
            </main>
          </div>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  addNowPlaying: PropTypes.func.isRequired,
  addPopular: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  clearFavorites: PropTypes.func.isRequired,
  currentUser: PropTypes.object
};

export const mapDispatchToProps = dispatch => ({
  addNowPlaying: movies => dispatch(addNowPlaying(movies)),
  addPopular: movies => dispatch(addPopular(movies)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearFavorites: () => dispatch(clearFavorites())
});

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  currentView: state.currentView
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
