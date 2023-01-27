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
    clearMap(state) {
      state.obstacles = [];
      state.spawnPoint = [null, null, null];
      state.destination = [null, null, null];
      state.path = [];
      state.showPath = false;
      state.visitedCell = [];
      state.visitingCell = [];
    },
    randomWalls(state, action) {
      state.path = [];
      let wall = [];
      for (let i = 0; i < action.payload * 0.3; i++) {
        wall.push(
          random(
            0,
            action.payload,
            state.spawnPoint[2] || -1,
            state.destination[2] || -1
          )
        );
      }
      console.log(wall);
      state.obstacles = wall;
    },
    generateMaze(state, action) {
      state.path = [];
      let wall = [];
      // Todo: mazeSize should be = gridWidth + gridHight
      for (let i = 0; i < 90; i++) {
        let comp = gerenateMazePart(
          random(
            0,
            action.payload.col * action.payload.row,
            state.spawnPoint[2] || -1,
            state.destination[2] || -1
          ),
          action.payload
        );

        wall = [...wall, ...comp];
      }
      const walls = wall.filter((w) => {
        return w !== state.spawnPoint[2] && state.destination[2];
      });
      state.obstacles = walls;
    },
  },
});
const gerenateMazePart = (cell, map) => {
  let w = [];
  const x = Math.ceil(Math.random() * 4);
  const dir = Math.round(Math.random()) ? 1 : -1;
  for (let i = 0; i < x; i++) {
    w.push(cell + i * dir);
  }

  let y = cell;
  let ylength = Math.ceil(Math.random() * 4);
  for (let i = 0; i < ylength; i++) {
    y = y + map.col * (Math.round(Math.random()) ? 1 : -1);
    w.push(y);
  }
  return w;
};

const random = (min, max, s, e) => {
  let w = null;
  while (w === s[2] || w === e[2] || w === null)
    w = Math.floor(Math.random() * (max + 1 - min) + min);
  return w;
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
  clearMap,
  randomWalls,
  generateMaze,
} = mapSlice.actions;
export default mapSlice.reducer;
