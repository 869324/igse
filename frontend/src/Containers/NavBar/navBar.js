import { NavLink, useNavigate } from "react-router-dom";

import { GiPayMoney } from "react-icons/gi";
import { HiCreditCard } from "react-icons/hi";
import { FaTachometerAlt } from "react-icons/fa";

import styles from "./navBar.module.scss";

function NavBar() {
  return (
    <div className={styles.dashboard}>
      <NavLink
        to="readings"
        className={(navData) =>
          navData.isActive ? styles.active : styles.link
        }
      >
        <FaTachometerAlt className={styles.tabIcon} size={21} />
        Submit Readings
      </NavLink>

      <NavLink
        to="pay"
        className={(navData) =>
          navData.isActive ? styles.active : styles.link
        }
      >
        <GiPayMoney className={styles.tabIcon} size={21} />
        Pay Bills
      </NavLink>

      <NavLink
        to="topup"
        className={(navData) =>
          navData.isActive ? styles.active : styles.link
        }
      >
        <HiCreditCard className={styles.tabIcon} size={21} />
        Credit
      </NavLink>
    </div>
  );
}

export default NavBar;
