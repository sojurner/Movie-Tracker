import React from 'react';
import { shallow, mount } from 'enzyme';
import { MovieCard, mapDispatchToProps } from './MovieCard';
import { mockStore } from '../../mockData/mockStore';
import { mockMovie, modifiedNowPlaying } from '../../mockData/mockData';

describe('MovieCard', () => {
  let wrapper;
  let mockGetFavorites;
  let mockRemoveFavorite;
  let mockRemoveFavoriteFromState;
  let mockToggleMovieStatus;
  let mockAddFavorite;
  let mockAddFavoriteToState;
  let mockSetFavoritesErrorState;

  beforeEach(() => {
    mockGetFavorites = jest.fn();
    mockRemoveFavorite = jest.fn();
    mockToggleMovieStatus = jest.fn();
    mockRemoveFavoriteFromState = jest.fn();
    mockAddFavorite = jest.fn();
    mockToggleMovieStatus = jest.fn();
    mockAddFavoriteToState = jest.fn();
    mockGetFavorites = jest.fn();
    mockSetFavoritesErrorState = jest.fn();

    wrapper = shallow(
      <MovieCard
        movie={mockMovie}
        currentUser={mockStore.currentUser}
        getFavorites={mockGetFavorites}
        removeFavorite={mockRemoveFavorite}
        toggleMovieStatus={mockToggleMovieStatus}
        removeFavoriteFromState={mockRemoveFavoriteFromState}
        addFavorite={mockAddFavorite}
        addFavoriteToState={mockAddFavoriteToState}
        setFavoritesErrorState={mockSetFavoritesErrorState}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
    const mountWrapper = mount(
      <MovieCard
        movie={mockMovie}
        currentUser={mockStore.currentUser}
        getFavorites={mockGetFavorites}
        removeFavorite={mockRemoveFavorite}
        toggleMovieStatus={mockToggleMovieStatus}
        removeFavoriteFromState={mockRemoveFavoriteFromState}
        addFavorite={mockAddFavorite}
        addFavoriteToState={mockAddFavoriteToState}
        setFavoritesErrorState={mockSetFavoritesErrorState}
      />
    );
    expect(mountWrapper).toMatchSnapshot();
  });

  describe('handleFavoriteClick', () => {
    it('should call setFavoritesErrorState if there is no currentUser', async () => {
      let mockNoUser = {};
      wrapper = shallow(
        <MovieCard
          movie={mockMovie}
          currentUser={mockNoUser}
          getFavorites={mockGetFavorites}
          removeFavorite={mockRemoveFavorite}
          toggleMovieStatus={mockToggleMovieStatus}
          removeFavoriteFromState={mockRemoveFavoriteFromState}
          addFavorite={mockAddFavorite}
          addFavoriteToState={mockAddFavoriteToState}
          setFavoritesErrorState={mockSetFavoritesErrorState}
        />
      );

      await wrapper.instance().handleFavoriteClick();

      expect(mockSetFavoritesErrorState).toHaveBeenCalledWith();
    });

    it('should make a fetch call if currentUser exists', async () => {
      const mockResult = {
        status: 'success',
        data: [],
        message: 'Retrieved All favorites'
      };

      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResult)
        })
      );

      await wrapper.instance().handleFavoriteClick();

      expect(window.fetch).toHaveBeenCalled();
    });
  });
  describe('handleAlreadyFavorite', () => {
    it('should call window.fetch when the favorite already exists', () => {
      const mockMovie = {
        id: 118,
        movie_id: 402900,
        user_id: 11,
        title: "Ocean's Eight",
        poster_path:
          'http://image.tmdb.org/t/p/original/MvYpKlpFukTivnlBhizGbkAe3v.jpg',
        release_date: '2018-06-07',
        vote_average: '7',
        overview:
          "Debbie Ocean, a criminal mastermind, gathers a crew of female thieves to pull off the heist of the century at New York's annual Met Gala."
      };

      const mockDeleteFavorite = {
        status: 'success',
        message: '1 row was deleted.'
      };

      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockDeleteFavorite)
        })
      );

      wrapper.instance().handleAlreadyFavorite(mockMovie);

      expect(window.fetch).toHaveBeenCalled();
    });

    it('should call window.fetch when the favorite does not already exist', () => {
      const mockMovie = {
        id: 118,
        movie_id: 402900,
        user_id: 11,
        title: "Ocean's Eight",
        poster_path:
          'http://image.tmdb.org/t/p/original/MvYpKlpFukTivnlBhizGbkAe3v.jpg',
        release_date: '2018-06-07',
        vote_average: '7',
        overview:
          "Debbie Ocean, a criminal mastermind, gathers a crew of female thieves to pull off the heist of the century at New York's annual Met Gala."
      };

      const mockDeleteFavorite = {
        status: 'success',
        message: '1 row was deleted.'
      };

      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockDeleteFavorite)
        })
      );

      wrapper.instance().handleAlreadyFavorite(undefined);

      expect(window.fetch).toHaveBeenCalled();
    });

    it('should call toggleMoviesStatus if movie is already favorited', async () => {
      const mockResult = { status: 'success', message: '1 row was deleted.' };
      const mockMovie = {
        movie_id: 353081,
        title: 'Mission: Impossible - Fallout',
        release_date: '2018-07-25',
        overview:
          'When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfil his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.',
        vote_average: 7.3,
        poster_path:
          'http://image.tmdb.org/t/p/original/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg',
        favorite: false
      };
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResult)
        })
      );

      await wrapper.instance().handleAlreadyFavorite(mockMovie);

      expect(mockToggleMovieStatus).toHaveBeenCalledWith(mockMovie);
    });

    it('should call');

    it('should call hoverOn on mouseEnter', () => {
      const spy = jest.spyOn(wrapper.instance(), 'hoverOn');
      wrapper.instance().forceUpdate();
      const movieCard = wrapper.find('.movie-card');
      movieCard.simulate('mouseEnter');
      expect(spy).toHaveBeenCalled();
    });

    it('should call hoverOff on mouseLeave', () => {
      const spy = jest.spyOn(wrapper.instance(), 'hoverOff');
      wrapper.instance().forceUpdate();
      const movieCard = wrapper.find('.movie-card');
      movieCard.simulate('mouseEnter');
      movieCard.simulate('mouseLeave');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps', () => {
    it('should map the store correctly if addFavoriteTostate is dispatched', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);

      mapped.addFavoriteToState();

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should map the store correctly if removeFavoriteFromState is dispatched', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);

      mapped.removeFavoriteFromState();

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should map the store correctly if toggleMovieStatus is dispatched', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);

      mapped.toggleMovieStatus();

      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should map the store correctly if setFavoritesErrorState is dispatched', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);

      mapped.setFavoritesErrorState();

      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
