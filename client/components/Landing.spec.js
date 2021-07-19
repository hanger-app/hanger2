import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Landing from './Landing.jsx';

describe('testing Landing component', () => {
  test('Landing renders successfully', async () => {
    render(<Landing />);
  });
});
