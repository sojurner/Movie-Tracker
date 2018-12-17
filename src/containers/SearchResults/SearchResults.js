import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardContainer from '../CardContainer/CardContainer';

import { getSimilarMovies } from '../../helpers/apiCalls';
import { setSimilarMovies } from '../../actions/movieActions';
import './SearchResults.css';

export class SearchResults extends Component {
  constructor() {
    super();
    this.state = {
      targetSuggestions: null,
      targetFilm: null,
      displayInstructions: false
    };
  }

  toggleSuggestions = index => {
    this.setState({
      targetSuggestions: index
    });
  };

  getSimilarMovies = async targetFilm => {
    this.props.setSimilarMovies(await getSimilarMovies(targetFilm));
    this.setState({ targetFilm });
  };

  toggleInstructions = () => {
    this.setState({ displayInstructions: !this.state.displayInstructions });
  };

  render() {
    const { targetSuggestions, targetFilm, displayInstructions } = this.state;
    const { searched, similar } = this.props;
    return (
      <div className="search_movie-container">
        <h3 className="search_movie-result-count">
          Search Results ({searched.length})
        </h3>
        <section className="search_movie-results">
          {searched.map((item, index) => {
            return (
              <div
                key={`search-${item.movie_id}`}
                className="search_movie-section"
                onMouseEnter={this.toggleSuggestions.bind(null, index)}
                onMouseLeave={this.toggleSuggestions.bind(null, null)}
              >
                <div className="search_movie-card">
                  <img
                    className="search_movie-poster"
                    alt="film posters"
                    src={item.poster_path}
                  />
                  <section className="search_movie-content">
                    <h2 className="search_movie-title">{item.title}</h2>
                    <p className="search_movie-description">{item.overview}</p>
                    <h4
                      onClick={this.getSimilarMovies.bind(null, item.movie_id)}
                      onMouseEnter={this.toggleInstructions}
                      onMouseLeave={this.toggleInstructions}
                      className={
                        index === targetSuggestions
                          ? 'similar-suggestions'
                          : 'similar-suggestions-hide'
                      }
                    >
                      {!displayInstructions
                        ? `Similar films?`
                        : `Click to view`}
                    </h4>
                  </section>
                </div>
                {similar && targetFilm === item.movie_id && <CardContainer />}
              </div>
            );
          })}
        </section>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  searched: state.movies.searched,
  similar: state.movies.similar
});

export const mapDispatchToProps = dispatch => ({
  setSimilarMovies: movies => dispatch(setSimilarMovies(movies))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
