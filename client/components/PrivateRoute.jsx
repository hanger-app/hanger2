import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const user = useAuth()?.user;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.authenticated ? children : <Redirect to={{ pathname: '/', state: { from: location } }} />
      }
    />
  );
};

export default PrivateRoute;
