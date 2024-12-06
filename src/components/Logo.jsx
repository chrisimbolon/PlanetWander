import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img
        src="../public/Planet-Wander-Logo.png"
        alt="Planet Wander logo"
        className={styles.logo}
      />
    </Link>
  );
}

export default Logo;