import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import catalogSlice from './catalog-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    catalog: catalogSlice.reducer,
  },
});

export default store;
