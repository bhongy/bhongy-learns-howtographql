import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

class LinkList extends React.Component {
  render() {
    const { feedQuery } = this.props;
    if (typeof feedQuery === 'undefined') {
      return null;
    }
    if (feedQuery.loading) {
      return <div>loading</div>;
    }
    if (feedQuery.error) {
      if (process.env.NODE_ENV !== 'production') {
        // TODO: better error message using graphql error result
        console.error(feedQuery.error);
      }
      return null;
    }
    const { feed } = feedQuery;
    return <div>{feed.map(link => <Link key={link.id} link={link} />)}</div>;
  }
}

const query = gql`
  query FeedQuery {
    feed {
      id
      url
      description
    }
  }
`;

// `option.name` specify props name for the data (default name is "data")
// then we can access the result via `this.props.feedQuery` from within `LinkList`
export default graphql(query, { name: 'feedQuery' })(LinkList);
