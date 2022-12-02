import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "render-map",
  initialState: {
    obstacles: [],
    spawnPoint: [null, null, null],
    destination: [null, null, null],
    visitingCell: [],
    visitedCell: [],
    path: [],
    showPath: false,
  },
  reducers: {
    spawnPawn(state, action) {
      state.spawnPoint = action.payload;
    },
    setFinal(state, action) {
      state.destination = action.payload;
    },
    addWall(state, action) {
      state.obstacles.push(action.payload);
    },
    removeWall(state, action) {
      const filtered = state.obstacles.filter((w) => {
        return w !== action.payload;
      });
      state.obstacles = filtered;
    },
    addToVisiting(state, action) {
      state.visitingCell.push(action.payload);
    },
    removeFromVisiting(state, action) {
      const filtered = state.visitingCell.filter((s) => {
        return s !== action.payload;
      });
      state.visitingCell = filtered;
    },
    addToVisited(state, action) {
      state.visitedCell.push(action.payload);
    },
    clearVisited(state) {
      state.visitedCell = [];
    },
    setShowPath(state, action) {
      state.showPath = action.payload;
    },
    createPath(state, action) {
      state.path = action.payload;
    },
    clearPath(state) {
      state.path = [];
    },
  },
});

const random = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

export const {
  setFinal,
  spawnPawn,
  addWall,
  removeWall,
  addToVisited,
  addToVisiting,
  removeFromVisiting,
  clearVisited,
  setShowPath,
  createPath,
  clearPath,
} = mapSlice.actions;
export default mapSlice.reducer;
