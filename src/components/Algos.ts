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

const Algos = () => {
  const dispatch = useDispatch();
  const { mapSize } = useSelector((state: RootState) => state.gameConfig);
  const { obstacles, spawnPoint, destination } = useSelector(
    (state: RootState) => state.map
  );
  const { PFisRunning } = useSelector((state: RootState) => state.gameConfig);
  const { path: shortestPath } = useSelector((state: RootState) => state.map);
  const runVisualizer = () => {
    console.log(spawnPoint);
    console.log(destination);
    const path = BFS(
      spawnPoint,
      destination,
      mapSize.row,
      mapSize.col,
      obstacles
    );
    console.log(path);
    dispatch(createPath(path));
    dispatch(setShowPath(true));
    if (path.length === 0) {
      window.alert("No path found");
    }
  };
  useEffect(() => {
    if (PFisRunning) {
      console.log("running");
      runVisualizer();
    }
  }, [PFisRunning]);

  //+++++++++++++++++++ Algorithms / DFS++++++++++++++++++++++
  const BFS = (start, end, row, col, walls) => {
    let rowq = new Queue();
    let colq = new Queue();

    let visited = Array(row)
      .fill(false)
      .map(() => Array(col).fill(false));
    console.log(visited);
    let prev = Array(row * col).fill(null);

    const dr = [+1, -1, 0, 0];
    const dc = [0, 0, -1, +1];

    function solve(start) {
      const [sr, sc] = start;
      rowq.enqueue(sr);
      colq.enqueue(sc);
      visited[sr][sc] = true;

      while (!rowq.isEmpty()) {
        const r = rowq.dequeue();
        const c = colq.dequeue();
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

          //   setVisitingColor(cell); // for visual
          dispatch(addToVisiting(cell));

          visited[nr][nc] = true;
          prev[cell] = r * col + c;
        }
      }
      console.log(prev);
      return prev;
    }

    const prevPath = solve(start);

    function shortestPath(s, e, prev) {
      let path = [];
      for (let cell = e[2]; cell != null; cell = prev[cell]) {
        path.push(cell);
      }
      path.reverse();
      if (path[0] === s[2]) return path;
      return [];
    }

    return shortestPath(start, end, prevPath);
  };

  return <div>Algos</div>;
};

export default Algos;
