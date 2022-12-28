import { createSlice } from "@reduxjs/toolkit";
import { success, fail } from "../../Utils/actions";
import call from "../../Utils/api";
import { showAlert } from "./alertReducer";
import { INFO_TYPES } from "../../Constants/constants";

const universalState = {
  tried: false,
  loading: false,
  status: false,
  error: null,
};

const initialState = {
  getUsers: { ...universalState, users: [] },
  signup: { ...universalState },
  login: { ...universalState, token: null },
  deleteUser: { ...universalState },
  updateUser: { ...universalState },
  resetPassword: { ...universalState },
  configurePassword: { ...universalState },
  verifyToken: { ...universalState, isValid: false },
  getUserData: { ...universalState, user: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      return {
        ...state,
        login: { ...state.login, ...action.payload },
      };
    },

    verifyToken(state, action) {
      return {
        ...state,
        verifyToken: { ...state.verifyToken, ...action.payload },
      };
    },

    getUserData(state, action) {
      return {
        ...state,
        getUserData: { ...state.getUserData, ...action.payload },
      };
    },

    logout(state, action) {
      return {
        ...state,
        login: initialState.login,
        verifyToken: initialState.verifyToken,
        getUserData: initialState.getUserData,
      };
    },

    getUsers(state, action) {
      return {
        ...state,
        getUsers: { ...state.getUsers, ...action.payload },
      };
    },

    signup(state, action) {
      return {
        ...state,
        signup: { ...state.signup, ...action.payload },
      };
    },

    updateUser(state, action) {
      return {
        ...state,
        updateUser: { ...state.updateUser, ...action.payload },
      };
    },

    deleteUser(state, action) {
      return {
        ...state,
        deleteUser: { ...state.deleteUser, ...action.payload },
      };
    },

    resetPassword(state, action) {
      return {
        ...state,
        resetPassword: { ...state.resetPassword, ...action.payload },
      };
    },

    configurePassword(state, action) {
      return {
        ...state,
        configurePassword: { ...state.configurePassword, ...action.payload },
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

export const login = (user) => async (dispatch) => {
  dispatch(userSlice.actions.login({ loading: true, tried: true }));

  call({ url: `/auth/login`, data: user, method: "POST" })
    .then((response) => {
      dispatch(
        userSlice.actions.login({
          token: response.data.token,
        })
      );
      success(dispatch, userSlice.actions.login);
    })
    .catch((error) => {
      fail(dispatch, userSlice.actions.login, error);
    });
};

export const verifyToken = (token) => async (dispatch) => {
  dispatch(userSlice.actions.verifyToken({ loading: true, tried: true }));

  call({
    url: `/auth/verifyToken`,
    data: token,
    method: "POST",
  })
    .then((response) => {
      if (response.data) {
        dispatch(
          userSlice.actions.verifyToken({
            isValid: true,
          })
        );
        success(dispatch, userSlice.actions.verifyToken);
      } else {
        localStorage.removeItem("accessToken");
        dispatch(
          userSlice.actions.verifyToken({
            isValid: false,
            tried: true,
            loading: false,
            status: false,
            error: null,
          })
        );
      }
    })
    .catch((error) => {
      localStorage.removeItem("accessToken");
      dispatch(
        userSlice.actions.verifyToken({
          isValid: false,
        })
      );
      fail(dispatch, userSlice.actions.verifyToken, error);
    });
};

export const getUserData = (token) => async (dispatch) => {
  dispatch(userSlice.actions.getUserData({ loading: true, tried: true }));

  call({ url: `/users/data`, data: token, method: "POST" })
    .then((response) => {
      dispatch(
        userSlice.actions.getUserData({
          user: response.data,
        })
      );
      success(dispatch, userSlice.actions.getUserData);
    })
    .catch((error) => {
      fail(dispatch, userSlice.actions.getUserData, error);
    });
};

export const signup = (user) => async (dispatch) => {
  dispatch(userSlice.actions.signup({ loading: true, tried: true }));

  call({ url: `/users/signup`, data: user, method: "POST" })
    .then((response) => {
      success(dispatch, userSlice.actions.signup);
      dispatch(showAlert("Sign up successful!", INFO_TYPES.SUCCESS));
    })
    .catch((error) => {
      fail(dispatch, userSlice.actions.signup, error);
      dispatch(
        showAlert(error.response.data.message || "Internal Server Error")
      );
    });
};

export const userReset = (state) => async (dispatch) => {
  dispatch(userSlice.actions.universalReset({ state: state }));
};

export const logout = (state) => async (dispatch) => {
  localStorage.removeItem("accessToken");
  dispatch(userSlice.actions.logout({ state: state }));
};

export default userSlice.reducer;
