const PRODUCT_IMAGE_PLACEHOLDER = "/product-placeholder.svg";

export function resolveProductImageSrc(...candidates) {
  for (const candidate of candidates) {
    if (typeof candidate === "string") {
      const trimmed = candidate.trim();

      if (trimmed) {
        return trimmed;
      }
    }
  }

  return PRODUCT_IMAGE_PLACEHOLDER;
}

export { PRODUCT_IMAGE_PLACEHOLDER };
