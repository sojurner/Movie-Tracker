import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNowPlaying } from '../../actions/movieActions';
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
      selectedMovie: false
    };
  }

  searchMovies = async event => {
    event.preventDefault();
    const { selectedMovie } = this.state;
    const result = await getMoviesBySearch(selectedMovie);
    this.props.addNowPlaying(result);
    this.setState({ searchInput: '' });
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
    const { suggestions } = this.state;
    return (
      <div>
        <form className="filter-form" onSubmit={this.searchMovies}>
          <input
            className="movie-input"
            placeholder="Enter Movie"
            type="text"
            name="searchInput"
            onChange={this.setSearchInput}
            value={this.state.searchInput}
          />
          <button className="search-button" type="submit">
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
  addNowPlaying: movies => dispatch(addNowPlaying(movies))
});

export default connect(
  null,
  mapDispatchToProps
)(FilterBar);
