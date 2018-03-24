import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import * as routes from '@root/routes';

class CreateLink extends Component {
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="flex flex-column mt3">
          <input
            name="description"
            type="text"
            placeholder="A description for the link"
            className="mb2"
          />
          <input
            name="url"
            type="text"
            placeholder="The URL for the link"
            className="mb2"
          />
        </div>
        <button>Submit</button>
      </form>
    );
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const variables = {
      description: data.get('description'),
      url: data.get('url'),
    };
    try {
      await this.props.postMutation({ variables })
      this.props.history.push(routes.root);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      } else {
        // show pop-up that the post fails
      }
    }
  };
}

const mutation = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      description
      url
      createdAt
    }
  }
`;

// `option.name` specify props name for the mutation function
// (the default name is "mutate")
export default graphql(mutation, { name: 'postMutation' })(CreateLink);
