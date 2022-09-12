import React from "react";
import styles from "../../styles/dashboard.module.css";

const Course = ({
  title,
  teacher,
  course_code,
  class_code,
  closed,
  createdAt,
}) => {
  return (
    <div className={styles.course}>
      <p>
        <span className={styles.smallview}>Title:</span>
        {title}
      </p>
      <p>
        <span className={styles.smallview}> Teacher:</span>
        {teacher}
      </p>
      <p>
        <span className={styles.smallview}> course code:</span>
        {course_code}
      </p>
      <p>
        <span className={styles.smallview}> Date:</span>
        {createdAt}
      </p>
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
