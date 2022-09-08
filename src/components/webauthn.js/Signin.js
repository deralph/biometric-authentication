import React from "react";
import { useState } from "react";
import styles from "../../styles/signin.module.css";
import { startRegistration } from "@simplewebauthn/browser";

// this is a Signin page for the which will be used to later take attendance

const Signin = () => {
  const [inputs, setInputs] = useState({ admissionId: "", email: "" });
  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    return setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let attResp;
    const { admissionId, email } = inputs;
    console.log(admissionId, email);
    if (!admissionId || !email) {
      alert("Name or username is missing!");
      return;
    }

    try {
      const resp = await fetch(
        "http://localhost:5000/generate-registration-options",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
          credentials: "include",
        }
      );

      // let challenge
      const res = await resp.json();
      console.log(res);
      // Pass the options to the authenticator and wait for a response
      attResp = await startRegistration(res);
      // console.log(resp.json());
      console.log(attResp);
    } catch (error) {
      // Some basic error handling
      if (error.name === "InvalidStateError") {
        // elemError.innerText =
        // "Error: Authenticator was probably already registered by user";
        console.log(
          "Error: Authenticator was probably already registered by user"
        );
      } else {
        // elemError.innerText = error;
        console.log("this is not an invalid state error");
      }

      throw error;
    }

    // POST the response to the endpoint that calls
    // @simplewebauthn/server -> verifyRegistrationResponse()
    const verificationResp = await fetch(
      "http://localhost:5000/verify-registration",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attResp),
        credentials: "include",
      }
    );

    // Wait for the results of verification
    const verificationJSON = await verificationResp.json();

    // Show UI appropriate for the `verified` status
    if (verificationJSON && verificationJSON.verified) {
      // elemSuccess.innerHTML = "Success!";
      console.log("sucess");
      console.log(verificationJSON);
    } else {
      // elemError.innerHTML = `Oh no, something went wrong! Response: <pre>${JSON.stringify(
      // verificationJSON
      // )}</pre>`;
      console.log(`Oh no, something went wrong! Response: `);
    }
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
        <input type="submit" value="submit" />
      </form>
    </section>
  );
};

export default Signin;
