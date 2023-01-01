import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/header";
import MeterReadings from "../MeterReadings/meterReadings";
import NavBar from "../NavBar/navBar";
import Prices from "../Prices/prices";
import styles from "./admin.module.scss";
import Stats from "../Stats/stats";

function Admin(props) {
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
            <Route path="/" element={<Navigate to="prices" />} />
            <Route path="prices" element={<Prices />} />
            <Route path="user-readings" element={<MeterReadings />} />
            <Route path="statistics" element={<Stats />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}
export default Admin;
