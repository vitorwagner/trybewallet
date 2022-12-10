import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a página de login', () => {
  it('Testa se o campo para email aparece na tela', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
  });
  it('Testa se o campo para senha aparece na tela', () => {
    renderWithRouterAndRedux(<App />);
    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();
  });
  it('Testa se o botão para entrar aparece na tela desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
  it('Testa se o botão para entrar aparece na tela é habilitado ao digitar email e senha', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    const password = screen.getByTestId('password-input');
    const email = screen.getByTestId('email-input');
    userEvent.type(email, 'testando@teste.com.br');
    userEvent.type(password, '123456');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});
