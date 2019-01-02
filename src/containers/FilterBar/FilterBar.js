import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Suggestions } from '../../components/Suggestions/Suggestions';

import { fetchMoviesBySearch } from '../../actions/movieActions';
import { getSuggestions } from '../../helpers/autoSuggest';
import './FilterBar.css';

export class FilterBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      suggestions: null,
      inputActive: false,
      redirect: ''
    };
    this.inputFocus = React.createRef();
  }

  searchMovies = async () => {
    const { searchInput, inputActive } = this.state;
    this.setState({ inputActive: !inputActive });
    if (inputActive && searchInput) {
      this.props.applyMovieSearch(searchInput);
      this.setState({
        searchInput: '',
        suggestions: null,
        redirect: `/search/?q=${searchInput}`
      });
    } else {
      this.inputFocus.focus();
    }
  };

  setSearchInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, suggestions: getSuggestions(value) });
  };

  selectMovie = async input => {
    const searchInput = input.slice(0, input.indexOf('('));
    await this.setState({
      searchInput,
      suggestions: null
    });
    this.searchMovies();
  };

  submitSearch = event => {
    event.preventDefault();
    this.searchMovies();
  };

  render() {
    const { suggestions, inputActive, searchInput, redirect } = this.state;
    return (
      <div className="filter-container">
        <form className="filter-form" onSubmit={this.submitSearch}>
          <input
            className={
              !inputActive ? `movie-input` : `movie-input movie-input-active`
            }
            placeholder="Enter Movie"
            type="text"
            name="searchInput"
            ref={input => {
              this.inputFocus = input;
            }}
            autoComplete="off"
            onChange={this.setSearchInput}
            value={this.state.searchInput}
          />
          <div
            onClick={this.searchMovies}
            className={
              !inputActive
                ? `search-button`
                : `search-button search-button-active`
            }
          >
            <span role="img" aria-label="search icon">
              {' '}
              🔍{' '}
            </span>
          </div>
          {redirect && <Redirect to={redirect} />}
        </form>
        {searchInput && suggestions && (
          <Suggestions
            searchMovies={this.selectMovie}
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
  applyMovieSearch: movies => dispatch(fetchMoviesBySearch(movies))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
