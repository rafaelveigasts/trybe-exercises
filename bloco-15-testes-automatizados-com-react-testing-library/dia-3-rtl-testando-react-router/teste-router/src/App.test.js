import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from './App';

// it('deve renderizar o componente App', () => {
//   const { getByText } = renderWithRouter(<App />);
//   const home = getByText(/Você está na página Início/);
//   expect(home).toBeInTheDocument();
// });

it('deve renderizar o componente Sobre', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Sobre/i));
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
  const aboutAll = getByText(/Você está na página Sobre/);
  expect(aboutAll).toBeInTheDocument();
});