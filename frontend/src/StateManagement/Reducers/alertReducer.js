import { createSlice } from "@reduxjs/toolkit";
import { INFO_TYPES } from "../../Constants/constants";

const initialState = {
  alert: false,
  message: "",
  type: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      const { type, message } = action.payload;
      return { alert: true, type, message };
    },

    resetAlert(state, action) {
      return initialState;
    },
  },
});

export const showAlert = (message, type) => async (dispatch) => {
  dispatch(
    alertSlice.actions.showAlert({ type: type || INFO_TYPES.ERROR, message })
  );
};

export const { resetAlert } = alertSlice.actions;

export default alertSlice.reducer;
