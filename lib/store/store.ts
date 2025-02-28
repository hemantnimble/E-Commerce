import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from '@/lib/store/features/cart/cartSlice';
import productReducer from '@/lib/store/features/products/productSlice'


export const makeStore = () => {
  return configureStore({
      reducer: {
          // cart: cartReducer,
          products: productReducer,
      },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];