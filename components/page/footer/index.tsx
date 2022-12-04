import { useQuery } from "react-query";
import { useFooter } from "../../../hook/useFooter/useFooter";
import { useMap } from "../../../hook/useMap/useMap";
import { RiverLevelSeoulAPIResponse } from "../map/map/type";
import { FooterBlock } from "./block";
import { DetailBlock } from "./block/detailBlock";
import { InfoBlock } from "./block/infoBlock";
import axios from "axios";

type Status = "safe" | "warn" | "danger" | "noInfo";

export function Footer() {
  const {
    footerPosition: { position, setPosition },
  } = useFooter();
  const { selectedRegionName } = useMap();

  const { data, refetch } = useQuery<RiverLevelSeoulAPIResponse>(
    ["query", "seoul"],
    async () => {
      const res = await axios.get(
        `https://riverlevel.betaman.xyz/.netlify/functions/seoul`
      );
      return res.data;
    }
  );

  const rivers =
    data?.ListRiverStageService.row.filter(
      (e) => e.GU_NAME === selectedRegionName
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
    <FooterBlock>
      <InfoBlock
        title={`서울특별시 ${selectedRegionName}`}
        status={status}
        text={
          rivers.length === 0 ? "" : `수위 ${Math.round(statusRadio * 100)}%`
        }
        subText="3시간 전 업데이트"
      />
      <DetailBlock data={data} />
    </FooterBlock>
  );
}
