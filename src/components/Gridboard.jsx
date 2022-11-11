import styles from "./Gridboard.module.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tools } from "../store/configReducer";
import { spawnPawn, setFinal } from "../store/mapReducer";

const Gridboard = (props) => {
  const dispatch = useDispatch();
  const { mapSize, gridSize, toolSelector } = useSelector(
    (state) => state.gameConfig
  );
  const [mouseDown, setMouseDown] = useState(false);
  const [wallSet, addToArray] = useState(new Set());
  const { spawnPoint, destination } = useSelector((state) => state.map);

  const handleWall = (cell) => {
    console.log(cell);
    if (toolSelector === tools.pen) {
      if (
        cell[2] === spawnPoint ||
        cell[2] === destination ||
        wallSet.has(cell[2])
      )
        return;
      setMouseDown(true); // enable continuesly call on mouse down
      let wall = new Set([...wallSet, cell[2]]);
      addToArray(wall);
    } else if (toolSelector === tools.start) {
      if (wallSet.has(cell[2])) {
        removeWall(cell);
      }
      dispatch(spawnPawn(cell[2]));
    } else if (toolSelector === tools.end) {
      if (wallSet.has(cell[2])) {
        removeWall(cell);
      }
      dispatch(setFinal(cell[2]));
    } else if (toolSelector === tools.delete) {
      setMouseDown(true);
      removeWall(cell);
    }
  };

  const removeWall = (cell) => {
    console.log(cell[2]);
    if (wallSet.has(cell[2])) {
      const set = wallSet;
      set.delete(cell[2]);
      addToArray(new Set([...set]));
    } else if (spawnPoint === cell[2]) {
      dispatch(spawnPawn(null));
      console.log("erase");
    } else if (destination === cell[2]) dispatch(setFinal(null));
  };

  const mapArray = [];

  const renderGrid = (row, col) => {
    let grid = 0;
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        mapArray.push([r, c, grid++]);
      }
    }
    return mapArray.map((cell) => {
      const isWall = wallSet.has(cell[2]);
      const isStart = spawnPoint === cell[2];
      const isEnd = destination === cell[2];
      return (
        <div
          key={[cell[0], cell[1]]}
          className={`${styles.cell} ${isWall ? "wall" : ""} ${
            isStart && "startPoint"
          } ${isEnd && "endPoint"}`}
          style={{
            height: `${gridSize}px`,
            width: `${gridSize}px`,
          }}
          onMouseEnter={(e) => {
            e.preventDefault();
            if (mouseDown) {
              handleWall(cell);
            }
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            handleWall(cell);
          }}
          onMouseUp={() => setMouseDown(false)}
        >
          {cell[2]}
        </div>
      );
    });
  };

  return (
    <div
      className={styles.map}
      style={{ gridTemplateColumns: `repeat(${mapSize.col},${gridSize}px)` }}
    >
      {renderGrid(mapSize.row, mapSize.col)}
    </div>
  );
};

export default Gridboard;
