import { useSelector } from "react-redux";
import styles from "./profile.module.scss";
import { useDispatch } from "react-redux/es/exports";
import { AiOutlineClose } from "react-icons/ai";
import { showModal } from "../../../StateManagement/Reducers/modalReducer";

function Profile(props) {
  const dispatch = useDispatch();
  const { user } = props;

  return (
    <div className={styles.main} style={{ width: "40%", height: "40%" }}>
      <AiOutlineClose
        id={styles.close}
        size={21}
        onClick={() => dispatch(showModal({ showModal: false, action: "" }))}
      />

      <div className={styles.classData}>
        <div className={styles.infoDiv}>
          <label className={styles.label}>Email:</label>
          <label className={styles.value}>{user.email}</label>
        </div>

        <div className={styles.infoDiv}>
          <label className={styles.label}>Role:</label>
          <label className={styles.value}>{user.role}</label>
        </div>
      </div>

      <div className={styles.classData}>
        <div className={styles.infoDiv}>
          <label className={styles.label}>Propety Type:</label>
          <label className={styles.value}>{user.propertyType}</label>
        </div>

        <div className={styles.infoDiv}>
          <label className={styles.label}>Num of Bedrooms:</label>
          <label className={styles.value}>{user.numOfBedrooms}</label>
        </div>
      </div>

      <div className={styles.classData}>
        <div className={styles.infoDiv}>
          <label className={styles.label}>Address:</label>
          <label className={styles.value}>{user.address}</label>
        </div>
      </div>
    </div>
  );
}

Profile.defaultProps = {
  user: {
    userId: "",
    firstname: "",
    lastname: "",
    email: "",
    userType: 3,
  },
};

export default Profile;
