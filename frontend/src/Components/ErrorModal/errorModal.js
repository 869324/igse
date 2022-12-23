import { useDispatch } from "react-redux";
import styles from "./errorModal.module.scss";
import { resetAlert } from "../../StateManagement/Reducers/alertReducer";
import { MdError } from "react-icons/md";

function ErrorModal(props) {
  const { message } = props;
  const dispatch = useDispatch();

  return (
    <div
      className={styles.modalContent}
      style={{ width: "30%", height: "30%" }}
    >
      <div className={styles.modalMessage}>
        <label className={styles.message}>{message}</label>
      </div>

      <MdError className={styles.icon} size={70} />

      <div className={styles.modalActions}>
        <button id={styles.close} onClick={() => dispatch(resetAlert())}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
