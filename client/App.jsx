import React from 'react';
import Login from './components/Login/Login.jsx';
import Nav from './components/Nav/Nav.jsx';
import Closet from './components/Closet/Closet.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <PrivateRoute path="/closet">
            <Closet />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
