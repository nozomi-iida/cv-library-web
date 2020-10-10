import { createStore as reduxCreateStore, combineReducers } from "redux";

import { BooksReducer } from "../books/reducers";
import { StatusReducer } from "../status/reducers";
export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      books: BooksReducer,
      status: StatusReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
