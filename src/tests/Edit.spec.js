import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import mockFetch from './mock/fetch';

describe('Testa o botão de Editar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
    jest.spyOn(global, 'alert').mockImplementation(() => {});
  });
  test('Se a aplicação funciona corretamente', async () => {
    const INITIAL_STATE = {
      wallet: {
        expenses: [],
        isEditing: false,
        idToEdit: 0,
        currencies: Object.keys(mockData),
      } };
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: INITIAL_STATE });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const button = screen.getByRole('button');

    act(() => {
      userEvent.type(valueInput, '123');
    });

    expect(valueInput.value).toBe('123');
    act(() => {
      userEvent.type(descriptionInput, 'Aloha');
      userEvent.type(currencyInput, 'ARS');
      userEvent.type(methodInput, 'Dinheiro');
      userEvent.type(tagInput, 'Lazer');
      userEvent.click(button);
      userEvent.click(button);
    });

    const totalField = screen.getByTestId('total-field');
    const addButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addButton.textContent).toBe('Adicionar Despesa');
    await waitFor(() => {
      const editButton = screen.getAllByTestId('edit-btn')[0];
      act(() => {
        userEvent.click(editButton);
      });
    });

    expect(totalField.textContent).toBe('1169.26');
    expect(addButton.textContent).toBe('Editar despesa');
    expect(valueInput.value).toBe('');
    act(() => {
      userEvent.type(valueInput, '777');
    });
    expect(valueInput.value).toBe('777');
    act(() => {
      userEvent.click(addButton);
    });
    screen.debug();
    expect(totalField.textContent).toBe('1169.26');
    expect(addButton.textContent).toBe('Editar despesa');
  });
});
