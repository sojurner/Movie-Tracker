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
import CardContainer from '../CardContainer/CardContainer.js';

import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      errors: '',
      path: ''
    };
  }

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
    const { nowPlaying } = this.props;
    return (
      <div>
        <Router>
          <div className="app">
            {!nowPlaying && (
              <img src="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwicia_T7YTfAhXGmOAKHZkHDd4QjRx6BAgBEAU&url=https%3A%2F%2Fdribbble.com%2Fshots%2F2236318-Gooey-Effect-Infinity-Spinner-Loader&psig=AOvVaw1sCSKgJKFf0nnjB73NmmM5&ust=1543967477929265" />
            )}
            <FilterBar />
            <header className="container header-container">
              <Navigation />
            </header>
            <main className={`container main-container`}>
              <Jumbotron path={path} />
              <Routes />
              <CardContainer category={'nowPlaying'} />;
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
  addNowPlaying: movies => dispatch(action.addNowPlaying(movies)),
  addPopular: movies => dispatch(action.addPopular(movies)),
  addDramas: movies => dispatch(action.addDramas(movies)),
  addActions: movies => dispatch(action.addActions(movies)),
  addAnimated: movies => dispatch(action.addAnimated(movies)),
  addComedies: movies => dispatch(action.addComedies(movies)),
  addHorrors: movies => dispatch(action.addHorrors(movies)),
  addSciFi: movies => dispatch(action.addSciFi(movies)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearFavorites: () => dispatch(action.clearFavorites())
});

const mapStateToProps = state => ({
  nowPlaying: state.movies.nowPlaying,
  currentUser: state.currentUser,
  currentView: state.currentView
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
