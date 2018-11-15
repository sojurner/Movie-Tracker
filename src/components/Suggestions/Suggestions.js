import React from 'react';
import './Suggestions.css';

export const Suggestions = ({ suggestions, selectMovie }) => {
  const suggestionList = suggestions.map(suggestion => {
    return (
      <div
        className="suggestion"
        onClick={event => selectMovie(event.target.textContent)}
      >
        {suggestion}
      </div>
    );
  });
  return <div className="suggestion-list">{suggestionList}</div>;
};
