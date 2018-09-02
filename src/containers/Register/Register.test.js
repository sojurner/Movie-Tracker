import React from 'react';
import { shallow } from 'enzyme';
import { Register } from './Register';
import { mockStore } from '../../mockData/mockStore';
import configureMockStore from 'redux-mock-store';
import { setCurrentUser } from '../../actions/userActions';

describe('Register', () => {
  let wrapper;
  let store;
  let mockSetCurrentUser;
  let mockHistory;
  const Store = configureMockStore();

  beforeEach(() => {
    mockHistory = jest.fn();
    mockSetCurrentUser = jest.fn();
    store = Store(mockStore);
    wrapper = shallow(
      <Register
        store={store}
        setCurrentUser={mockSetCurrentUser}
        history={mockHistory}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should setState on handleChange', () => {
    const mockNameEvent = { target: { name: 'name', value: 'paul' } };
    const mockEmailEvent = { target: { name: 'email', value: 'paul@paul' } };
    const mockPasswordEvent = {
      target: { name: 'password', value: 'paulword' }
    };

    wrapper.instance().handleChange(mockNameEvent);
    expect(wrapper.state('name')).toEqual(mockNameEvent.target.value);

    wrapper.instance().handleChange(mockEmailEvent);
    expect(wrapper.state('email')).toEqual(mockEmailEvent.target.value);

    wrapper.instance().handleChange(mockPasswordEvent);
    expect(wrapper.state('password')).toEqual(mockPasswordEvent.target.value);
  });

  it('should call setCurrentUser on handleSubmit', async () => {
    let mockEvent = { preventDefault: () => jest.fn() };

    await wrapper.instance().handleSubmit(mockEvent);
    expect(mockSetCurrentUser).toHaveBeenCalled();
  });

  it('should setState to empty strings on handleSubmit if register user', async () => {
    const mockEvent = { preventDefault: () => jest.fn() };
    const expected = { email: '', name: '', password: '' };
    wrapper.setState({
      name: 'paul',
      email: 'paul@paul',
      password: 'paulword'
    });
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });
  it('should route back to home page on user register', async () => {
    const mockEvent = { preventDefault: () => jest.fn() };
    const registerResult = {
      status: 'success',
      message: 'New user created',
      id: 49
    };

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(registerResult)
      })
    );
    const x = await wrapper.instance().handleSubmit(mockEvent);
  });

  it('should have the store', () => {
    store.dispatch(setCurrentUser(mockStore.currentUser));
    const actions = store.getActions();
    console.log(store.getState());
    const expectedPayload = [
      {
        type: 'SET_CURRENT_USER',
        user: { id: 2, name: 'asdf', password: 'asdf', email: 'asdf' }
      }
    ];
    expect(actions).toEqual(expectedPayload);
  });
});
