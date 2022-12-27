import { createSlice } from "@reduxjs/toolkit";
import { success, fail } from "../../Utils/actions";
import call from "../../Utils/api";
import { showAlert } from "./alertReducer";

const universalState = {
  tried: false,
  loading: false,
  status: false,
  error: null,
};

const initialState = {
  create: { ...universalState },
};

const readingSlice = createSlice({
  name: "reading",
  initialState,
  reducers: {
    create(state, action) {
      return {
        ...state,
        create: { ...state.create, ...action.payload },
      };
    },

    universalReset(state, action) {
      const target = action.payload.state;
      return {
        ...state,
        [target]: {
          ...state[target],
          tried: false,
          loading: false,
          status: false,
          error: null,
        },
      };
    },
  },
});

export const createReading = (reading) => async (dispatch) => {
  dispatch(readingSlice.actions.create({ loading: true, tried: true }));

  call({ url: `/reading`, data: reading, method: "POST" })
    .then((response) => {
      success(dispatch, readingSlice.actions.create);
    })
    .catch((error) => {
      fail(dispatch, readingSlice.actions.create, error);
      dispatch(
        showAlert(error.response.data.message || "Internal Server Error")
      );
    });
};

export default readingSlice.reducer;
