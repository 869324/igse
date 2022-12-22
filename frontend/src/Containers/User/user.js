import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../StateManagement/Reducers/userReducer";
import Header from "../Header/header";
import styles from "./user.module.scss";

function User(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tokenState = useSelector((state) => state.user.verifyToken);
  const { token } = useSelector((state) => state.user.login);

  useEffect(() => {
    const { isValid, loading } = tokenState;
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login");
    } else if (!isValid && !loading) {
      dispatch(verifyToken(accessToken));
    }
  }, [tokenState]);

  useEffect(() => {}, [token]);

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url("/assets/bg.jpg")` }}
    >
      <Header />

      <div className={styles.content}></div>
    </main>
  );
}
export default User;
