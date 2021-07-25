import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const context = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        return context.user ? children : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
