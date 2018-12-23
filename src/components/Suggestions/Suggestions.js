import React from 'react';
import './Suggestions.css';

export const Suggestions = ({ suggestions, selectMovie }) => {
  const suggestionList = suggestions.map((suggestion, index) => {
    return (
      <div
        key={`suggestion-${index}`}
        className={`suggestion suggestion-${index}`}
        onClick={selectMovie.bind(null, suggestion)}
      >
        {suggestion}
      </div>
    );
  });
  return <div className="suggestion-list">{suggestionList}</div>;
};
