import React, { useCallback, useEffect, useState } from "react";
import StudentCourses from "../helperComponent/StudentCourses";
import styles from "../../styles/dashboard.module.css";
import { fetchRequest } from "../../functions/endpointsRoute";
import axios from "../../functions/axios";
import attendance from "../helperComponent/attendance";

const Dashboard = () => {
  const [data, setData] = useState(attendance);
  const [missed, setMissed] = useState([]);
  const [total, setTotal] = useState();
  const fetcher = useCallback(async () => {
    try {
      // const { data } = axios.get("auth/classes-attended");
      const { returnData, err } = await fetchRequest(
        "get",
        "auth/classes-attended"
      );
      console.log(returnData, err);
      // console.log(data);
      console.log(returnData.attended);
      setData(returnData.attended);
      setTotal(returnData.total);
      console.log(data, total);
      // setData(data.attendance);
    } catch (error) {
      console.log(error);
    }
  }, [fetchRequest]);
  // useEffect(() => {
  //   fetcher();
  // }, [fetcher]);
  return (
    <>
      {data && (
        <section className={styles.section}>
          <h2>welcome user,</h2>
          <article className={styles.content}>
            <div className={styles.course_mark}>
              <div className={styles.total}>
                <p>Current Total Classes: </p>
                <span style={{ color: "blue" }}>
                  {data && data.length}
                </span>{" "}
              </div>
              <div className={styles.attended}>
                <p> Attended Classes: </p>
                <span style={{ color: "green" }}>{data && data.length}</span>
              </div>
              <div className={styles.missed}>
                <p>Missed Classes: </p>
                <span style={{ color: "red" }}>
                  {total ? total - data.length : 0}
                </span>
              </div>
            </div>
            <article>
              <h3>Courses Attended</h3>
              <div className={styles.line} />
              {data.length > 1 ? (
                <StudentCourses data={data} />
              ) : (
                <div className={styles.course}>
                  you have not attended any course this session
                </div>
              )}
            </article>
            <article>
              <h3>Classes missed</h3>
              <div className={styles.line} />
              {missed.length > 1 ? (
                <StudentCourses data={missed} />
              ) : (
                <div className={styles.course}>
                  you have not missed any class this session
                </div>
              )}
            </article>
          </article>
        </section>
      )}
    </>
  );
};

export default Dashboard;
