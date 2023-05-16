import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configReducer";
import mapReducer from "./mapReducer";

const Store = configureStore({
  reducer: { map: mapReducer },
});

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;

export default Store;
