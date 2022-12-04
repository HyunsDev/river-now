// 리버나우의 맵과 관련된 컨텍스트

import { createContext, useState } from "react";

export type Map = {};
export type MapContextProps = {
  selectedRegionName: string;
  setSelectedRegionName: (selectedRegionName: string) => void;
  regionNames: string[];
  setRegionNames: (names: string[] | ((names: string[]) => string[])) => void;
};

export const MapContext = createContext<MapContextProps>({
  selectedRegionName: "",
  setSelectedRegionName: () => null,
  regionNames: [],
  setRegionNames: () => null,
});

export function MapContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedRegionName, setSelectedRegionName] = useState<string>("");
  const [regionNames, setRegionNames] = useState<string[]>([]);

  return (
    <MapContext.Provider
      value={{
        selectedRegionName,
        setSelectedRegionName,
        regionNames,
        setRegionNames,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
