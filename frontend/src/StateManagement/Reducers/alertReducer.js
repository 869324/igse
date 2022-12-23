import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: false,
  message: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      console.log(action);
      return { alert: true, message: action.payload };
    },

    resetAlert(state, action) {
      return initialState;
    },
  },
});

export const { resetAlert, showAlert } = alertSlice.actions;

export default alertSlice.reducer;
