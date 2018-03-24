import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as routes from '@root/routes';
import '@styles/App.css';
import Header from '@components/Header';
import LinkList from '@components/LinkList';
import CreateLink from '@components/CreateLink';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path={routes.root} component={LinkList} />
            <Route exact path={routes.create} component={CreateLink} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
