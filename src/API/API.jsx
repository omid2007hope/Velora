import axios from "axios";

const baseURL = "https://my-json-server.typicode.com/omid2007hope/mock-shop";
export const ApiClient = axios.create({ baseURL });
