import React from "react";
import { FaBookOpen } from "react-icons/fa";
import styles from "../../styles/home.module.css";
import Form from "./Form";

const Home = ({ attendance, admin }) => {
  return (
    <>
      <section className={styles.section}>
        <img className={styles.imgs} src="/student.jpg" alt="student" />
        <div className={styles.left}>
          <img src="/student.jpg" alt="student" />
          <div>
            <p style={{ display: "flex", justifyContent: "center" }}>
              <FaBookOpen className={styles.book} />
            </p>

            <h2>attendance management system</h2>
            <p>
              Easy and reliable system for taking attendance with the use of
              biometric
            </p>
          </div>
        </div>
        <div className={styles.right}>
          {attendance ? <Form attendance /> : admin ? <Form admin /> : <Form />}
        </div>
      </section>
    </>
  );
};

export default Home;
