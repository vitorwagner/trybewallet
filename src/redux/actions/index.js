import getCurrencies from '../../services/currencyAPI';
import getExchangeRates from '../../services/getExchangeRates';

export const USER_LOGIN = 'USER_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const START_EDIT_EXPENSE = 'START_EDIT_EXPENSE';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: {
    email,
  },
});

export const addExpense = (expense) => async (dispatch) => {
  const exchangeRates = await getExchangeRates();
  dispatch({
    type: ADD_EXPENSE,
    payload: { ...expense, exchangeRates: { ...exchangeRates } },
  });
};

export const removeExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const setCurrencies = (payload) => ({
  type: SET_CURRENCIES,
  payload,
});

export const editExpense = (expense) => async (dispatch) => {
  const exchangeRates = await getExchangeRates();
  dispatch({
    type: EDIT_EXPENSE,
    payload: { ...expense, exchangeRates: { ...exchangeRates } },
  });
};

export const startEditExpense = (payload) => ({
  type: START_EDIT_EXPENSE,
  payload,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());

  try {
    const currencies = await getCurrencies();
    dispatch(setCurrencies(currencies));
  } catch (error) {
    // dispatch(requestCurrenciesError(error));
  }
};
