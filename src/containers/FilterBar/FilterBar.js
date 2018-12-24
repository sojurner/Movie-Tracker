import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Suggestions } from '../../components/Suggestions/Suggestions';

import { setSearchedMovies } from '../../actions/movieActions';
import { getMoviesBySearch } from '../../helpers/apiCalls';
import { getSuggestions } from '../../helpers/autoSuggest';
import './FilterBar.css';

export class FilterBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      suggestions: null,
      inputActive: false
    };
  }

  searchMovies = async () => {
    const { searchInput, inputActive } = this.state;
    this.setState({ inputActive: !inputActive });
    if (inputActive && searchInput) {
      this.props.setSearchedMovies(await getMoviesBySearch(searchInput));
      this.setState({ searchInput: '', suggestions: null });
    }
  };

  setSearchInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, suggestions: getSuggestions(value) });
  };

  selectMovie = searchInput => {
    this.setState({
      searchInput,
      suggestions: null
    });
  };

  render() {
    const { suggestions, inputActive, searchInput } = this.state;
    return (
      <div className="search-container">
        <form className="filter-form" onSubmit={this.searchMovies}>
          <input
            className={
              !inputActive ? `movie-input` : `movie-input movie-input-active`
            }
            placeholder="Enter Movie"
            type="text"
            name="searchInput"
            onChange={this.setSearchInput}
            value={this.state.searchInput}
          />
          <NavLink
            exact
            to={
              !searchInput && !this.props.searchedMovies
                ? '/'
                : `/search/q=${searchInput}`
            }
            onClick={this.searchMovies}
            className={
              !inputActive
                ? `search-button`
                : `search-button search-button-active`
            }
          >
            🔍
          </NavLink>
        </form>
        {searchInput && suggestions && (
          <Suggestions
            selectMovie={this.selectMovie}
            suggestions={suggestions.slice(0, 6)}
          />
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  searchedMovies: state.movies.searched
});

export const mapDispatchToProps = dispatch => ({
  setSearchedMovies: movies => dispatch(setSearchedMovies(movies))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
