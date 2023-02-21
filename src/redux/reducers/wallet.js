import { SET_CURRENCIES, ADD_EXPENSE, REMOVE_EXPENSE,
  EDIT_EXPENSE, START_EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditing: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };

  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };

  case START_EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.payload,
      isEditing: true,
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => (
        expense.id === action.payload.id ? action.payload : expense
      )),
      isEditing: false,
    };
  default: return state;
  }
};

export default walletReducer;
