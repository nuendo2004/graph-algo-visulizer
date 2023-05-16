import { Cell, Tool, Tools } from "../store/Class";
import { FaMousePointer, FaPen, FaEraser } from "react-icons/fa";
import { GiRallyTheTroops, GiFinishLine } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeWall, setFinal, spawnPawn, addWall } from "../store/mapReducer";
import { RootState } from "../store";

const useTools = () => {
  const dispatch = useDispatch();

  const MAP = useSelector((state: RootState) => state.map);

  class Erase extends Tool {
    toolType = Tools.ERASE;
    isDrawing = false;
    Icon = FaEraser;
    override draw = (cell: Cell) => {
      dispatch(removeWall(cell.getGrid(MAP.map.col)));
    };
  }
  class Select extends Tool {
    toolType = Tools.DEFAULT;
    isDrawing = false;
    Icon = FaMousePointer;
    override draw = (cell: Cell) => {
      console.log(`Current selected: row: ${cell.row}, column: ${cell.col}`);
    };
  }

  class PlaceStart extends Tool {
    toolType = Tools.START;
    isDrawing = false;
    Icon = GiRallyTheTroops;
    override draw = (cell: Cell) => {
      dispatch(spawnPawn(cell));
    };
  }

  class PlaceEnd extends Tool {
    toolType = Tools.END;
    isDrawing = false;
    Icon = GiFinishLine;
    override draw = (cell: Cell) => {
      dispatch(setFinal(cell));
    };
  }

  class Draw extends Tool {
    toolType = Tools.PEN;
    isDrawing = false;
    Icon = FaPen;
    override draw = (cell: Cell) => {
      dispatch(addWall(cell.getGrid(MAP.map.col)));
    };
  }

  return { Draw, PlaceEnd, PlaceStart, Select, Erase, MAP };
};

export default useTools;
