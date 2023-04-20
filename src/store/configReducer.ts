import { createSlice } from "@reduxjs/toolkit";

abstract class Tool {
  toolType: Tools;
  isDrawing: boolean;
  draw: () => void;
}

type Config = {
  mapSize: { row: number; col: number; grid: number };
  currentTools: Tools;
  isRunning: boolean;
};

const ConfigSlice = createSlice({
  name: "game-config",
  initialState: {
    mapSize: { row: 30, col: 60 },
    gridSize: 16,
    PFisRunning: false,
    isDrawing: false,
  },
  reducers: {
    resize(state, action) {
      state.mapSize.row = parseInt(action.payload.row);
      state.mapSize.col = parseInt(action.payload.col);
      state.gridSize = parseInt(action.payload.grid) * 10;
    },
    togglePen(state) {
      state.isDrawing = !state.isDrawing;
    },
    toggleTools(state, action) {
      if (action.payload) state.toolSelector = action.payload;
      else state.toolSelector = Tools.DEFAULT;
    },
    toggleVisualizer(state) {
      state.PFisRunning = !state.PFisRunning;
    },
  },
});

export { Tools, Tool };

export default ConfigSlice.reducer;

export const { resize, togglePen, toggleTools, toggleVisualizer } =
  ConfigSlice.actions;
