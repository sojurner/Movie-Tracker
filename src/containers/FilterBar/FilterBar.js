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

  setFilterOptions = event => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({ filterOption: value });
  };

  showFilter = () => {
    this.setState({ filterDisplay: !this.state.filterDisplay });
  };

  render() {
    const { suggestions } = this.state;
    if (this.state.filterDisplay) {
      return (
        <form className="filter-form" onSubmit={this.searchMovies}>
          <select onChange={this.setFilterOptions}>
            <option>Select Option</option>
            <option value="movie">Movie</option>
            <option value="actor">Actor/Actress</option>
          </select>
          <input
            type="text"
            name="searchInput"
            onChange={this.setSearchInput}
            value={this.state.search}
          />
          {suggestions && (
            <Suggestions
              searchMovies={this.searchMovies}
              suggestions={suggestions.slice(0, 6)}
            />
          )}
          <button type="submit">Enter</button>
        </form>
      );
    } else {
      return <i className="fas fa-search" onClick={this.showFilter} />;
    }
  }
}

export const mapDispatchToProps = dispatch => ({
  addNowPlaying: movies => dispatch(addNowPlaying(movies))
});

export default connect(
  null,
  mapDispatchToProps
)(FilterBar);
