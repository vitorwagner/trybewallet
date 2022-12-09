import getCurrencies from '../../services/currencyAPI';

export const USER_LOGIN = 'USER_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const REQUEST_CURRENCIES_ERROR = 'REQUEST_CURRENCIES_ERROR';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: {
    email,
  },
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: {
    expense,
  },
});

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const setCurrencies = (payload) => ({
  type: SET_CURRENCIES,
  payload,
});

const requestCurrenciesError = (error) => ({
  type: REQUEST_CURRENCIES_ERROR,
  error,
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());

  try {
    const currencies = await getCurrencies();
    dispatch(setCurrencies(currencies));
  } catch (error) {
    dispatch(requestCurrenciesError(error));
  }
};
