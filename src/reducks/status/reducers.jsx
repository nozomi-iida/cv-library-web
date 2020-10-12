import * as Actions from "./actions";
import initialState from "../store/initialState";

export const StatusReducer = (state = initialState.status, action) => {
  switch (action.type) {
    case Actions.Book_Status:
      return action.payload;
    default:
      return state;
  }
};
