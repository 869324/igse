import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../StateManagement/Reducers/modalReducer";
import { login } from "../../StateManagement/Reducers/userReducer";
import styles from "./login.module.scss";

function Login(props) {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.user.login);

  useEffect(() => {
    const { tried, status, error, accessToken, user } = loginState;
    if (status && user && accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else if (tried) {
      dispatch(showModal({ status: true, action: "error" }));
    }
  }, [loginState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  return (
    <div
      className={styles.main}
      style={{ backgroundImage: `url("/assets/bg.jpg")` }}
    >
      <div className={styles.overlay}>
        <form className={styles.form} onSubmit={submit}>
          <span className={styles.span}>
            <label className={styles.label}>Username</label>
            <input
              className={styles.input}
              onChange={handleChange}
              name="username"
              value={formData.username}
              required
            />
          </span>

          <span className={styles.span}>
            <label className={styles.label}>Username</label>
            <input
              className={styles.input}
              onChange={handleChange}
              name="password"
              value={formData.password}
              required
            />
          </span>

          <button onClick={login} className={styles.login}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
