import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as routes from '@root/routes';
import { authToken } from '@root/services';

class Unauth extends Component {
  render() {
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">Hacker News</div>
          <Link to="/" className="ml1 no-underline black">
            new
          </Link>
        </div>
        <div className="flex flex-fixed">
          <Link to={routes.login} className="ml1 no-underline black">
            login
          </Link>
        </div>
      </div>
    );
  }
}

const Auth = withRouter(
  class Auth extends Component {
    handleLogOut = () => {
      const { history } = this.props;
      authToken.clear();
      history.push(routes.root);
    };

    render() {
      return (
        <div className="flex pa1 justify-between nowrap orange">
          <div className="flex flex-fixed black">
            <div className="fw7 mr1">Hacker News</div>
            <Link to="/" className="ml1 no-underline black">
              new
            </Link>
            <div className="ml1">|</div>
            <Link to="/create" className="ml1 no-underline black">
              submit
            </Link>
          </div>
          <div className="flex flex-fixed">
            <div className="ml1 pointer black" onClick={this.handleLogOut}>
              logout
            </div>
          </div>
        </div>
      );
    }
  }
);

class Header extends Component {
  render() {
    return authToken.check() ? <Auth /> : <Unauth />;
  }
}

export default Header;
