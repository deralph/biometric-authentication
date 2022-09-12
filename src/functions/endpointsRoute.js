import axios from "./axios";

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
  const { returnData: verifyRegOptData, err: verifyRegOptError } =
    await fetchRequest("post", "bio/verify-registration", genRegOptData);
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
