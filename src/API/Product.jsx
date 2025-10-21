import { ApiClient } from "./API";

// GET all products
export async function fetchProducts() {
  const { data } = await ApiClient.get("/products");
  return data; // array of products
}

// GET one product
export async function fetchProductById(id) {
  const { data } = await ApiClient.get(`/products/${id}`);
  return data; // single product object
}
