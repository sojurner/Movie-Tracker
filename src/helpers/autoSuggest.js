import movies from '../assets/data/moviesTitle.json';

export const getSuggestions = (value, name) => {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('\\b' + escapedValue, 'i');
  return movies.filter(club => regex.test(getSuggestionValue(club, name)));
};

const escapeRegexCharacters = str => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const getSuggestionValue = (suggestion, name) => {
  return `${suggestion}`;
};
