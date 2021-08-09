import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { UserState } from "./reducers/user";
import reducers from "./reducers";

export interface StoreState {
  user: UserState;
}
const store = createStore(reducers, applyMiddleware(thunk));
export default store;
