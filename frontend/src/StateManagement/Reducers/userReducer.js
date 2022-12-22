import { createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import { success, fail } from "../../Utils/actions";
import call from "../../Utils/api";

const universalState = {
  tried: false,
  loading: false,
  status: false,
  error: null,
};

const initialState = {
  getUsers: { ...universalState, users: [] },
  createUser: { ...universalState },
  login: { ...universalState, user: null, token: null },
  deleteUser: { ...universalState },
  updateUser: { ...universalState },
  resetPassword: { ...universalState },
  configurePassword: { ...universalState },
  verifyToken: { ...universalState, isValid: false },
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

    logout(state, action) {
      return {
        ...state,
        login: initialState.login,
      };
    },

    getUsers(state, action) {
      return {
        ...state,
        getUsers: { ...state.getUsers, ...action.payload },
      };
    },

    createUser(state, action) {
      return {
        ...state,
        createUser: { ...state.createUser, ...action.payload },
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

  call(`/users/login`, { method: "POST", body: { ...user } })
    .then((response) => {
      dispatch(
        userSlice.actions.login({
          user: response.data.user,
          accessToken: response.data.token,
        })
      );
      success(dispatch, userSlice.actions.login);
    })
    .catch((error) => {
      fail(dispatch, userSlice.actions.login, error);
    });
};

export const verifyToken = (accessToken) => async (dispatch) => {
  dispatch(userSlice.actions.verifyToken({ loading: true, tried: true }));

  call(`/users/verifyToken`, { method: "POST", body: { accessToken } })
    .then((response) => {
      dispatch(
        userSlice.actions.verifyToken({
          isValid: true,
        })
      );
      success(dispatch, userSlice.actions.verifyToken);
    })
    .catch((error) => {
      localStorage.removeItem("accessToken");
      fail(dispatch, userSlice.actions.verifyToken, error);
    });
};

// export const getUsers = (data) => async (dispatch) => {
//   dispatch(userSlice.actions.getUsers({ loading: true, tried: true }));

//   axios
//     .post(`${BASE_API_PATH}/users/get`, data)
//     .then((response) => {
//       dispatch(
//         userSlice.actions.getUsers({
//           users: response.data,
//         })
//       );
//       success(dispatch, userSlice.actions.getUsers);
//     })
//     .catch((error) => {
//       fail(dispatch, userSlice.actions.getUsers, error);
//     });
// };

export const createUser = (user) => async (dispatch) => {
  dispatch(userSlice.actions.createUser({ loading: true, tried: true }));

  call(`/users/signup`, { method: "POST", body: { ...user } })
    .then((response) => {
      success(dispatch, userSlice.actions.createUser);
    })
    .catch((error) => {
      fail(dispatch, userSlice.actions.createUser, error);
    });
};

// export const updateUser = (user) => async (dispatch) => {
//   dispatch(userSlice.actions.updateUser({ loading: true, tried: true }));

//   axios
//     .put(`${BASE_API_PATH}/users/update`, user)
//     .then((response) => {
//       success(dispatch, userSlice.actions.updateUser);
//     })
//     .catch((error) => {
//       fail(dispatch, userSlice.actions.updateUser, error);
//     });
// };

// export const deleteUser = (userId) => async (dispatch) => {
//   dispatch(userSlice.actions.deleteUser({ loading: true, tried: true }));

//   axios
//     .delete(`${BASE_API_PATH}/users/delete/${userId}`)
//     .then((response) => {
//       success(dispatch, userSlice.actions.deleteUser);
//     })
//     .catch((error) => {
//       fail(dispatch, userSlice.actions.deleteUser, error);
//     });
// };

// export const resetPassword = (user) => async (dispatch) => {
//   alert("loading", "loading ...");

//   axios
//     .put(`${BASE_API_PATH}/users/resetPassword`, user)
//     .then((response) => {
//       alert(
//         "success",
//         'Your password has been reset. A "Reset Password" email has been sent to you'
//       );
//       dispatch(userSlice.actions.logout());
//     })
//     .catch((error) => {
//       alert("error", error.response.data.error || "Try again later");
//     });
// };

// export const configurePassword = (userData) => async (dispatch) => {
//   dispatch(userSlice.actions.configurePassword({ loading: true, tried: true }));

//   axios
//     .put(`${BASE_API_PATH}/users/configurePassword`, userData)
//     .then((response) => {
//       success(dispatch, userSlice.actions.configurePassword);
//     })
//     .catch((error) => {
//       fail(dispatch, userSlice.actions.configurePassword, error);
//     });
// };

export const userReset = (state) => async (dispatch) => {
  dispatch(userSlice.actions.universalReset({ state: state }));
};

export const { logout } = userSlice.actions;

export default userSlice.reducer;
