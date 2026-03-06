import { getApiBaseUrl } from "./site";

function createApiUrl(path) {
  return new URL(path.replace(/^\//, ""), `${getApiBaseUrl()}/`);
}

async function fetchApiJson(
  path,
  { headers, next = { revalidate: 300 }, ...init } = {},
) {
  const response = await fetch(createApiUrl(path), {
    ...init,
    headers: {
      accept: "application/json",
      ...headers,
    },
    next,
  });

  if (response.status === 404) {
    return { data: null, notFound: true };
  }

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return {
    data: payload?.data ?? null,
    notFound: false,
  };
}

function buildProductsQuery({ category, isNew, search } = {}) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (isNew === true) {
    params.set("new", "true");
  }

  if (search) {
    params.set("search", search);
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}

export async function getProducts(params = {}) {
  const result = await fetchApiJson(
    `/server/products${buildProductsQuery(params)}`,
  );

  return Array.isArray(result.data) ? result.data : [];
}

export async function getProductById(id) {
  if (!id) {
    return { product: null, notFound: true };
  }

  const result = await fetchApiJson(`/server/products/${id}`);
  return {
    product: result.data,
    notFound: result.notFound,
  };
}

export async function getReviewsByProductId(productId) {
  if (!productId) {
    return [];
  }

  const result = await fetchApiJson(`/server/products/${productId}/reviews`);
  return Array.isArray(result.data) ? result.data : [];
}
