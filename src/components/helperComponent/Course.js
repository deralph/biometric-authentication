import React from "react";
import styles from "../../styles/dashboard.module.css";

const Course = ({
  title,
  teacher,
  course_code,
  class_code,
  closed,
  createdAt,
  admissionId,
  email,
  attended,
}) => {
  return (
    <div className={styles.course}>
      <p>
        <span className={styles.smallview}>
          {email ? "AdmissionId" : "Title"}:
        </span>
        {email ? admissionId : title}
      </p>
      <p>
        <span className={styles.smallview}>
          {" "}
          {email ? "email" : "Teacher"}:
        </span>
        {email ? email : teacher}
      </p>
      <p>
        <span className={styles.smallview}>
          {" "}
          {email ? "class attended" : "course code"}:
        </span>
        {email ? attended : course_code}
      </p>
      {!email && (
        <p>
          <span className={styles.smallview}> Date:</span>
          {createdAt}
        </p>
      )}
      {class_code && (
        <>
          <p>
            <span className={styles.smallview}> class code:</span>
            {class_code}
          </p>
          <p>
            <span className={styles.smallview}> closed:</span>
            {closed}
          </p>
        </>
      )}
    </div>
  );
};

export default Course;
