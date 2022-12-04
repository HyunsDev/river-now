import { useContext } from "react";
import { MapContext } from "./mapContext";

export const useMap = () => {
  const map = useContext(MapContext);
  return map;
};
