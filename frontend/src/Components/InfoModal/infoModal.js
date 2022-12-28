import { useDispatch } from "react-redux";
import styles from "./infoModal.module.scss";
import { resetAlert } from "../../StateManagement/Reducers/alertReducer";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { INFO_TYPES } from "../../Constants/constants";

function InfoModal(props) {
  const { type, message } = props;
  const dispatch = useDispatch();

  return (
    <div
      className={styles.modalContent}
      style={{ width: "30%", height: "30%" }}
    >
      <div className={styles.modalMessage}>
        <p className={styles.message}>{message}</p>
      </div>

      {type == INFO_TYPES.SUCCESS && (
        <FaCheck className={styles.iconOk} size={70} />
      )}

      {type == INFO_TYPES.ERROR && (
        <MdError className={styles.iconError} size={70} />
      )}

      <div className={styles.modalActions}>
        <button id={styles.close} onClick={() => dispatch(resetAlert())}>
          Close
        </button>
      </div>
    </div>
  );
}

export default InfoModal;
