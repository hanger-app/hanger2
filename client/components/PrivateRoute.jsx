import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth();

  return <Route {...rest} render={() => (user?.authenticated ? children : null)} />;
};

export default PrivateRoute;
