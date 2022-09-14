import React, { useState } from "react";
import styles from "../../styles/home.module.css";
import { fetchRequest, regError } from "../../functions/endpointsRoute";
import { startAuthentication } from "@simplewebauthn/browser";

const Form = ({ attendance, admin }) => {
  const [message, setMessage] = useState("");
  const [inputs, setInputs] = useState({
    admissionId: "",
    email: "",
    course_code: "",
    class_code: "",
    adminId: "",
  });
  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    return setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (admin) {
      const { adminId, email } = inputs;
      if (!adminId || !email) setMessage("enter adminId and email");
      const route = "admin";
      const body = {
        adminId,
        email,
      };
      const { returnData, err } = await fetchRequest("post", route, body);
      console.log(returnData, err);
    }
    if (attendance) {
      const { course_code, class_code } = inputs;
      if (!course_code || !class_code)
        setMessage("enter course code and class code");
      // const route = "/admin";
      const body = {
        course_code,
        class_code,
      };
      const { returnData: genAuthOptData, err: genAuthOptError } =
        await fetchRequest("post", "bio/generate-authentication-options", body);
      console.log(genAuthOptData);
      if (genAuthOptError) {
        setMessage("an error ocured unable to take attendance");
        console.log(genAuthOptError);
      }
      let asseResp;
      try {
        asseResp = await startAuthentication(genAuthOptData);
      } catch (error) {
        console.log(error);
      }
      console.log(asseResp);
      const { returnData: verifyAuthOptData, err: verifyAuthOptError } =
        await fetchRequest("post", "bio/verify-authentication", asseResp);
      if (verifyAuthOptError) {
        setMessage("an error ocured unable to take attendance");
        console.log(verifyAuthOptError);
      }
      console.log(verifyAuthOptData);
    }

    // for student login
    if (!admin && !attendance) {
      const { admissionId, email } = inputs;
      if (!admissionId || !email) setMessage("enter admissionId and email");
      const body = { admissionId, email };
      const { returnData, err } = fetchRequest("post", "auth/login", body);
      console.log(returnData, err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>{attendance ? "Take Attendance" : "Login"}</h3>
      <input
        type="text"
        name={attendance ? "course_code" : admin ? "adminId" : "admissionId"}
        onChange={handleInputs}
        value={
          attendance
            ? inputs.course_code
            : admin
            ? inputs.adminId
            : inputs.admissionId
        }
        placeholder={
          attendance
            ? "enter course code"
            : admin
            ? "enter adminId"
            : "enter admissionId"
        }
      />
      <input
        type="text"
        name={attendance ? "class_code" : "email"}
        onChange={handleInputs}
        value={attendance ? inputs.class_code : inputs.email}
        placeholder={attendance ? "enter class code" : "enter email"}
      />
      <input type="submit" value={attendance ? "Take attendance" : "login"} />
    </form>
  );
};

export default Form;
