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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    } else if (!tokenState.isValid) {
      dispatch(verifyToken);
    }
  }, [tokenState]);

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
