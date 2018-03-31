import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { extractFormData } from '@root/utils';
import * as routes from '@root/routes';
import { authToken } from '@root/services';

class Login extends Component {
  handleSubmit = async event => {
    event.preventDefault();

    const form = event.currentTarget;
    const variables = extractFormData(form);
    const result = await this.props.loginMutation({ variables });
    const { token } = result.data.login;
    authToken.save(token);

    this.props.history.push(routes.root);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4 className="mv3">Login</h4>
        <div className="flex flex-column">
          <input
            type="text"
            name="email"
            placeholder="Your email address"
          />
          <input
            type="password"
            name="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <button className="pointer mr2 button">create account</button>
          <Link className="pointer button" to={routes.signup}>
            need to create an account?
          </Link>
        </div>
      </form>
    );
  }
}

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

export default graphql(loginMutation, { name: 'loginMutation' })(Login);
