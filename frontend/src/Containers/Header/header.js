import styles from "./header.module.scss";

function Header() {
  return (
    <nav className={styles.navBar}>
      <h1>IGSE</h1>
      <button>Log Out</button>
    </nav>
  );
}

export default Header;
