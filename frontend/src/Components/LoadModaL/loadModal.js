import styles from "./loadModal.module.scss";

import { MdOutlineClose } from "react-icons/md";
import Spinner from "../Spinner/spinner";

function LoadModal(props) {
  const { message, loadStatus } = props;

  return (
    <div
      className={styles.modalContent}
      style={{ width: "25%", height: "25%" }}
    >
      <div className={styles.modalHeader}>
        <h2>{message}</h2>
      </div>

      <div className={styles.modalIcon}>
        <Spinner/>
      </div>

      <div className={styles.modalMessage}></div>

      <div className={styles.modalActions}>
        <button>Close</button>
      </div>
    </div>
  );
}

export default LoadModal;
