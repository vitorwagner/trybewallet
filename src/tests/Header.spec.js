import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import { renderWithRedux } from './helpers/renderWith';

describe('Testa o componente Header', () => {
  it('Testa se o campo de email aparece na tela', () => {
    renderWithRedux(<Header />);
    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
  });
  it('Testa se o campo de despesas totais aparece na tela', () => {
    renderWithRedux(<Header />);
    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('0');
  });
  it('Testa se o campo de moeda aparece na tela', () => {
    renderWithRedux(<Header />);
    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toBeInTheDocument();
    expect(currency).toHaveTextContent('BRL');
  });
});
