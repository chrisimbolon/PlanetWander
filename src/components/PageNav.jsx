import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useState } from "react";
import { useAuth } from "../contexts/FakeAuthContext"; // Import auth context

function PageNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // Get auth state & logout function

  function toggleMenu() {
    setIsMenuOpen((prev) => {
      console.log("Menu state toggled:", !prev);
      return !prev;
    });
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <Logo />
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
          <NavLink to="/testimonial">Testimonial</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          {isAuthenticated ? (
            <button className={styles.ctaLink} onClick={logout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
