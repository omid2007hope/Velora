function toOptionalNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function createSellerStorePayload(form) {
  return {
    storeName: form.storeName.trim(),
    storeDescription: form.storeDescription.trim(),
    storeZipcode: toOptionalNumber(form.storeZipcode),
    cityStoreLocatedIn: form.cityStoreLocatedIn.trim(),
    stateOrProvinceStoreLocatedIn: form.stateOrProvinceStoreLocatedIn.trim(),
    countryStoreLocatedIn: form.countryStoreLocatedIn.trim(),
  };
}
