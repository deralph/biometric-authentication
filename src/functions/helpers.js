class WebAuthnHelpers {
  static coerceToArrayBuffer(input) {
    if (typeof input === "string") {
      // base64url to base64
      input = input.replace(/-/g, "+").replace(/_/g, "/");

      // base64 to Uint8Array
      var str = window.atob(input);
      var bytes = new Uint8Array(str.length);
      for (var i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
      }
      input = bytes;
    }

    // Array to Uint8Array
    if (Array.isArray(input)) {
      input = new Uint8Array(input);
    }

    // Uint8Array to ArrayBuffer
    if (input instanceof Uint8Array) {
      input = input.buffer;
    }

    // error if none of the above worked
    if (!(input instanceof ArrayBuffer)) {
      throw new TypeError("could not coerce '" + input + "' to ArrayBuffer");
    }

    return input;
  }

  static coerceToBase64Url(input) {
    // Array or ArrayBuffer to Uint8Array
    if (Array.isArray(input)) {
      input = Uint8Array.from(input);
    }

    if (input instanceof ArrayBuffer) {
      input = new Uint8Array(input);
    }

    // Uint8Array to base64
    if (input instanceof Uint8Array) {
      var str = "";
      var len = input.byteLength;

      for (var i = 0; i < len; i++) {
        str += String.fromCharCode(input[i]);
      }
      input = window.btoa(str);
    }

    if (typeof input !== "string") {
      throw new Error("could not coerce to string");
    }

    // base64 to base64url
    // NOTE: "=" at the end of challenge is optional, strip it off here
    input = input.replace(/\+/g, "-").replace(/\//g, "_").replace(/=*$/g, "");

    return input;
  }
}
// import { decode } from "./base64url-arraybuffer";
const base64url = require("base64url");

export var preformatMakeCredReq = (makeCredReq) => {
  // makeCredReq.challenge = base64url.decode(makeCredReq.challenge);
  // makeCredReq.user.id = base64url.decode(makeCredReq.user.id);
  makeCredReq.challenge = WebAuthnHelpers.coerceToArrayBuffer(
    makeCredReq.challenge
  );

  makeCredReq.user.id = WebAuthnHelpers.coerceToArrayBuffer(
    makeCredReq.user.id
  );

  return makeCredReq;
};

export var publicKeyCredentialToJSON = (pubKeyCred) => {
  if (pubKeyCred instanceof Array) {
    let arr = [];
    for (let i of pubKeyCred) arr.push(publicKeyCredentialToJSON(i));

    return arr;
  }

  if (pubKeyCred instanceof ArrayBuffer) {
    return base64url.encode(pubKeyCred);
  }

  if (pubKeyCred instanceof Object) {
    let obj = {};

    for (let key in pubKeyCred) {
      obj[key] = publicKeyCredentialToJSON(pubKeyCred[key]);
    }

    return obj;
  }

  return pubKeyCred;
};
