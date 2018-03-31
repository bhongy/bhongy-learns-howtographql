import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as routes from '@root/routes';
import { authToken } from '@root/services';

// from: https://reacttraining.com/react-router/web/example/auth-workflow
const PrivateRoute = ({
  unauthRedirectTo,
  component: PrivateComponent,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      authToken.check() ? (
        <PrivateComponent {...props} />
      ) : (
        <Redirect to={unauthRedirectTo} state={{ from: props.location }} />
      )
    }
  />
);

PrivateRoute.defaultProps = {
  unauthRedirectTo: routes.login,
};

export default PrivateRoute;
