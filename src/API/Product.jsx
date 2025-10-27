import { ApiClient } from "./API";

const Url = "/products";

// GET all products
export function fetchProducts() {
  return ApiClient.get(Url);
}

// GET one product
export function fetchProductById(id) {
  return ApiClient.get(`${Url}/${id}`);
}
