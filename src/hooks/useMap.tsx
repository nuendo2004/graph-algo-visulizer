import { useSelector } from "react-redux";
import { RootState } from "../store";

const useMap = () => {
  const MAP = useSelector((state: RootState) => state.map);
  return { MAP };
};

export default useMap;
