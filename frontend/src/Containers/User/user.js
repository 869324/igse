import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  getUserData,
  verifyToken,
} from "../../StateManagement/Reducers/userReducer";
import Header from "../Header/header";
import NavBar from "../NavBar/navBar";
import Readings from "../Readings/readings";
import styles from "./user.module.scss";

function User(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tokenState = useSelector((state) => state.user.verifyToken);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(getUserData(accessToken));
    }
  }, []);

  useEffect(() => {
    const { isValid, loading } = tokenState;
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
    } else if (!isValid && !loading) {
      dispatch(verifyToken(accessToken));
    }
  }, [tokenState]);

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url("/assets/bg.jpg")` }}
    >
      <Header />

      <div className={styles.content}>
        <NavBar />

        <div className={styles.panel}>
          <Routes>
            <Route path="/" element={<Navigate to="readings" />} />
            <Route path="readings" element={<Readings />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}
export default User;
