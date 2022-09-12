import React from "react";
// import attendance from "../helperComponent/attendance";
import Course from "./Course";
import styles from "../../styles/dashboard.module.css";

const StudentCourses = ({ data, admin }) => {
  return (
    <section>
      <ul className={styles.head}>
        <li>course title</li>
        <li>teacher</li>
        <li>course code</li>
        <li>date</li>
        {admin && (
          <>
            <li>class code</li>
            <li>closed</li>
          </>
        )}
      </ul>
      <article>
        {data.map((attended) => (
          <Course {...attended} />
        ))}
      </article>
    </section>
  );
};

export default StudentCourses;
