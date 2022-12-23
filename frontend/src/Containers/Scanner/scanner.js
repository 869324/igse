import styles from "./scanner.module.scss";

import React from "react";
import QrReader from "react-qr-scanner";
import { useDispatch } from "react-redux";
import { showModal } from "../../StateManagement/Reducers/modalReducer";

function Scanner(props) {
  const dispatch = useDispatch();

  const { setScan, getScan } = props;
  const scanError = () => {
    dispatch(showModal({ showModal: true, action: "error" }));
  };

  return (
    <div className={styles.modalBg}>
      <div className={styles.modalCont}>
        <div className="editPopClose" onClick={() => setScan(false)}>
          +
        </div>
        <h3>Scan QR</h3>
        <QrReader
          className="scanner"
          delay={100}
          onError={scanError}
          onScan={getScan}
        />
      </div>
    </div>
  );
}

export default Scanner;
