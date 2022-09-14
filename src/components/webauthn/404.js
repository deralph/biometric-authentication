import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/404.module.css";
const Error = () => {
  return (
    <section className={styles.error}>
      <img src="/error.png" alt="404 error" />
      <div className={styles["error-cont"]}>
        <h3>404 - Page Not Found</h3>
        <p>
          The page you are looking for might have been removed, had its name
          changed or is temporarily not available
        </p>
        <Link to="/">Go to homePage</Link>
      </div>
    </section>
  );
};

export default Error;
