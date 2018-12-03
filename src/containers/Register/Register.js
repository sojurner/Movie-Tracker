import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../helpers/apiCalls';
import { setCurrentUser, setCurrentView } from '../../actions/userActions';
import { setRegisterErrorState } from '../../actions/errorActions';
import './Register.css';

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    this.props.setCurrentView('register');
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const { setRegisterErrorState, history } = this.props;

    if (!name || !email || !password) {
      setRegisterErrorState('You are missing one or more required fields');
      return;
    }

    setRegisterErrorState('');
    try {
      const addedUser = await registerUser(this.state);

      if (!addedUser) {
        setRegisterErrorState('a user with this email address already exists');
        return;
      }

      this.setNewUserState(addedUser);

      if (addedUser) {
        history.push('/');
      }
    } catch (error) {
      setRegisterErrorState(error.message);
    }
  };

  setNewUserState = addedUser => {
    const { setCurrentUser } = this.props;
    setCurrentUser(addedUser);
    this.setState({
      name: '',
      email: '',
      password: ''
    });
  };

  render() {
    const { name, email, password } = this.state;
    const { error } = this.props;

    return (
      <section className="register-user">
        <section className="register-header">
          <h3 className="register-title">Register</h3>
        </section>
        <form onSubmit={this.handleSubmit} className="register-form">
          {error && <p className="error-message">{error}</p>}
          <input
            onChange={this.handleChange}
            value={name}
            name="name"
            type="text"
            placeholder="First Name"
            className="register-name"
          />
          <input
            onChange={this.handleChange}
            value={email}
            name="email"
            type="email"
            placeholder="Email"
            className="register-email"
          />
          <input
            onChange={this.handleChange}
            value={password}
            name="password"
            type="password"
            placeholder="Password"
            className="register-password"
          />
          <button className="register-btn">Submit</button>
          <button className="register-browse">Browse As Guest</button>
        </form>
      </section>
    );
  }
}

Register.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  setCurrentView: PropTypes.func.isRequired
};

export const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setRegisterErrorState: message => dispatch(setRegisterErrorState(message)),
  setCurrentView: view => dispatch(setCurrentView(view))
});

const mapStateToProps = state => ({
  error: state.errors.registerError
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
