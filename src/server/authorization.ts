import { auth } from "./environment";
const authorization = (headers: any): boolean => {
  if (!headers.authorization || headers.authorization.indexOf("Basic") === -1) {
    return false;
  }
  const credential = headers.authorization.split(" ")[1];
  const apiKey64 = Buffer.from(auth.apiKey, "utf8").toString("base64");
  if (credential === apiKey64) {
    return true;
  }
  return false;
};

export {
  authorization,
};
