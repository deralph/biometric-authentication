import React from "react";
import { Link } from "react-router-dom";
import { registerBio } from "../../functions/endpointsRoute";
// import { Link } from "react-router-dom";
import styles from "../../styles/welcome.module.css";
const Welcome = () => {
  return (
    <section className={styles.welcome}>
      <img src="/attendance-check.png" alt=" Welcome" />
      <div className={styles.info}>
        <h3> Welcome,</h3>
        <p>
          This is the attendance management system which helps you appear
          present for all classes attended by you as a student with the aid of
          you using your biometric and being present in the class to know the
          cclass code
        </p>
        <ul className={styles.links}>
          <li onClick={registerBio}>Register Biometric</li>
          <li>
            <Link to="/take-attendance">Take Attendance</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Welcome;
