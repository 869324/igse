import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/header";
import NavBar from "../NavBar/navBar";
import Readings from "../Readings/readings";
import Topup from "../Topup/topup";
import styles from "./user.module.scss";
import Pay from "../Pay/pay";
import Admin from "../Admin/admin";

function User(props) {
  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url("/assets/bg.jpg")` }}
    >
      <Header />

      <div className={styles.content}>
        <NavBar />

        <div className={styles.panel}>
          <Routes>
            <Route path="/" element={<Navigate to="readings" />} />
            <Route path="readings" element={<Readings />} />
            <Route path="topup" element={<Topup />} />
            <Route path="pay" element={<Pay />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}
export default User;
