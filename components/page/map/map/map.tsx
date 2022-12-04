import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import { useMap } from "../../../../hook/useMap/useMap";
import { koreaCities } from "./regions";
import axios from "axios";
import {
  CityName,
  Region,
  Regions,
  RiverLevelSeoulAPIResponse,
  Vector,
} from "./type";

const Map = styled.div<{ isTouch: boolean }>`
  transform: scale(1.5);
  position: absolute;
  transition: left ${(props) => (props.isTouch ? "0ms" : "200ms")},
    top ${(props) => (props.isTouch ? "0ms" : "200ms")};
`;

interface MapSVGProps {
  riverData?: RiverLevelSeoulAPIResponse;
  selectedCityName: CityName;
  pos: Vector;
  setPos: (pos: Vector | ((e: Vector) => Vector)) => void;
  isTouch: boolean;
}

type Status = "safe" | "warn" | "danger" | "noInfo";
const statusColorMap: {
  [key in Status]: string;
} = {
  safe: "#51DB80",
  warn: "#D8DB51",
  danger: "#E55C5C",
  noInfo: "#E7E7E7",
};
const Path = styled.path<{ isSelected: boolean; status: Status }>`
  stroke-width: 1px;
  transition: left 200ms, top 200ms;
  transform-origin: center center;
  fill: ${(props) => statusColorMap[props.status]};
  stroke: #ffffff;

  ${(props) =>
    props.isSelected
      ? css`
          stroke: #000000;
          stroke-width: 2px;
        `
      : css``}
`;

const Text = styled.text`
  text-anchor: middle;
  pointer-events: none;
  font-size: 10px;
`;
const RegionNameSVGText = ({
  x,
  y,
  regionName,
  averageRiverLevelRatio,
}: {
  x: number;
  y: number;
  regionName: string;
  averageRiverLevelRatio: number | null;
}) => {
  return (
    <Text x={x} y={averageRiverLevelRatio ? y - 8 : y}>
      {regionName}
      {averageRiverLevelRatio && (
        <tspan x={x - 3} y={y + 8}>
          {(averageRiverLevelRatio * 100).toFixed(2)} %
        </tspan>
      )}
    </Text>
  );
};

export function MapSVG({
  isTouch,
  riverData,
  selectedCityName,
  pos,
  setPos,
}: MapSVGProps) {
  const {
    selectedRegionName,
    setSelectedRegionName,
    regionNames,
    setRegionNames,
  } = useMap();
  const { data, refetch } = useQuery<RiverLevelSeoulAPIResponse>(
    ["query", "seoul"],
    async () => {
      const res = await axios.get(
        `https://riverlevel.betaman.xyz/.netlify/functions/seoul`
      );
      return res.data;
    }
  );
  const [showRegionNames, setShowRegionNames] = useState<string[]>([]);

  const [regionsState, setRegions] = useState<Regions>(
    koreaCities[selectedCityName]
  );

  useEffect(() => {
    setRegionNames(Object.keys(regionsState.regions));
    setShowRegionNames(Object.keys(regionsState.regions));
  }, [regionsState.regions, setRegionNames]);

  // 지역 SVG path click event handler
  const clickRegion = (region: Region) => {
    moveRegion(region.guName);
  };

  const moveRegion = useCallback(
    (regionName: string, fromSearch?: boolean) => {
      if (!regionsState.regions[regionName]?.target?.current) return;
      setShowRegionNames((e) => [
        ...e.filter((a) => a !== regionName),
        regionName,
      ]);
      setSelectedRegionName(regionName);

      const regionPos =
        regionsState.regions[
          regionName
        ].target.current!.getBoundingClientRect();

      const screenCenter = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
      const regionCenter = {
        x: regionPos.x + regionPos.width / 2,
        y: regionPos.y + regionPos.height / 2,
      };
      const distance = {
        x: screenCenter.x - regionCenter.x,
        y: screenCenter.y - regionCenter.y,
      };

      setPos((e) => ({
        x: e.x + distance.x / (fromSearch ? 1 : 2),
        y: e.y + distance.y / (fromSearch ? 1 : 2),
      }));
    },
    [regionsState.regions, setPos, setSelectedRegionName]
  );

  useEffect(() => {
    moveRegion(selectedRegionName, true);
  }, [moveRegion, selectedRegionName]);

  return (
    <Map
      style={{
        top: `${pos.y}px`,
        left: `${pos.x}px`,
      }}
      isTouch={isTouch}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.2"
        baseProfile="tiny"
        width={regionsState.svg.width}
        height={regionsState.svg.height}
        viewBox={`0 0 ${regionsState.svg.width} ${regionsState.svg.height}`}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>
          {showRegionNames.map((regionName, i) => {
            const rivers =
              data?.ListRiverStageService.row.filter(
                (e) => e.GU_NAME === regionName
              ) || [];

            const statusRadio =
              (rivers
                ?.map((e) => e.CURRENT_LEVEL / e.PLANFLOOD_LEVEL)
                .reduce((pre, cur) => pre + cur, 0) || 0) / rivers.length;

            let status: Status;
            if (rivers?.length !== 0) {
              if (statusRadio >= 0.95) status = "danger";
              else if (statusRadio >= 0.9) status = "warn";
              else status = "safe";
            } else {
              status = "noInfo";
            }

            return (
              <Path
                key={i}
                id={`svg-path-${regionName}`}
                ref={regionsState.regions[regionName].target}
                d={regionsState.regions[regionName].svgPath}
                onClick={() => clickRegion(regionsState.regions[regionName])}
                isSelected={regionName === selectedRegionName}
                status={status}
              />
            );
          })}
        </g>
        <g>
          {showRegionNames.map((regionName, i) => {
            return (
              <RegionNameSVGText
                key={i}
                x={regionsState.regions[regionName].svgTextPos.x}
                y={regionsState.regions[regionName].svgTextPos.y}
                regionName={regionName}
                averageRiverLevelRatio={
                  regionsState.regions[regionName].averageRiverLevelRatio
                }
              ></RegionNameSVGText>
            );
          })}
        </g>
      </svg>
    </Map>
  );
}
