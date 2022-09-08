import React from "react";
import { useState } from "react";
import styles from "../../styles/signin.module.css";
import { startAuthentication } from "@simplewebauthn/browser";
import base64url from 'base64url'

// this is a login page for the which will be used to later take attendance

const Signin = () => {
  const [inputs, setInputs] = useState({ admissionId: "", email: "" });
  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    return setInputs({ ...inputs, [name]: value });
  };
var preformatGetAssertReq = (getAssert) => {
    getAssert.challenge = base64url.decode(getAssert.challenge);
    
    for(let allowCred of getAssert.allowCredentials) {
        allowCred.id = base64url.decode(allowCred.id);
    }

    return getAssert
}

var publicKeyCredentialToJSON = (pubKeyCred) => {
    if(pubKeyCred instanceof Array) {
        let arr = [];
        for(let i of pubKeyCred)
            arr.push(publicKeyCredentialToJSON(i));

        return arr
    }

    if(pubKeyCred instanceof ArrayBuffer) {
        return base64url.encode(pubKeyCred)
    }

    if(pubKeyCred instanceof Object) {
        let obj = {};

        for (let key in pubKeyCred) {
            obj[key] = publicKeyCredentialToJSON(pubKeyCred[key])
        }

        return obj
    }

    return pubKeyCred
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { admissionId, email } = inputs;
    console.log(admissionId, email);
    if (!admissionId || !email) {
      alert("Name or username is missing!");
      return;
    }

    // Start authentication when the user clicks a button

    // GET authentication options from the endpoint that calls
    // @simplewebauthn/server -> generateAuthenticationOptions()
    let asseResp;
    try {
      const resp = await fetch(
        "http://localhost:5000/generate-authentication-options",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
          credentials: "include",
        }
      );

      // Pass the options to the authenticator and wait for a response
     const response = await resp.json()
     console.log(response)
//       console.log(response) 
//       if(response.status !== 'ok')
//             throw new Error(`Server responed with error. The message is: ${response.message}`);

//  let publicKey = preformatGetAssertReq(response)
//  const pubkeyRes =  await navigator.credentials.get({ publicKey })
//   let getAssertionResponse = publicKeyCredentialToJSON(pubkeyRes)
//   console.log(getAssertionResponse)
            asseResp = await startAuthentication(response);
            console.log(asseResp)
    } catch (error) {
      // Some basic error handling

      console.log(error);
      throw error;
    }

    // POST the response to the endpoint that calls
    // @simplewebauthn/server -> verifyAuthenticationResponse()
    try {
      const verificationResp = await fetch(
        "http://localhost:5000/verify-authentication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(asseResp),
          credentials: "include",
        }
      );

      // Wait for the results of verification
      const verificationJSON = await verificationResp.json();

      // Show UI appropriate for the `verified` status
      if (verificationJSON && verificationJSON.verified) {
        console.log("Success!", verificationJSON);
      } else {
        console.log(`Oh no, something went wrong! Response:`);
      }
    } catch (error) {
      console.log(error);
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
        <input type="submit" value="login" />
      </form>
    </section>
  );
};

export default Signin;
