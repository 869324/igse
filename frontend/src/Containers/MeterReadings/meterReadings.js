import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../Components/Modal/modal";
import { getUsers } from "../../StateManagement/Reducers/userReducer";
import Details from "./Details/details";
import styles from "./meterReadings.module.scss";

function MeterReadings(props) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user.getUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div className={styles.main}>
      {selectedUser && (
        <Modal>
          <Details user={selectedUser} setSelectedUser={setSelectedUser} />
        </Modal>
      )}

      <h2>Meter Readings</h2>

      <table className={styles.table}>
        <thead>
          <tr className={styles.rowHeader}>
            <th>No</th>
            <th>Email</th>
            <th>Address</th>
            <th>Property Type</th>
            <th>Bedrooms</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {users.map((user, id) => {
            return (
              <tr
                className={styles.rowData}
                onClick={() => setSelectedUser(user)}
                key={id}
              >
                <td>{id + 1}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.propertyType}</td>
                <td>{user.numOfBedrooms}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MeterReadings;
