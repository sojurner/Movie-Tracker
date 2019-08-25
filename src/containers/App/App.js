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

import './App.css';
export class App extends Component {
  constructor() {
    super();
    this.state = {
      errors: ''
    };
  }

  componentDidMount() {
    this.populateMovies();
  }

  populateMovies = async () => {
    try {
      this.props.fetchMovies();
    } catch (error) {
      this.setState({
        errors: error.message
      });
    }
  };

  render() {
    const { nowPlaying, searched } = this.props;
    return (
      <div>
        <Router>
          <div className={nowPlaying.length ? 'root-loaded' : 'root-loading'}>
            <FilterBar />
            <Navigation />
            {!searched && (
              <main className={`container main-container`}>
                <Jumbotron />
                <Routes />
                <CardContainer category={'nowPlaying'} />
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
  setCurrentUser: PropTypes.func.isRequired,
  clearFavorites: PropTypes.func.isRequired,
  currentUser: PropTypes.object
};

export const mapDispatchToProps = dispatch => ({
  fetchMovies: () => dispatch(action.fetchMovies())
});

const mapStateToProps = state => ({
  nowPlaying: state.movies.nowPlaying,
  currentUser: state.currentUser,
  searched: state.movies.searched
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
