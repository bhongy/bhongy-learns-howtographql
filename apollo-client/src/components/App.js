import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as routes from '@root/routes';
import Header from '@components/Header';
import LinkList from '@components/LinkList';
import Signup from '@components/Signup';
import Login from '@components/Login';
import PrivateRoute from '@components/PrivateRoute';
import CreateLink from '@components/CreateLink';
import '@styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path={routes.root} component={LinkList} />
            <Route exact path={routes.signup} component={Signup} />
            <Route exact path={routes.login} component={Login} />
            <PrivateRoute
              exact
              path={routes.create}
              component={CreateLink}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
