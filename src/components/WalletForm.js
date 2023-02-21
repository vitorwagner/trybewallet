import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, editExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, isEditing, idToEdit } = this.props;
    const { id } = this.state;
    if (isEditing) {
      this.setState({ id: idToEdit }, () => {
        dispatch(editExpense(this.state));
      });

      return;
    }
    dispatch(addExpense(this.state));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies, isEditing } = this.props;
    const { value, description } = this.state;

    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            id="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            onChange={ this.handleChange }
          >
            {currencies.length === 0
              ? <option data-testid="loading">Carregando...</option>
              : (currencies.map((currency) => (
                <option key={ currency } value={ currency }>{currency}</option>
              )))}

          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            id="method"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="submit">
          { isEditing ? 'Editar despesa'
            : 'Adicionar Despesa' }
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isEditing: state.wallet.isEditing,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
