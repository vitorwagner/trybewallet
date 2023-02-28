import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const INITIAL_STATE = {
  wallet: {
    currencies: Object.keys(mockData),
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
    const arsOption = await screen.findByRole('option', { name: 'ARS' });

    act(() => {
      userEvent.type(valueInput, '123');
      userEvent.type(descriptionInput, 'Aloha');
      userEvent.selectOptions(currencyInput, arsOption);
      userEvent.type(methodInput, 'Dinheiro');
      userEvent.type(tagInput, 'Lazer');
      userEvent.click(button);
    });

    await waitFor(() => {
      const tableDescription = screen.getByRole('cell', { name: /aloha/i });
      const tableCurrency = screen.getByRole('cell', { name: /peso argentino\/real brasileiro/i });
      const total = screen.getByTestId('total-field');
      expect(total).toHaveTextContent('3.26');
      expect(tableDescription).toBeInTheDocument();
      expect(tableCurrency).toBeInTheDocument();
    });

    act(() => {
      userEvent.type(valueInput, '345');
      userEvent.click(button);
    });

    await waitFor(() => {
      const total = screen.getByTestId('total-field');
      expect(total).toHaveTextContent('12.40');
    });
  });
});
