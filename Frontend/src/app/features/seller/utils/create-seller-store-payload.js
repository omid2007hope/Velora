export function createSellerStorePayload(form) {
  return {
    storeName: form.storeName.trim(),
    storeDescription: form.storeDescription.trim(),
    storeAddress: form.storeAddress.trim(),
    storeZipcode: form.storeZipcode.trim(),
    cityStoreLocatedIn: form.cityStoreLocatedIn.trim(),
    stateOrProvinceStoreLocatedIn: form.stateOrProvinceStoreLocatedIn.trim(),
    countryStoreLocatedIn: form.countryStoreLocatedIn.trim(),
  };
}
