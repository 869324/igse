import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBills } from "../../StateManagement/Reducers/billReducer";
import styles from "./pay.module.scss";
import { HiEye } from "react-icons/hi";
import Modal from "../../Components/Modal/modal";
import Bill from "./Bill/bill";

function Pay(props) {
  const dispatch = useDispatch();
  const { bills } = useSelector((state) => state.bill.getBills);
  const { user } = useSelector((state) => state.user.getUserData);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(getBills(user.id));
    }
  }, [user]);

  return bills && bills.length ? (
    <div className={styles.main}>
      {selectedBill && (
        <Modal>
          <Bill bill={selectedBill} setSelectedBill={setSelectedBill} />
        </Modal>
      )}

      <h2 className={styles.h2}>Bills</h2>

      <table className={styles.table}>
        <thead>
          <tr className={styles.rowHead}>
            <th className={styles.thead}>No</th>
            <th className={styles.thead}>From</th>
            <th className={styles.thead}>To</th>
            <th className={styles.thead}>Amount</th>
            <th className={styles.thead}>View</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill, id) => {
            return (
              <tr className={styles.row}>
                <td className={styles.tdata}>{id + 1}</td>
                <td className={styles.tdata}>{bill.fromDate}</td>
                <td className={styles.tdata}>{bill.toDate}</td>
                <td className={styles.tdata}>{bill.total}</td>
                <td className={styles.tdata}>
                  <HiEye
                    size={21}
                    className={styles.view}
                    onClick={() => setSelectedBill(bill)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className={styles.empty}>
      <h2>No Bills Available!</h2>
      <p>You need at leat 2 readings to be billed</p>
    </div>
  );
}

export default Pay;
