import Products from './Products';
import React from 'react';
import { render } from '@testing-library/react';

test('renders learn react link', () => {
  const { getByText } = render(<Products />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
