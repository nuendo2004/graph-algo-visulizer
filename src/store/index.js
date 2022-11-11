import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configReducer";
import mapReducer from "./mapReducer";

const Store = configureStore({
  reducer: { gameConfig: configReducer, map: mapReducer },
});

export default Store;
