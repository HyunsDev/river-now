/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { useFooter } from "../../../../hook/useFooter/useFooter";
import { useMap } from "../../../../hook/useMap/useMap";
import { Flex } from "../../../share/layout/flex";

import FloodRiskMapList from "../../../../data/floodRiskMapWithImageFileName.json";
import { stringify } from "querystring";
import { RiverLevelSeoulAPIResponse } from "../../map/map/type";
import { useState } from "react";

const Divver = styled.div<{ isShow: boolean }>`
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  transition: 200ms;
  gap: 32px;
`;

const DetailInfoLabel = styled.div`
  font-size: 14px;
  color: #7e7e7e;
`;

const DetailInfoValue = styled.div`
  font-size: 16px;
  color: #000000;
`;

const RiverName = styled.div`
  color: #2e2e2e;
  font-size: 16px;
  border-bottom: solid 1px #c0c0c0;
  padding-bottom: 8px;
`;

function DetailInfos({ data }: { data?: RiverLevelSeoulAPIResponse }) {
  const { selectedRegionName } = useMap();
  const rivers =
    data?.ListRiverStageService.row.filter(
      (e) => e.GU_NAME === selectedRegionName
    ) || [];

  return (
    <Flex.Column gap="40px">
      {rivers.map((river) => (
        <Flex.Column gap="6px" key={river.RIVERGAUGE_CODE}>
          <RiverName>{river.RIVER_NAME}</RiverName>

          <Flex.Between>
            <DetailInfoLabel>현재 하천 수위</DetailInfoLabel>
            <DetailInfoValue>{river.CURRENT_LEVEL} m</DetailInfoValue>
          </Flex.Between>

          <Flex.Between>
            <DetailInfoLabel>계획 홍수위</DetailInfoLabel>
            <DetailInfoValue>{river.PLANFLOOD_LEVEL} m</DetailInfoValue>
          </Flex.Between>

          <Flex.Between>
            <DetailInfoLabel>하천 수위 비율</DetailInfoLabel>
            <DetailInfoValue>
              {Math.round(
                (river.CURRENT_LEVEL / river.PLANFLOOD_LEVEL) * 1000
              ) / 10}{" "}
              %
            </DetailInfoValue>
          </Flex.Between>
        </Flex.Column>
      ))}
    </Flex.Column>
  );
}

const FloodRiskMapTitle = styled.div`
  color: #2e2e2e;
  font-size: 16px;
  border-bottom: solid 1px #c0c0c0;
  padding-bottom: 8px;
`;

const FloodRiskMaps = styled.div`
  overflow-x: scroll;
  display: flex;
  width: 100%;
`;

const FloodRiskMapItem = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;

const FloodRiskMapSelect = styled.select`
  padding: 8px 16px;
  border-radius: 4px;
`;

function FloodRiskMap({ region }: { region: string }) {
  const imgs: {
    dong: string;
    imgs: string[];
  }[] = region
    ? Object.entries(
        (FloodRiskMapList["서울특별시"].sigungu as any)[region].yubmyundong
      ).map(([key, value]) => ({
        dong: key,
        imgs: (value as any).img,
      }))
    : [];

  const [dong, setDong] = useState(imgs[0]?.dong || "");

  return (
    <Flex.Column gap="20px">
      <FloodRiskMapTitle>홍수 위험 지도</FloodRiskMapTitle>
      <FloodRiskMapSelect
        value={dong}
        onChange={(e) => setDong(e.target.value)}
      >
        {imgs.map((img) => (
          <option value={img.dong} key={img.dong}>
            {img.dong}
          </option>
        ))}
      </FloodRiskMapSelect>

      <FloodRiskMaps>
        {imgs
          .filter((e) => e.dong === dong)
          .map((dong) => (
            <FloodRiskMapItem key={dong.dong}>
              {dong.imgs.map((e, i) => (
                <img
                  src={`https://cdn.jsdelivr.net/gh/skymins04/real-time-river-level-korea-cdn/${e}`}
                  key={i}
                  alt=""
                />
              ))}
            </FloodRiskMapItem>
          ))}
      </FloodRiskMaps>
    </Flex.Column>
  );
}

export function DetailBlock({ data }: { data?: RiverLevelSeoulAPIResponse }) {
  const {
    footerPosition: { position },
  } = useFooter();

  const { selectedRegionName } = useMap();

  return (
    <Divver isShow={position !== "small"}>
      <DetailInfos data={data} />
      <FloodRiskMap region={selectedRegionName} />
    </Divver>
  );
}
