import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Table from '../components/Table';
import { renderWithRedux } from './helpers/renderWith';

describe('Testa o componente WalletForm', () => {
  it('Testa se os campos do formulário aparecem na tela', () => {
    renderWithRedux(<Table />);
    const description = screen.getByRole('columnheader', { name: /descrição/i });
    const tag = screen.getByRole('columnheader', { name: /tag/i });
    const method = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const exchange = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const converter = screen.getByRole('columnheader', { name: /valor convertido/i });
    const converterCurrency = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const edit = screen.getByRole('columnheader', { name: /editar\/excluir/i });
    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(exchange).toBeInTheDocument();
    expect(converter).toBeInTheDocument();
    expect(converterCurrency).toBeInTheDocument();
    expect(edit).toBeInTheDocument();
  });
});
