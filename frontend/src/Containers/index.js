import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  verifyToken,
} from "../StateManagement/Reducers/userReducer";
import User from "../Containers/User/user";
import Admin from "./Admin/admin";

function UserRouter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tokenState = useSelector((state) => state.user.verifyToken);
  const { user } = useSelector((state) => state.user.getUserData);

  useEffect(() => {
    navigate("/igse");
  }, []);

  useEffect(() => {
    if (!user) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        dispatch(getUserData(accessToken));
      }
    }
  }, [user]);

  useEffect(() => {
    const { isValid, loading } = tokenState;
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
    } else if (!isValid && !loading) {
      dispatch(verifyToken(accessToken));
    }
  }, [tokenState]);

  return user ? (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={user.role == "ADMIN" ? "admin" : "user"} />}
      />
      <Route path="user/*" element={<User />} />
      <Route path="admin/*" element={<Admin />} />
    </Routes>
  ) : (
    <Routes></Routes>
  );
}

export default UserRouter;
