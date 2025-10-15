import axios from "axios";

const Url = "https://my-json-server.typicode.com/omid2007hope/mock-shop";

export const ApiClient = axios.create({ baseURL: Url });
