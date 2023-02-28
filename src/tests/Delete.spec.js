import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const MockExpense = {
  id: 0,
  value: '123',
  currency: 'ARS',
  method: 'Dinheiro',
  tag: 'Lazer',
  description: 'Aloha',
  exchangeRates: mockData,
};

describe('Testa o botão de Remover', () => {
  test('Se a aplicação funciona corretamente', async () => {
    const INITIAL_STATE = {
      wallet: {
        expenses: [MockExpense],
        isEditing: false,
        idToEdit: 0,
        currencies: Object.keys(mockData),
      } };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: INITIAL_STATE });

    const totalField = screen.getByTestId('total-field');
    const deleteButton = screen.getByTestId('delete-btn');

    expect(totalField.textContent).toBe('4.87');
    userEvent.click(deleteButton);
    expect(totalField.textContent).toBe('0.00');
  });
});
