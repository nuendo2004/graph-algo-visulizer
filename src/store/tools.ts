import { Tool } from "./configReducer";

enum Tools {
  DEFAULT = 1,
  PEN = 2,
  START = 3,
  END = 4,
  ERASE = 5,
}

abstract class Tool {
  toolType: Tools;
  isDrawing: boolean;
  draw: () => void;
}

class Erase extends Tool {
  toolType: Tools.ERASE;
  isDrawing: false;
  draw: () => void;
}

export { Tools, Erase };
