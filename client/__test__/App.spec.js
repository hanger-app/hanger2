import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App.jsx';

describe('testing App component', () => {
  test('App renders successfully', async () => {
    render(<App />);
  });
});
