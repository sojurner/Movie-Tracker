import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchedMovies } from '../../actions/movieActions';
import { getMoviesBySearch } from '../../helpers/apiCalls';
import { Suggestions } from '../../components/Suggestions/Suggestions';

import './FilterBar.css';
import { getSuggestions } from '../../helpers/autoSuggest';

export class FilterBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      suggestions: null,
      selectedMovie: false,
      inputActive: false
    };
  }

  searchMovies = async event => {
    event.preventDefault();
    const { selectedMovie, inputActive } = this.state;
    this.setState({ inputActive: !inputActive });
    if (inputActive) {
      if (selectedMovie) {
        const result = await getMoviesBySearch(selectedMovie);
        this.props.setSearchedMovies(result);
        this.setState({ searchInput: '' });
      }
    }
  };

  setSearchInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, suggestions: getSuggestions(value) });
  };

  selectMovie = selectedMovie => {
    this.setState({
      selectedMovie,
      searchInput: selectedMovie,
      suggestions: null
    });
  };

  render() {
    const { suggestions, inputActive } = this.state;
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
          <button
            className={
              !inputActive
                ? `search-button`
                : `search-button search-button-active`
            }
            type="submit"
          >
            🔍
          </button>
        </form>
        {suggestions && (
          <Suggestions
            selectMovie={this.selectMovie}
            suggestions={suggestions.slice(0, 6)}
          />
        )}
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  setSearchedMovies: movies => dispatch(setSearchedMovies(movies))
});

export default connect(
  null,
  mapDispatchToProps
)(FilterBar);
