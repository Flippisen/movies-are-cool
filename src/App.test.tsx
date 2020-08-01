import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  render(<App />);
});

test('renders app div', () => {
  const appDivElement = screen.getByTestId('app-element');
  expect(appDivElement).toBeInTheDocument();
})