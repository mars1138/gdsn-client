import { createSlice } from '@reduxjs/toolkit';

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
    getCatalogStorage(state) {},
    getProduct(state, action) {},
    addProduct(state, action) {},
    updateExistingProduct(state, action) {},
    toggleProductActive(state, action) {},
    deleteProduct(state, action) {},
    addSubscriber(state, action) {},
    removeSubscriber(state, action) {},
  },
});

export const catalogActions = catalogSlice.actions;
export default catalogSlice;
