import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import * as routes from '@root/routes';
import { authToken } from '@root/services';

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  };

  handleInputChange = event => {
    const { currentTarget: { name, value } } = event;
    this.setState({ [name]: value });
  };

  // handle errors: login, signup
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, name } = this.state;
    if (this.state.login) {
      const result = await this.props.loginMutation({
        variables: { email, password },
      });
      const { token } = result.data.login;
      authToken.save(token);
    } else {
      const result = await this.props.signupMutation({
        variables: { email, password, name },
      });
      const { token } = result.data.signup;
      authToken.save(token);
    }
    this.props.history.push(routes.root);
  };

  render() {
    const { login } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h4 className="mv3">{login ? 'Log In' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              placeholder="Your name"
            />
          )}
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            placeholder="Your email address"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <button className="pointer mr2 button">
            {login ? 'login' : 'create account'}
          </button>
          <div
            className="pointer button"
            onClick={() => {
              this.setState(prevState => ({ login: !prevState.login }));
            }}
          >
            {login ? 'need to create an account?' : 'already have an account?'}
          </div>
        </div>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </form>
    );
  }
}

const signupMutation = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        email
      }
    }
  }
`;

const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export default compose(
  graphql(signupMutation, { name: 'signupMutation' }),
  graphql(loginMutation, { name: 'loginMutation' })
)(Login);
