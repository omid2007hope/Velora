function toOptionalNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function createSellerProductPayload(form) {
  return {
    name: form.name.trim(),
    description: form.description.trim(),
    category: form.category.trim(),
    subCategory: form.subCategory.trim() || undefined,
    price: Number(form.price),
    oldPrice: toOptionalNumber(form.oldPrice),
    newPrice: toOptionalNumber(form.newPrice),
    imageUrl: form.imageUrl.trim(),
  };
}
