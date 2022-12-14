import Header from "../Header/header";
import styles from "./user.module.scss";

function User(props) {
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
