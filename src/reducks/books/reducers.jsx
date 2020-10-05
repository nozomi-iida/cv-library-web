import * as Actions from "./actions";
import initialState from "../store/initialState";

export const BooksReducer = (state = initialState.books, action) => {
  switch (action.type) {
    case Actions.Book_Add:
      return [
        ...state,
        ...action.payload,
      ]
    default:
      return state;
  }
};
