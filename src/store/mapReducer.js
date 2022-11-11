import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "render-map",
  initialState: {
    obstacles: [],
    spawnPoint: null,
    destination: null,
  },
  reducers: {
    spawnPawn(state, action) {
      state.spawnPoint = action.payload;
    },
    setFinal(state, action) {
      state.destination = action.payload;
    },
    // addWall(state, action){
    //   state.obstacles.push(action.payload)
    // },
    // removeWall(state, action){
    //   const newSet =
    // },
  },
});

const random = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

export const { setFinal, spawnPawn } = mapSlice.actions;
export default mapSlice.reducer;
