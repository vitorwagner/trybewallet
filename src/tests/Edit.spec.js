import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const MockExpense = [{
  id: 0,
  value: '123',
  currency: 'ARS',
  method: 'Dinheiro',
  tag: 'Lazer',
  description: 'Aloha',
  exchangeRates: mockData,
}, {
  id: 1,
  value: '123',
  currency: 'CAD',
  method: 'Dinheiro',
  tag: 'Lazer',
  description: 'Aloha 2',
  exchangeRates: mockData,
}];

describe('Testa o botão de Editar', () => {
  test('Se a aplicação funciona corretamente', async () => {
    const INITIAL_STATE = {
      wallet: {
        expenses: MockExpense,
        isEditing: false,
        idToEdit: 0,
        currencies: Object.keys(mockData),
      } };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: INITIAL_STATE });

    const valueInput = screen.getByTestId('value-input');
    const totalField = screen.getByTestId('total-field');
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addButton.textContent).toBe('Adicionar Despesa');
    await waitFor(() => {
      const editButton = screen.getAllByTestId('edit-btn')[0];
      act(() => {
        userEvent.click(editButton);
      });
    });

    expect(totalField.textContent).toBe('466.85');
    expect(addButton.textContent).toBe('Editar despesa');
    expect(valueInput.value).toBe('');
    act(() => {
      userEvent.type(valueInput, '777');
    });
    expect(valueInput.value).toBe('777');
    act(() => {
      userEvent.click(addButton);
    });

    await waitFor(() => {
      expect(totalField.textContent).toBe('4522.42');
    });
    await waitFor(() => {
      expect(addButton.textContent).toBe('Adicionar Despesa');
    });
  });
});
