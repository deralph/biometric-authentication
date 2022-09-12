import React, { useState } from "react";
import styles from "../../styles/navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <nav className={styles.nav}>
      <div className="logo">logo</div>
      <FaBars className={styles.bar} onClick={() => setShowNav(!showNav)} />
      <ul className={showNav ? styles.sidenav : styles.normal}>
        <FaTimes className={styles.bar} onClick={() => setShowNav(!showNav)} />
        <li>Take attendance</li>
        <li>Dashboard</li>
        <li>Register Bio</li>
      </ul>
    </nav>
  );
};

export default Navbar;
