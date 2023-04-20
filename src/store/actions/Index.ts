type Coordinate = {
  row: number;
  col: number;
  grid: number;
};

type Action = Resize;

interface Resize {
  type: "resize";
  payload: Coordinate;
}
