import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, getFavorites } from '../../helpers/apiCalls';
import { setCurrentUser, setCurrentView } from '../../actions/userActions';
import { populateFavoritesState } from '../../actions/movieActions';
import { setLoginErrorState } from '../../actions/errorActions';
import Modal from 'react-responsive-modal';

import './Login.css';
export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      displayModal: true
    };
  }

  componentDidMount() {
    this.props.setCurrentView('login');
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  closeModal = () => {
    this.props.history.push('/');
  };

  setFavoritesState = async () => {
    const { currentUser, populateFavoritesState } = this.props;

    if (currentUser) {
      const favorites = await getFavorites(currentUser);
      const movieIds = favorites.data.map(favorite => favorite.movie_id);
      populateFavoritesState(movieIds);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { setLoginErrorState, setCurrentUser, history } = this.props;

    if (!email || !password) {
      setLoginErrorState('You are missing one of the required fields.');
      return;
    }

    try {
      const currentUser = await loginUser(email, password);
      if (!currentUser) {
        setLoginErrorState(
          'Sorry there is no user associated with this email.'
        );
        return;
      }
      if (currentUser.password !== password) {
        setLoginErrorState('Email and Password do not match');
        return;
      }
      setLoginErrorState('');
      setCurrentUser(currentUser);
      this.setState({
        email: '',
        password: ''
      });

      if (currentUser) {
        this.setFavoritesState();
        history.push('/');
      }
    } catch (error) {
      setLoginErrorState(error.message);
    }
  };

  handleRedirect = () => {
    this.props.history.push('/register');
  };

  render() {
    const { error } = this.props;
    const { displayModal } = this.state;
    return (
      <Modal open={displayModal} center onClose={this.closeModal}>
        <section className="login-user">
          <section className="login-header">
            <h3 className="login-title">Login</h3>
          </section>
          <form onSubmit={this.handleSubmit} className="login-user-form">
            {error && <p className="error-message">{error}</p>}
            <div className="login-icon-input">
              <i className="fas fa-envelope-square fa_mail" />
              <input
                className="login-email"
                onChange={this.handleChange}
                type="email"
                name="email"
                value={this.state.email}
                placeholder="Email..."
              />
            </div>
            <div className="login-icon-input">
              <i className="fas fa-key fa_key" />
              <input
                className="login-password"
                onChange={this.handleChange}
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Password..."
              />
            </div>
            <button className="login-submit-button">
              Login <i className="fas fa-sign-in-alt" />
            </button>
            <p className="register-redirect" onClick={this.handleRedirect}>
              Don't have an account?
            </p>
          </form>
        </section>
      </Modal>
    );
  }
}

Login.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  populateFavoritesState: PropTypes.func.isRequired,
  setLoginErrorState: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  error: PropTypes.string,
  setCurrentView: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setCurrentView: view => dispatch(setCurrentView(view)),
  populateFavoritesState: movieIds =>
    dispatch(populateFavoritesState(movieIds)),
  setLoginErrorState: message => dispatch(setLoginErrorState(message))
});

export const mapStateToProps = state => ({
  currentUser: state.currentUser,
  error: state.errors.loginError
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
