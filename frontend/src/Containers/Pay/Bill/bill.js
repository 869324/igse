import styles from "./bill.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { pay } from "../../../StateManagement/Reducers/billReducer";

function Bill(props) {
  const { bill, setSelectedBill } = props;
  const dispatch = useDispatch();

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2 className={styles.h2}>Pay Bill</h2>

        <AiOutlineClose
          className={styles.close}
          size={28}
          onClick={() => setSelectedBill(null)}
        />
      </div>

      <div className={styles.billDiv}>
        <span className={styles.billDiv2}>
          <span className={styles.infoDiv}>
            <label className={styles.label}>From Date:</label>
            <label className={styles.value}>{bill.fromDate}</label>
          </span>
        </span>

        <span className={styles.billDiv2}>
          <span className={styles.infoDiv}>
            <label className={styles.label}>To Date:</label>
            <label className={styles.value}>{bill.toDate}</label>
          </span>
        </span>
      </div>

      <div className={styles.billDiv}>
        <span className={styles.billDiv2}>
          <span className={styles.infoDiv}>
            <label className={styles.label}>Electricity Day:</label>
            <label className={styles.value}>{bill.electricityDay}</label>
          </span>
        </span>

        <span className={styles.billDiv2}>
          <span className={styles.infoDiv}>
            <label className={styles.label}>Electricity Night:</label>
            <label className={styles.value}>{bill.electricityNight}</label>
          </span>
        </span>
      </div>

      <div className={styles.billDiv}>
        <span className={styles.billDiv2}>
          <span className={styles.infoDiv}>
            <label className={styles.label}>Gas:</label>
            <label className={styles.value}>{bill.gas}</label>
          </span>
        </span>

        <span className={styles.billDiv2}>
          <span className={styles.infoDiv}>
            <label className={styles.label}>Standing Charge:</label>
            <label className={styles.value}>{bill.standingCharge}</label>
          </span>
        </span>
      </div>

      <div className={styles.billDiv}>
        <span className={styles.billDiv2}>
          <span className={styles.infoDiv}>
            <label className={styles.label}>Total</label>
            <label className={styles.value}>{bill.total}</label>
          </span>
        </span>
      </div>

      <div className={styles.actions}>
        <button className={styles.pay} onClick={() => dispatch(pay(bill))}>
          Pay
        </button>
      </div>
    </div>
  );
}

export default Bill;
