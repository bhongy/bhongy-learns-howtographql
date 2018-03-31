import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { extractFormData } from '@root/utils';
import * as routes from '@root/routes';
import { authToken } from '@root/services';

class Signup extends Component {
  handleSubmit = async event => {
    event.preventDefault();

    const form = event.currentTarget;
    const variables = extractFormData(form);
    const result = await this.props.signupMutation({ variables });
    const { token } = result.data.signup;
    authToken.save(token);

    this.props.history.push(routes.root);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4 className="mv3">Sign Up</h4>
        <div className="flex flex-column">
          <input
            type="text"
            name="name"
            placeholder="Your name"
          />
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
          <Link className="pointer button" to={routes.login}>
            already have an account?
          </Link>
        </div>
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

export default graphql(signupMutation, { name: 'signupMutation' })(Signup);
