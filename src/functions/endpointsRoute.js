import axios from "./axios";
import { startRegistration } from "@simplewebauthn/browser";
export const fetchRequest = async (type, route, body) => {
  let returnData, err;
  try {
    const { data } = await axios[type](route, body);
    returnData = data;
    console.log(data);
  } catch (error) {
    console.log(error);
    err = error;
  }
  return { returnData, err };
};

// export const RegisterPortal = async (body) => {
//   let returnData, err;
//   try {
//     const { data } = await axios.post(
//       "http://localhost:5000/api/v1/auth/register",
//       body
//     );
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//     err = error;
//   }
//   return { returnData, err };
// };
// export const loginStudent = async (body) => {
//   let returnData, err;
//   try {
//     const { data } = await axios.post("/auth/login", body);
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//     err = error;
//   }
//   return { returnData, err };
// };
// export const getStudentAttendedClasses = async (body) => {
//   let returnData, err;
//   try {
//     const { data } = await axios.get("/auth/classes-attended", body);
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//     err = error;
//   }
//   return { returnData, err };
// };

// export const generateBioRegistrationOption = async (body) => {
//   let returnData, err;

//   try {
//     const { data } = await axios.post(
//       "/bio/generate-registration-options",
//       body
//     );
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   return { returnData, err };
// };
// export const verifyRegistration = async (body) => {
//   let returnData, err;

//   try {
//     const { data } = await axios.post("/bio/verify-registration", body);
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   return { returnData, err };
// };
// export const generateBioAuthOption = async (body) => {
//   let returnData, err;

//   try {
//     const { data } = await axios.post(
//       "/bio/generate-authentication-options",
//       body
//     );
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   return { returnData, err };
// };
// export const verifyBioAuth = async (body) => {
//   let returnData, err;

//   try {
//     const { data } = await axios.post("/bio/verify-authentication", body);
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   return { returnData, err };
// };
// export const deleteUnregisteredStudent = async (body) => {
//   let returnData, err;

//   try {
//     const { data } = await axios.post("/bio/delete-unregistered-student", body);
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   return { returnData, err };
// };
// export const createClassesByTheAdmin = async (body) => {
//   let returnData, err;

//   try {
//     const { data } = await axios.post("/class", body);
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   return { returnData, err };
// };
// export const getAllClassesByTheAdmin = async (body) => {
//   let returnData, err;

//   try {
//     const { data } = await axios.get("/class", body);
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   return { returnData, err };
// };
// export const closeClassByAdmin = async (id, body) => {
//   let returnData, err;

//   try {
//     const { data } = await axios.patch(`/class/close-class/${id}`, body);
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   return { returnData, err };
// };
// export const adminLogin = async (body) => {
//   let returnData, err;

//   try {
//     const { data } = await axios.post("/admin", body);
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   return { returnData, err };
// };
// export const getAllStudentAndTheirAtendanceByAdmin = async (body) => {
//   let returnData, err;

//   try {
//     const { data } = await axios.get("/admin/students", body);
//     returnData = data;
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
//   return { returnData, err };
// };

export const regError = async () => {
  const { returnData, err } = await fetchRequest(
    "get",
    "bio/delete-unregistered-student"
  );
  return { returnData, err };
};

// for biometric registration
export const registerBio = async () => {
  const { returnData: genRegOptData, err: genRegOptError } = await fetchRequest(
    "get",
    "bio/generate-registration-options"
  );
  if (genRegOptError) {
    const { returnData, err } = regError();
    console.log(returnData, err);
  }
  console.log(genRegOptData);
  const attResp = await startRegistration(genRegOptData);
  console.log(attResp);
  const { returnData: verifyRegOptData, err: verifyRegOptError } =
    await fetchRequest("post", "bio/verify-registration", attResp);
  if (verifyRegOptError) {
    const { returnData, err } = regError();
    console.log(returnData, err);
  }
  console.log(verifyRegOptData);
};

// for closing attendance

export const closeAttendance = (id) => {
  const { returnData, err } = fetchRequest("patch", `class/close-class/${id}`);
  return { returnData, err };
};
