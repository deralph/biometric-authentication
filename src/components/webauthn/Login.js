import React from "react";
import { useState } from "react";
import styles from "../../styles/signin.module.css";
import { startAuthentication } from "@simplewebauthn/browser";
import base64url from "base64url";
import { fetchRequest, RegisterPortal } from "../../functions/endpointsRoute";
import axios from "axios";
import style from "../../styles/home.module.css";
import { FaBookOpen } from "react-icons/fa";

// this is a login page for the which will be used to later take attendance

const Signin = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    admissionId: "",
  });
  // const [admissionId, setAdmissionId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullname, email } = inputs;
    const nameNo = fullname.trim().split(" ");
    const regname = `${fullname[0]}${nameNo[1]}`;
    const regNo = Math.floor(Math.random() * 1000);
    const admissionId = `${regname}${regNo}`;
    if (!fullname || !email) {
      alert("Enter valid fullname or email");
      return;
    } else if (nameNo.length > 2) {
      alert("Enter fullname");
      console.log(fullname);
      return;
    }
    // const { returnData, err } = await fetchRequest(
    //   "post",
    //   "auth/register",
    //   inputs
    // );
    // console.log(returnData, err);
    console.log("ok", nameNo, regname, regNo, admissionId, nameNo.length);
    // setAdmissionId(reg);
    setInputs({ ...inputs, admissionId });
  };
  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <section className={styles.form_section}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p style={{ display: "flex", justifyContent: "center" }}>
          <FaBookOpen className={styles.book} />
        </p>
        <input
          type="text"
          name="fullname"
          onChange={handleInputs}
          value={inputs.fullname}
          placeholder="Enter Fullname"
        />
        <input
          type="text"
          name="email"
          onChange={handleInputs}
          value={inputs.email}
          placeholder="Enter Email"
        />
        <input type="submit" value="Register" />
        {inputs.admissionId && (
          <>
            <p>
              Your admissionId is <span>{inputs.admissionId}</span>{" "}
            </p>
            <p>Check your inbox for more details on your registration</p>
          </>
        )}
      </form>
    </section>
  );
};

export default Signin;
