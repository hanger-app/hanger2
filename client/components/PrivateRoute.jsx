import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  return (
    <Router>
      <Route
        {...rest}
        render={({ location }) =>
          user.authenticated ? children : <Redirect to={{ pathname: '/', state: { from: location } }} />
        }
      />
    </Router>
  );
};

export default PrivateRoute;
