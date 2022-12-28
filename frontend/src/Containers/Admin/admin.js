import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  getUserData,
  verifyToken,
} from "../../StateManagement/Reducers/userReducer";
import Header from "../Header/header";
import NavBar from "../NavBar/navBar";
import Prices from "../Prices/prices";
import Readings from "../Readings/readings";
import styles from "./admin.module.scss";

function Admin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tokenState = useSelector((state) => state.user.verifyToken);
  const { user } = useSelector((state) => state.user.getUserData);

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
            <Route path="/" element={<Navigate to="prices" />} />
            <Route path="prices" element={<Prices />} />
            {/* <Route path="meter-readings" element={<Topup />} />
            <Route path="statistics" element={<Pay />} /> */}
          </Routes>
        </div>
      </div>
    </main>
  );
}
export default Admin;
