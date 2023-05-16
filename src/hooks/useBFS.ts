import React, { useEffect } from "react";
import Queue from "../utils/Queue";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowPath,
  createPath,
  addToVisited,
  addToVisiting,
  removeFromVisiting,
} from "../store/mapReducer";
import useTools from "./useTools";
import useMap from "./useMap";
import { Cell } from "../store/Class";
import { NumNode } from "../utils/Node";

const Algos = () => {
  const dispatch = useDispatch();
  const { MAP } = useMap();

  const {
    currentTool,
    spawnPoint,
    destination,
    obstacles,
    visitingCell,
    visitedCell,
    path,
    showPath,
    map,
  } = MAP;

  // const runVisualizer = () => {
  //   console.log(spawnPoint);
  //   console.log(destination);
  //   const path = BFS(
  //     spawnPoint,
  //     destination,
  //     mapSize.row,
  //     mapSize.col,
  //     obstacles
  //   );
  //   console.log(path);
  //   dispatch(createPath(path));
  //   dispatch(setShowPath(true));
  //   if (path.length === 0) {
  //     window.alert("No path found");
  //   }
  // };
  // useEffect(() => {
  //   if (PFisRunning) {
  //     console.log("running");
  //     runVisualizer();
  //   }
  // }, [PFisRunning]);

  //+++++++++++++++++++ Algorithms / DFS++++++++++++++++++++++

  const getGrid = (row: number, col: number) => {
    return col * map.col + row;
  };

  const runBFS = (
    start: Cell,
    end: Cell,
    row: number,
    col: number,
    walls: number[]
  ) => {
    if (!start || !end || row === 0 || col === 0) return [];
    let rowq = new Queue();
    let colq = new Queue();

    let visited = Array(row)
      .fill(false)
      .map(() => Array(col).fill(false));

    console.log(visited);

    let prev = Array(row * col).fill(null);

    const dr = [+1, -1, 0, 0];
    const dc = [0, 0, -1, +1];

    function solve(start: Cell) {
      const { row: sr, col: sc } = start;
      rowq.enqueue(new NumNode(sr));
      colq.enqueue(new NumNode(sc));
      visited[sr][sc] = true;

      while (!rowq.isEmpty) {
        const r = rowq.dequeue()!.value;
        const c = colq.dequeue()!.value;
        dispatch(removeFromVisiting(r * col + c));

        //search for neighbor
        for (let i = 0; i < 4; i++) {
          const nr = r + dr[i];
          const nc = c + dc[i];
          const cell = nr * col + nc;
          if (nr < 0 || nc < 0 || nr >= row || nc >= col) continue;
          if (visited[nr][nc] || walls.includes(cell)) continue;

          rowq.enqueue(nr);
          colq.enqueue(nc);

          // setVisitingColor(cell); // for visual
          dispatch(addToVisiting(cell));

          visited[nr][nc] = true;
          prev[cell] = getGrid(r, c);
        }
      }
      console.log(prev);
      return prev;
    }

    const prevPath = solve(start);

    function shortestPath(s: Cell, e: Cell, prev: number[]) {
      let path: number[] = [];
      for (let i = e[2]; i != null; i = prev[i]) {
        path.push(i);
      }
      path.reverse();
      if (path[0] === s[2]) return path;
      return [];
    }

    return shortestPath(start, end, prevPath);
  };
};

export default Algos;
