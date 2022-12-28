import { NavLink, useNavigate } from "react-router-dom";

import { GiPayMoney } from "react-icons/gi";
import { HiCreditCard } from "react-icons/hi";
import { FaTachometerAlt } from "react-icons/fa";
import { ImStatsDots } from "react-icons/im";
import { useSelector } from "react-redux";

import styles from "./navBar.module.scss";

function NavBar() {
  const { user } = useSelector((state) => state.user.getUserData);

  const userLinks = [
    <NavLink
      to="readings"
      className={(navData) => (navData.isActive ? styles.active : styles.link)}
    >
      <FaTachometerAlt className={styles.tabIcon} size={21} />
      Submit Readings
    </NavLink>,

    <NavLink
      to="pay"
      className={(navData) => (navData.isActive ? styles.active : styles.link)}
    >
      <GiPayMoney className={styles.tabIcon} size={21} />
      Pay Bills
    </NavLink>,

    <NavLink
      to="topup"
      className={(navData) => (navData.isActive ? styles.active : styles.link)}
    >
      <HiCreditCard className={styles.tabIcon} size={21} />
      Credit
    </NavLink>,
  ];

  const adminLinks = [
    <NavLink
      to="prices"
      className={(navData) => (navData.isActive ? styles.active : styles.link)}
    >
      <GiPayMoney className={styles.tabIcon} size={21} />
      Prices
    </NavLink>,

    <NavLink
      to="user-readings"
      className={(navData) => (navData.isActive ? styles.active : styles.link)}
    >
      <FaTachometerAlt className={styles.tabIcon} size={21} />
      Meter Readings
    </NavLink>,

    <NavLink
      to="statistics"
      className={(navData) => (navData.isActive ? styles.active : styles.link)}
    >
      <ImStatsDots className={styles.tabIcon} size={21} />
      Statistics
    </NavLink>,
  ];

  return (
    <div className={styles.dashboard}>
      {user ? (user.role == "ADMIN" ? adminLinks : userLinks) : userLinks}
    </div>
  );
}

export default NavBar;
