const Store = require("../model/Store");
const BaseService = require("./BaseService");

module.exports = new (class StoreService extends BaseService {
  _safeTrim = (val) => (typeof val === "string" ? val.trim() : "");

  async createAnStore(storeData) {
    const normalizedStoreData = {
      ownerOfStore: storeData.ownerOfStore,
      storeName: this._safeTrim(storeData.storeName),
      storeDescription: this._safeTrim(storeData.storeDescription),
      countryStoreLocatedIn: this._safeTrim(storeData.countryStoreLocatedIn),
      stateOrProvinceStoreLocatedIn: this._safeTrim(
        storeData.stateOrProvinceStoreLocatedIn,
      ),
      cityStoreLocatedIn: this._safeTrim(storeData.cityStoreLocatedIn),
      storeAddress: this._safeTrim(storeData.storeAddress),
      storeZipcode: this._safeTrim(storeData.storeZipcode),
    };

    return this.createObject(normalizedStoreData);
  }

  async getStoreData(ownerId) {
    return this.findAll({ ownerOfStore: ownerId });
  }
})(Store);
