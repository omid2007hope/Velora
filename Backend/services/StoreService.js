const Store = require("../model/Store");
const BaseService = require("./BaseService");

module.exports = new (class StoreService extends BaseService {
  _safeTrim = (val) => (typeof val === "string" ? val.trim() : "");

  async createAnStore(storeData) {
    const ownerAlreadyHasThisStore = await this.findOne({
      storeName: this._safeTrim(storeData.storeName),
      ownerOfStore: storeData.ownerOfStore,
      countryStoreLocatedIn: this._safeTrim(storeData.countryStoreLocatedIn),
    });

    const storeNameWasPickedBySomeoneElse = await this.findOne({
      storeName: this._safeTrim(storeData.storeName),
      countryStoreLocatedIn: this._safeTrim(storeData.countryStoreLocatedIn),
    });

    if (ownerAlreadyHasThisStore) {
      throw new Error(
        "You already have a store with this name in your country",
      );
    }

    if (storeNameWasPickedBySomeoneElse) {
      throw new Error("This store already exist in your country");
    }

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
