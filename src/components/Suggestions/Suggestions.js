import React from 'react';

export const Suggestions = ({ suggestions, searchMovies }) => {
  const suggestionList = suggestions.map(suggestion => {
    return (
      <div className="suggestion" onClick={searchMovies}>
        {suggestion}
      </div>
    );
  });
  return <div className="suggestion-list">{suggestionList}</div>;
};
