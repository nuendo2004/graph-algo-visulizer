import { createSlice } from "@reduxjs/toolkit";
import { Erase, Tools } from "./tools";
import { Cell } from "./Class";

interface IAction<T, P> {
  type: T;
  payload: P;
}

interface MapState {
  currentTool: Tools;
  spawnPoint: Cell | null;
  destination: Cell | null;
  obstacles: number[];
  visitingCell: number[];
  visitedCell: number[];
  path: number[];
  showPath: boolean;
}

const initialState: MapState = {
  currentTool: Tools.DEFAULT,
  obstacles: [],
  spawnPoint: null,
  destination: null,
  visitingCell: [],
  visitedCell: [],
  path: [],
  showPath: false,
};

const mapSlice = createSlice({
  name: "render-map",
  initialState,
  reducers: {
    spawnPawn(state, action: IAction<string, Cell>) {
      state.spawnPoint = action.payload;
    },
    setFinal(state, action: IAction<string, Cell>) {
      state.destination = action.payload;
    },
    addWall(state, action: IAction<string, number>) {
      state.obstacles.push(action.payload);
    },
    removeWall(state, action: IAction<string, number>) {
      const filtered = state.obstacles.filter((wall) => {
        return wall !== action.payload;
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
      state = initialState;
    },
    randomWalls(state, action: IAction<string, number>) {
      state.path = [];
      let wall: number[] = [];
      for (let i = 0; i < action.payload * 0.3; i++) {
        wall.push(
          random(0, action.payload, state.spawnPoint, state.destination)
        );
      }
      console.log(wall);
      state.obstacles = wall;
    },
    generateMaze(state, action) {
      state.path = [];
      let wall: number[] = [];
      // Todo: mazeSize should be = gridWidth + gridHight
      for (let i = 0; i < 90; i++) {
        let comp = gerenateMazePart(
          random(
            0,
            action.payload.col * action.payload.row,
            state.spawnPoint,
            state.destination
          ),
          action.payload
        );

        wall = [...wall, ...comp];
      }
      const walls = wall.filter((w) => {
        return w !== state.spawnPoint?.getGrid && state.destination?.getGrid;
      });
      state.obstacles = walls;
    },
  },
});
const gerenateMazePart = (cell: number, map: { col: number; row: number }) => {
  let w: number[] = [];
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

const random = (min: number, max: number, s: Cell | null, e: Cell | null) => {
  let w: null | number = null;
  while ((s && e && (w === s.getGrid || w === e.getGrid)) || w === null)
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
