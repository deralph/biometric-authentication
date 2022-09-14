import React, { useCallback, useEffect, useState } from "react";
import { fetchRequest } from "../../functions/endpointsRoute";
import attendance, { students } from "../helperComponent/attendance";
import StudentCourses from "../helperComponent/StudentCourses";
import styles from "../../styles/dashboard.module.css";

const Dashboard = () => {
  const [classes, setClasses] = useState(attendance);
  const [classerr, setClasserr] = useState();
  const [studerr, setStuderr] = useState();
  const [allStudents, setStudents] = useState(students);
  const Fetcher = useCallback(async () => {
    const { returnData: classesData, err: classesErr } = fetchRequest(
      "get",
      "class"
    );
    setClasses(classesData.classes);
    if (classesErr) {
      setClasserr("oops an error occured in getting the classes");
    }
    const { returnData: studentData, err: studentErr } = fetchRequest(
      "get",
      "admin/students"
    );
    setStudents(studentData.student);
    if (studentErr) {
      setStuderr("oops an error occured in getting the stugdents");
    }
  }, [fetchRequest]);

  // useEffect(() => {
  //   Fetcher();
  // }, [Fetcher]);
  return (
    <section className={styles.section}>
      <article className={styles.content}>
        {classes && (
          <>
            <h2>welcome admin</h2>

            <p
              className={styles["admin-total"]}
            >{`total classes : ${classes.length}`}</p>
            <h3>all classes</h3>
            <div className={styles.line} />
            <StudentCourses data={classes} />
          </>
        )}
      </article>
      <article className={styles.content}>
        {classes && (
          <>
            <h3>all students</h3>
            <div className={styles.line} />
            <p
              className={styles["admin-total"]}
            >{`total students : ${classes.length}`}</p>
            <StudentCourses data={allStudents} student />
          </>
        )}
      </article>
    </section>
  );
};

export default Dashboard;
