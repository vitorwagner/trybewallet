import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const currencies = [
  'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
  'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE',
];

const INITIAL_STATE = {
  wallet: {
    currencies,
    expenses: [],
    isEditing: false,
    idToEdit: 0,
  },
};

describe('Testa o aplicativo', () => {
  beforeEach(async () => {
    const { history, store } = renderWithRouterAndRedux(
      <App />,
      { initialState: INITIAL_STATE },
    );
    const button = screen.getByRole('button', { name: /entrar/i });
    const password = screen.getByTestId('password-input');
    const email = screen.getByTestId('email-input');
    userEvent.type(email, 'testando@teste.com.br');
    userEvent.type(password, '123456');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa se consegue adicionar uma despesa', async () => {
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const button = screen.getByRole('button');

    userEvent.type(valueInput, '123');
    userEvent.type(descriptionInput, 'Aloha');
    userEvent.type(currencyInput, 'ARS');
    userEvent.type(methodInput, 'Dinheiro');
    userEvent.type(tagInput, 'Lazer');
    userEvent.click(button);

    waitFor(() => {
      const tableDescription = screen.getByRole('cell', { name: /aloha/i });
      const tableConversion = screen.getByRole('cell', { name: /r\$ 3\.80/i });
      const tableCurrency = screen.getByRole('cell', { name: /peso argentino\/real brasileiro/i });
      const total = screen.getAllByTestId('total-field');
      expect(total).toHaveTextContent('3.80');
      expect(tableDescription).toBeInTheDocument();
      expect(tableConversion).toBeInTheDocument();
      expect(tableCurrency).toBeInTheDocument();
      expect(store.getState().wallet.expenses.value).toBe('123');
    });

    userEvent.type(valueInput, '345');
    userEvent.click(button);

    waitFor(() => {
      const total = screen.getAllByTestId('total-field');
      expect(total).toHaveTextContent('14.46');
    });
  });
});
