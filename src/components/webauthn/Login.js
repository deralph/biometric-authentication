import React from "react";
import { useState } from "react";
import styles from "../../styles/signin.module.css";
import { startAuthentication } from "@simplewebauthn/browser";
import base64url from "base64url";
import { fetchRequest, RegisterPortal } from "../../functions/endpointsRoute";
import axios from "axios";

// this is a login page for the which will be used to later take attendance

const Signin = () => {
  const [inputs, setInputs] = useState({ admissionId: "", email: "" });
  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    return setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { admissionId, email } = inputs;
    console.log(admissionId, email);
    if (!admissionId || !email) {
      alert("Name or username is missing!");
      return;
    }

    const { returnData, err } = await fetchRequest(
      "post",
      "auth/register",
      inputs
    );
    console.log(returnData, err);
  };

  return (
    <section className={styles.form_section}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="admissionId"
          onChange={handleInputs}
          value={inputs.admissionId}
          placeholder="enter admissionId"
        />
        <input
          type="text"
          name="email"
          onChange={handleInputs}
          value={inputs.email}
          placeholder="enter email"
        />
        <input type="submit" value="login" />
      </form>
    </section>
  );
};

export default Signin;
