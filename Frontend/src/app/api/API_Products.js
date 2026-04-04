// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
import axios from "axios";
import { API_BaseURL } from "./API_BaseURL";

export async function fetchProducts(params = {}) {
  const { category, subCategory, isNew, search } = params;
  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (subCategory) query.set("subCategory", subCategory);
  if (isNew === true) query.set("new", "true");
  if (search) query.set("search", search);

  const url =
    query.toString().length > 0
      ? `${API_BaseURL}/server/products?${query.toString()}`
      : `${API_BaseURL}/server/products`;

  const res = await axios.get(url);
  return res.data?.data || [];
}

export async function fetchProductById(id) {
  if (!id) throw new Error("Product id is required");
  const res = await axios.get(`${API_BaseURL}/server/products/${id}`);
  return res.data?.data;
}

const productApi = { fetchProducts, fetchProductById };

export default productApi;
