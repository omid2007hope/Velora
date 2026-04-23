const Store = require("../model/Store");
const BaseService = require("./BaseService");

module.exports = new (class StoreService extends BaseService {
  _mapStoreDetail(storeDetail) {
    return {
      _id: storeDetail._id,
      ownerOfStore: storeDetail.ownerOfStore,
      storeName: storeDetail.storeName,
      storeDescription: storeDetail.storeDescription,
      countryStoreLocatedIn: storeDetail.countryStoreLocatedIn,
      stateOrProvinceStoreLocatedIn:
        !!storeDetail.stateOrProvinceStoreLocatedIn,
      cityStoreLocatedIn: storeDetail.cityStoreLocatedIn,
      storeAddress: storeDetail.storeAddress,
      storeZipcode: storeDetail.storeZipcode,
    };
  }
})(Store);
