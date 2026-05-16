import { jwtDecode } from "jwt-decode";
import { getTokenFn } from "./getTokenFun";

interface DecodedToken {
  id: string;
  name: string;
  email: string;
}

export async function getUserData() {
  const token = await getTokenFn();

  if (!token) {
    return null;
  }

  const decoded = jwtDecode<DecodedToken>(token);

  return decoded;
}
