export const getMakeCredentialsChallenge = (formBody) => {
  return fetch("http://localhost:5000/webauthn/register", {
    // mode: "no-cors",
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formBody),
  })
    .then((response) => response.json())
    .then((response) => {
      // if (response.status !== "ok")
      //   throw new Error(
      //     `Server responed with error. The message is: ${response.message}`
      //   );

      return response;
    })
    .catch((error) => console.log(error));
};

export let sendWebAuthnResponse = (body) => {
  return fetch("http://localhost:5000/webauthn/response", {
    // mode: "no-cors",
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((response) => {
      // if (response.status !== "ok")
      //   throw new Error(
      //     `Server responed with error. The message is: ${response.message}`
      //   );

      return response;
    })
    .catch((error) => console.log(error));
};
