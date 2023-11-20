import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import catalogSlice from './catalog-slice';
import customersSlice from './customers-slice';

// combines the different states from each slice
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    catalog: catalogSlice.reducer,
    customers: customersSlice.reducer,
  },
});

export default store;
