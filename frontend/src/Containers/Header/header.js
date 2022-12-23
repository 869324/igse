import styles from "./header.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { AiFillCaretDown } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdPersonPin } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { showModal } from "../../StateManagement/Reducers/modalReducer";
import { logout } from "../../StateManagement/Reducers/userReducer";
import Modal from "../../Components/Modal/modal";
import Profile from "./Profile/profile";

function Header(props) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const modalState = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.user.getUserData);

  return (
    <div className={styles.main}>
      {modalState.showModal && modalState.action == "profile" && (
        <Modal heading="Profile">
          <Profile user={user} />
        </Modal>
      )}

      <div className={styles.logo}>
        <img id={styles.logo} src="/Assets/igse-1.png" />
      </div>

      <h1 id={styles.h1}>Great Shangri-La Energy</h1>

      <div className={styles.accDiv}>
        <div
          className={styles.menuDiv}
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <MdPersonPin className={styles.avatar} size={35} />
          <AiFillCaretDown className={styles.dropIcon} />
          {showMenu && (
            <div className={styles.menu}>
              <div className={styles.menuItem}>
                <CgProfile className={styles.menuIcon} />
                <label
                  className={styles.menuText}
                  onClick={() => {
                    dispatch(showModal({ showModal: true, action: "profile" }));
                  }}
                >
                  Profile
                </label>
              </div>

              <div
                className={styles.menuItem}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <BiLogOut className={styles.menuIcon} />
                <label className={styles.menuText}>Logout</label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
