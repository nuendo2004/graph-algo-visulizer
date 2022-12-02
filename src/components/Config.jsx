import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resize,
  toggleTools,
  tools,
  toggleVisualizer,
} from "../store/configReducer";
import styles from "./Config.module.css";

const Config = (props) => {
  const { mapSize, gridSize, toolSelector, PFisRunning } = useSelector(
    (state) => state.gameConfig
  );
  const rowInput = useRef(mapSize.row);
  const colInput = useRef(mapSize.col);
  const gridInput = useRef(gridSize / 10);
  const dispatch = useDispatch();

  const reSize = (row, col, grid) => {
    console.log({ row, col, grid });
    dispatch(resize({ row, col, grid }));
  };

  const handdleRunVisualizer = () => {
    dispatch(toggleVisualizer());
  };

  return (
    <div>
      <input type="number" ref={rowInput} defaultValue={mapSize.row} />
      <input type="number" ref={colInput} defaultValue={mapSize.col} />
      <input type="number" ref={gridInput} defaultValue={gridSize / 10} />
      <button
        onClick={() =>
          reSize(
            rowInput.current.value,
            colInput.current.value,
            gridInput.current.value
          )
        }
      >
        Change
      </button>
      <div>
        <button
          className={styles.pointer}
          onClick={() => dispatch(toggleTools(tools.default))}
        >
          Pointer
        </button>
        <button
          className={styles.pointer}
          onClick={() => dispatch(toggleTools(tools.start))}
        >
          Start
        </button>
        <button
          className={styles.pointer}
          onClick={() => dispatch(toggleTools(tools.end))}
        >
          End
        </button>
        <button
          className={styles.pointer}
          onClick={() => dispatch(toggleTools(tools.delete))}
        >
          Eraser
        </button>
        <button
          className={`${styles.draw} ${
            toolSelector === tools.pen && styles.down
          }`}
          onClick={() => dispatch(toggleTools(tools.pen))}
        >
          Draw
        </button>
        <button onClick={handdleRunVisualizer}>
          {PFisRunning ? "Clear" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Config;
