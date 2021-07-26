import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
describe('testing Login component', () => {
  test('Login renders successfully', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });
});
