import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducers/userReducer";
import modalReducer from "../Reducers/modalReducer";

const appReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
