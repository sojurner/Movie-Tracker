import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import FilterBar from '../FilterBar/FilterBar';
import Navigation from '../Navigation/Navigation';
import Routes from '../../components/Routes/Routes';
import Jumbotron from '../Jumbotron/Jumbotron';
import CardContainer from '../CardContainer/CardContainer.js';
import SearchResults from '../SearchResults/SearchResults';
import { setCurrentUser } from '../../actions/userActions.js';
import Footer from '../../components/Footer/Footer';

import * as action from '../../actions/movieActions';
import * as call from '../../helpers/apiCalls.js';

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
    const { nowPlaying, searched } = this.props;
    return (
      <div>
        <Router>
          <div className="app">
            <FilterBar />
            <Navigation />
            {!searched && (
              <main className={`container main-container`}>
                <Jumbotron path={path} />
                <Routes />
                <CardContainer category={'nowPlaying'} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Footer />
              </main>
            )}
            {searched && <Route path="/search" component={SearchResults} />}
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
  currentView: state.currentView,
  searched: state.movies.searched
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
