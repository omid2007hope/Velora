const Store = require("../model/Store");
const {createHttpError} = require("../utils/httpError")
const BaseService = require("./BaseService");

module.exports = new (class StoreService extends BaseService {
  _safeTrim = (val) => (typeof val === "string" ? val.trim() : "");

  async createAnStore(storeData) {
    const ownerAlreadyHasThisStore = await this.findOneByCondition({
      storeName: this._safeTrim(storeData.storeName),
      ownerOfStore: storeData.ownerOfStore,
      countryStoreLocatedIn: this._safeTrim(storeData.countryStoreLocatedIn),
    });

    const storeNameWasPickedBySomeoneElse = await this.findOneByCondition({
      storeName: this._safeTrim(storeData.storeName),
      countryStoreLocatedIn: this._safeTrim(storeData.countryStoreLocatedIn),
    });

    if (ownerAlreadyHasThisStore) {
      throw createHttpError(409, "You already have a store...")
    }

    if (storeNameWasPickedBySomeoneElse) {
      throw createHttpError(409, "This store already exist in your country");
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

  async patchStoreData(storeId, storeData) {
    const trimmedStoreName = this._safeTrim(storeData.storeName);

    if (trimmedStoreName) {
      const ownerAlreadyHasThisStore = await this.findOneByCondition({
        _id: { $ne: storeId },
        storeName: trimmedStoreName,
        ownerOfStore: storeData.ownerOfStore,
        countryStoreLocatedIn: this._safeTrim(storeData.countryStoreLocatedIn),
      });

      const storeNameWasPickedBySomeoneElse = await this.findOneByCondition({
        _id: { $ne: storeId },
        storeName: trimmedStoreName,
        countryStoreLocatedIn: this._safeTrim(storeData.countryStoreLocatedIn),
      });

      if (ownerAlreadyHasThisStore) {
        throw createHttpError(
        409 , "You already have a store with this name in your country",
        );
      }

      if (storeNameWasPickedBySomeoneElse) {
       throw createHttpError(409, "This store already exist in your country");
      }
    }

    const normalizedStoreData = {};
    if (storeData.storeName !== undefined)
      normalizedStoreData.storeName = this._safeTrim(storeData.storeName);
    if (storeData.storeDescription !== undefined)
      normalizedStoreData.storeDescription = this._safeTrim(
        storeData.storeDescription,
      );
    if (storeData.countryStoreLocatedIn !== undefined)
      normalizedStoreData.countryStoreLocatedIn = this._safeTrim(
        storeData.countryStoreLocatedIn,
      );
    if (storeData.stateOrProvinceStoreLocatedIn !== undefined)
      normalizedStoreData.stateOrProvinceStoreLocatedIn = this._safeTrim(
        storeData.stateOrProvinceStoreLocatedIn,
      );
    if (storeData.cityStoreLocatedIn !== undefined)
      normalizedStoreData.cityStoreLocatedIn = this._safeTrim(
        storeData.cityStoreLocatedIn,
      );
    if (storeData.storeAddress !== undefined)
      normalizedStoreData.storeAddress = this._safeTrim(storeData.storeAddress);
    if (storeData.storeZipcode !== undefined)
      normalizedStoreData.storeZipcode = this._safeTrim(storeData.storeZipcode);

    return this.update(
      { _id: storeId, ownerOfStore: storeData.ownerOfStore },
      normalizedStoreData,
    );
  }

  async deleteStore(storeId, ownerId) {
    return this.hardDelete({ _id: storeId, ownerOfStore: ownerId });
  }

  async getStoreData(ownerId) {
    return this.findAll({ ownerOfStore: ownerId });
  }
})(Store);
