import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../../redux/actions';
import './Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // Ref para regex email: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail

  validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    return emailRegex.test(email);
  };

  validatePassword = (password) => {
    const minPasswordLength = 6;
    return password.length < minPasswordLength;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(userLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;

    return (
      <section>

        <div className="form-container">
          <h3>Login</h3>

          <form onSubmit={ this.handleSubmit }>
            <input
              type="email"
              autoComplete="username"
              name="email"
              data-testid="email-input"
              placeholder="e-mail"
              onChange={ this.handleChange }
            />
            <input
              type="password"
              autoComplete="current-password"
              name="password"
              data-testid="password-input"
              placeholder="senha"
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              disabled={ !this.validateEmail(email) || this.validatePassword(password) }
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
