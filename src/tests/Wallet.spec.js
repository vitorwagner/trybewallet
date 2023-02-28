import React from 'react';
import { fireEvent, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRedux } from './helpers/renderWith';
import mockFetch from './mock/fetch';

describe('Testa a página da certeira', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    jest.spyOn(global, 'alert').mockImplementation(() => {});
  });

  it('Testa se as moedas foram preenchidas corretamente', async () => {
    renderWithRedux(<Wallet />);
    const currencyInput = screen.getByTestId('currency-input');

    waitFor(() => {
      const coinOptions = within(currencyInput).getAllByRole('option');
      const coinOptionsValues = coinOptions.map((coinOption) => coinOption.value);
      const coins = [
        'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
        'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE',
      ];
      expect(coinOptionsValues).toEqual(coins);
    });
  });
  it('Preenche nova despesa e confere se foi renderizada na tela', async () => {
    const { store } = renderWithRedux(<Wallet />);
    await waitForElementToBeRemoved(() => screen.getByTestId('loading'));
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

    waitFor(() => {
      const editButton = screen.getByTestId('edit-btn');
      fireEvent.click(editButton);
      expect(store.getState().wallet.isEditing).toBe(true);
    });

    waitFor(() => {
      const deleteButton = screen.getByTestId('delete-btn');
      fireEvent.click(deleteButton);
      waitForElementToBeRemoved(() => screen.getByTestId('delete-btn'));
    });
  });
});
