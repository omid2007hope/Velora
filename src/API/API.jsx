import axios from "axios";

const baseURL = "http://localhost:3085/client/v1";
export const ApiClient = axios.create({ baseURL });
