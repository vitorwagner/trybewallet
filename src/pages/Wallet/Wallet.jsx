import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import WalletForm from '../../components/WalletForm';
import Table from '../../components/Table';
import { fetchCurrencies } from '../../redux/actions';
import './Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    return (
      <>
        <Header />
        <p>Trybewallet</p>
        <WalletForm />
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
