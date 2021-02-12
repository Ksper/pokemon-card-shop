import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './../reducer/searchSlice';
import filterReducer from './../reducer/filterSlice';
import cartSlice from "./../reducer/cartSlice";
import logger from 'redux-logger';

export default configureStore({
  reducer: {
    search: searchReducer,
    filters: filterReducer,
    cart: cartSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});
