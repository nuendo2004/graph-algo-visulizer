import styles from "./Gridboard.module.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tools } from "../store/configReducer";
import { spawnPawn, setFinal } from "../store/mapReducer";
import { addWall, removeWall } from "../store/mapReducer";

const Gridboard = (props) => {
  const dispatch = useDispatch();
  const { mapSize, gridSize, toolSelector } = useSelector(
    (state) => state.gameConfig
  );
  const [mouseDown, setMouseDown] = useState(false);
  const { obstacles, spawnPoint, destination, path, showPath, visitingCell } =
    useSelector((state) => state.map);

  const handleWall = (cell) => {
    const wallExist = obstacles.includes(cell[2]);
    if (toolSelector === tools.pen) {
      if (
        cell[2] === spawnPoint[2] ||
        cell[2] === destination[2] ||
        obstacles.includes(cell[2])
      )
        return;
      setMouseDown(true); // enable continuesly call on mouse down
      dispatch(addWall(cell[2]));
    } else if (toolSelector === tools.start) {
      if (wallExist) {
        removeWalls(cell);
      }
      dispatch(spawnPawn(cell));
    } else if (toolSelector === tools.end) {
      if (wallExist) {
        removeWalls(cell);
      }
      dispatch(setFinal(cell));
    } else if (toolSelector === tools.delete) {
      setMouseDown(true);
      removeWalls(cell);
    }
  };

  const removeWalls = (cell) => {
    if (obstacles.includes(cell[2])) {
      dispatch(removeWall(cell[2]));
    } else if (spawnPoint[2] === cell[2]) {
      dispatch(spawnPawn([null, null, null]));
    } else if (destination[2] === cell[2])
      dispatch(setFinal([null, null, null]));
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
      const c = cell[2];
      const isWall = obstacles.includes(c);
      const isStart = spawnPoint[2] === c;
      const isEnd = destination[2] === c;
      const isPath = path.includes(c) && !isEnd && !isStart;
      return (
        <div
          key={[cell[0], cell[1]]}
          className={`${styles.cell} ${isWall ? "wall" : ""} ${
            isStart && "startPoint"
          } ${isEnd && "endPoint"} ${isPath && showPath && "isPath"} ${
            visitingCell.includes(c) && "visiting"
          }`}
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
          {/* {cell[2]} */}
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
