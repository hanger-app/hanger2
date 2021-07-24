import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return authistrue ? children : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
