import {
  createStore as reduxCreateStore,
  combineReducers,
} from "redux";



import { BooksReducer } from "../books/reducers";

export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      books: BooksReducer,
    })
  );
}
