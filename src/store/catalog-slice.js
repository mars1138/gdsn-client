import { createSlice } from '@reduxjs/toolkit';

// controls product catalog state
const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    products: [],
    changed: false,
  },
  reducers: {
    replaceCatalog(state, action) {
      state.products = action.payload.products;
    },
    setCatalogStorage(state) {
      localStorage.setItem('catalog', JSON.stringify(state.products));
    },
    getCatalogStorage(state) {
      const localItems = JSON.parse(localStorage.getItem('catalog'));

      if (localItems && localItems.length > 0) {
        state.products = localItems;
      }
    },
    getProduct(state, action) {
      const itemGtin = action.payload.gtin;

      const existingItem = state.products.find(
        (item) => item.gtin === itemGtin
      );

      return existingItem;
    },
    addProduct(state, action) {
      const newItem = action.payload;

      if (newItem) {
        state.products.push({
          name: newItem.name.value,
          description: newItem.description.value,
          gtin: +newItem.gtin.value,
          category: +newItem.category.value,
          type: +newItem.type.value,
          image: '',
          height: newItem.height.value,
          width: newItem.width.value,
          depth: newItem.depth.value,
          weight: newItem.weight.value,
          packagingType: +newItem.packagingType.value,
          tempUnits: +newItem.tempUnits.value,
          minTemp: newItem.minTemp.value,
          maxTemp: newItem.maxTemp.value,
          storageInstructions: newItem.storageInstructions.value,
          subscribers: [],
          dateAdded: new Date().getTime(),
          datePublished: null,
          dateInactive: null,
          dateModified: null,
        });
      }
    },
    updateExistingProduct(state, action) {
      const updatedItem = action.payload;
      const existingItem = state.products.find(
        (item) => item.gtin === updatedItem.gtin
      );

      if (existingItem) {
        existingItem.name = updatedItem.name;
        existingItem.description = updatedItem.description;
        existingItem.gtin = +updatedItem.gtin;
        existingItem.category = +updatedItem.category;
        existingItem.type = +updatedItem.type;
        existingItem.image = updatedItem.image;
        existingItem.height = updatedItem.height;
        existingItem.width = updatedItem.width;
        existingItem.depth = updatedItem.depth;
        existingItem.weight = updatedItem.weight;
        existingItem.packagingType = +updatedItem.packagingType;
        existingItem.tempUnits = +updatedItem.tempUnits;
        existingItem.minTemp = updatedItem.minTemp;
        existingItem.maxTemp = updatedItem.maxTemp;
        existingItem.storageInstructions = updatedItem.storageInstructions;
        existingItem.subscribers = [...updatedItem.subscribers];
        existingItem.dateModified = new Date().getTime();
      }
    },
    toggleProductActive(state, action) {
      const gtin = action.payload.gtin;
      const existingItem = state.products.find((item) => item.gtin === gtin);

      const deactivate = () => {
        existingItem.dateInactive = new Date().getTime();
      };

      const reactivate = () => {
        existingItem.dateInactive = null;
        existingItem.dateModified = new Date().getTime();
      };

      if (existingItem) {
        action.payload.status === 'deactivate' ? deactivate() : reactivate();
      }
    },
    deleteProduct(state, action) {
      const gtin = action.payload.gtin;
      state.products = state.products.filter((item) => item.gtin !== gtin);
    },
    addSubscriber(state, action) {
      const custId = +action.payload.custId;
      const prod = action.payload.gtin;

      const existingProduct = state.products.find((item) => item.gtin === prod);

      if (existingProduct) {
        const existingSub = existingProduct.subscriber.includes(custId);
        if (existingSub) return;

        const newSubs = [...existingProduct.subscribers, custId];
        existingProduct.subscribers = newSubs;
        existingProduct.datePublished = new Date().getTime();
      }
    },
    removeSubscriber(state, action) {
      const custId = action.payload.custId;
      const prod = action.payload.productNum;

      const existingProduct = state.products.find((item) => item.gtin === prod);

      if (existingProduct) {
        const newSubs = existingProduct.subscribers.filter(
          (cust) => cust !== custId
        );
        existingProduct.subscribers = newSubs;
      }
    },
  },
});

export const catalogActions = catalogSlice.actions;
export default catalogSlice;
