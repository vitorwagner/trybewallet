import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {(expenses.map(({
              id, description, tag, method, value, exchangeRates, currency,
            }) => (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{(+value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{`R$ ${(+exchangeRates[currency].ask).toFixed(2)}`}</td>
                <td>{`R$ ${(+(value) * exchangeRates[currency].ask).toFixed(2)}`}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    id={ description }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    id={ id }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            )))}
          </tbody>

        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
