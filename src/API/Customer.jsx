import { ApiClient } from "./API";

const base = "/Customer";

export function CheckIfEmailExist(body) {
  return ApiClient.post(`${base}/checkMobile`, body);
}

export function Login(body) {
  return ApiClient.post(`${base}/login`, body);
}
