import React, { useCallback, useEffect, useState } from "react";
import { fetchRequest } from "../../functions/endpointsRoute";
import StudentCourses from "../helperComponent/StudentCourses";

const Dashboard = () => {
  const [classes, setClasses] = useState();
  const [classerr, setClasserr] = useState();
  const [studerr, setStuderr] = useState();
  const [students, setStudents] = useState();
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

  useEffect(() => {
    Fetcher();
  }, [Fetcher]);
  return (
    <section>
      <h2>welcome admin</h2>
      <h3>all classes</h3>
      <StudentCourses data={classes} admin />
    </section>
  );
};

export default Dashboard;
