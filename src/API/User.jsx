import { ApiClient } from "./API";

export function CreateUser(body) {
  return ApiClient.post("/users", body);
}

export function LoginFun(email, pass) {
  return ApiClient.get(`/users?email=${email}&pass=${pass}`);
}
