export function createSellerStorePayload(form) {
  return {
    storeName: form.storeName.trim(),
    storeDescription: form.storeDescription.trim(),
    storeZipcode: form.storeZipcode.trim() || undefined,
    cityStoreLocatedIn: form.cityStoreLocatedIn.trim(),
    stateOrProvinceStoreLocatedIn: form.stateOrProvinceStoreLocatedIn.trim(),
    countryStoreLocatedIn: form.countryStoreLocatedIn.trim(),
  };
}
