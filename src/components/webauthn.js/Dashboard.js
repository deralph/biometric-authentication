import React, { useCallback, useEffect, useState } from "react";
import StudentCourses from "../helperComponent/StudentCourses";
import styles from "../../styles/dashboard.module.css";
import { fetchRequest } from "../../functions/endpointsRoute";

const Dashboard = () => {
  const [data, setData] = useState();
  const fetcher = useCallback(async () => {
    const { returnData, err } = fetchRequest("get", "auth/classes-attended");
    console.log(returnData, err);
    setData(returnData.attendance);
  }, [fetchRequest]);
  useEffect(() => {
    fetcher();
  }, [fetcher]);
  return (
    <section className={styles.section}>
      <h2>welcome yetunde,</h2>
      <article className={styles.content}>
        <div className={styles.course_mark}>
          <div className={styles.total}>
            <p>Current Total Classes: </p>
            <span style={{ color: "blue" }}>20</span>{" "}
          </div>
          <div className={styles.attended}>
            <p> Attended Classes: </p>
            <span style={{ color: "green" }}>{data && data.length}</span>
          </div>
          <div className={styles.missed}>
            <p>Missed Classes: </p>
            <span style={{ color: "red" }}>3</span>
          </div>
        </div>
        <h3>Courses Attended</h3>
        <div className={styles.line} />
        <StudentCourses data={data} />
      </article>
    </section>
  );
};

export default Dashboard;
