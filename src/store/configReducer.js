import { createSlice } from "@reduxjs/toolkit";

const tools = {
  default: "default",
  pen: "pen",
  start: "start",
  end: "end",
  delete: "delete",
};

const ConfigSlice = createSlice({
  name: "game-config",
  initialState: {
    mapSize: { row: 30, col: 60 },
    gridSize: 16,
    toolSelector: tools.default,
    PFisRunning: false,
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
      else state.toolSelector = tools.default;
    },
    toggleVisualizer(state) {
      state.PFisRunning = !state.PFisRunning;
    },
  },
});

export { tools };

export default ConfigSlice.reducer;

export const { resize, togglePen, toggleTools, toggleVisualizer } =
  ConfigSlice.actions;
