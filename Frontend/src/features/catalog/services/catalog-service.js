import axios from "axios";
import { apiBaseUrl } from "@/services/api-base-url";

export async function fetchProducts(params = {}) {
  const { category, subCategory, isNew, search } = params;
  const query = new URLSearchParams();

  if (category) query.set("category", category);
  if (subCategory) query.set("subCategory", subCategory);
  if (isNew === true) query.set("new", "true");
  if (search) query.set("search", search);

  const url = query.size
    ? `${apiBaseUrl}/server/products?${query.toString()}`
    : `${apiBaseUrl}/server/products`;

  const response = await axios.get(url);
  return response.data?.data || [];
}

export async function fetchProductById(id) {
  if (!id) {
    throw new Error("Product id is required");
  }

  const response = await axios.get(`${apiBaseUrl}/server/products/${id}`);
  return response.data?.data;
}
