import React from "react";
// import attendance from "../helperComponent/attendance";
import Course from "./Course";
import styles from "../../styles/dashboard.module.css";

const StudentCourses = ({ data, student }) => {
  return (
    <section>
      <ul className={styles.head}>
        <li>{student ? "admissionId" : "course title"}</li>
        <li>{student ? "email" : "teacher"}</li>
        <li>{student ? "class attended" : "course code"}</li>
        {!student && <li>date</li>}
      </ul>
      <article>
        {data.map((attended, index) => (
          <Course {...attended} key={index} />
        ))}
      </article>
    </section>
  );
};

export default StudentCourses;
