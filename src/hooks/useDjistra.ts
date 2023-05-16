import { Cell } from "../store/Class";
import useMap from "./useMap";
import HashMap from "../utils/HashMap";
import Queue from "../utils/Queue";
import { GridNode } from "../utils/Node";

const useDjikstra = () => {
  const dr = [+1, -1, 0, 0];
  const dc = [0, 0, -1, +1];

  const { MAP } = useMap();
  const { spawnPoint, destination } = MAP;

  const currentWeight = 1;

  const getGrid = (row: number, col: number) => {
    return col * MAP.map.col + row;
  };

  const run = (
    row: number,
    col: number,
    start: Cell,
    end: Cell,
    walls: number[]
  ) => {
    const { row: sr, col: sc } = start;
    const shortestDist = new HashMap();
    const previousCell = new HashMap();
    const visited = Array(row)
      .fill(false)
      .map(() => Array(col).fill(false));
    const visiting = new Queue();
    const currentStep = 0;

    visited[sr][sc] = true;
    visiting.enqueue(new GridNode([sr, sc]));

    while (!visiting.isEmpty) {
      const dw = visiting.dequeue()
      for (let i = 0; i < 4; i++) {
        const nr = sr + dr[i];
        const nc = sc + dc[i];
        if (
          nr < 0 ||
          nc < 0 ||
          nr >= row ||
          nc >= col ||
          visited[nr][nc] ||
          walls.includes(getGrid(nr, nc))
        )
          continue;
        previousCell[nr][nc] = [sr, sc];
        shortestDist[nr][nc] = shortestDist[sr][sc] + currentWeight;
      }
    }

  };
};

export default useDjikstra;
