import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useState } from "react";

function PageNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    // setIsMenuOpen((prev) => !prev);
    setIsMenuOpen((prev) => {
      console.log("Menu state toggled:", !prev);
      return !prev;
    });
  }
  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <Logo />
        {/* Hamburger / Close Icon */}
        <button
          className={`${styles.hamburger}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>
      <ul className={`${styles.menu} ${isMenuOpen ? styles.show : ""}`}>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
