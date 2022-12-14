import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../Reducers/userReducer";
import modalReducer from "../Reducers/modalReducer";
import alertReducer from "../Reducers/alertReducer";
import readingReducer from "../Reducers/readingReducer";
import creditReducer from "../Reducers/creditReducer";
import billReducer from "../Reducers/billReducer";
import pricesReducer from "../Reducers/pricesReducer";
import statsReducer from "../Reducers/statsReducer";

const appReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  alert: alertReducer,
  reading: readingReducer,
  credit: creditReducer,
  bill: billReducer,
  prices: pricesReducer,
  stats: statsReducer,
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
