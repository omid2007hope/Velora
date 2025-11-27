import { ApiClient } from "./API";

const base = "/Category";

export function GetAllCategoryTree() {
  return ApiClient.get(`${base}/tree`);
}
