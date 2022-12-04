import Link from "next/link";
import styled from "styled-components";
import { Flex } from "../components/share/layout/flex";

const Divver = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`;

const Title = styled.h1`
  font-weight: normal;
`;

const Info = styled.div`
  font-size: 16px;
  color: #3f3f3f;
`;

export default function Main() {
  return (
    <Divver>
      <Link href={"/"}>지도로 돌아가기</Link>
      <Title>River Now</Title>
      <Info>
        ⚠️ 본 사이트에서 제공하는 실시간 하천수위/강수량 정보는 각 시도 별
        공공데이터를 후처리하여 자체적으로 통계 및 시각화된 자료입니다. 이는
        공식적 근거 자료로써 활용될 수 없고 이로인해 발생된 문제의 책임은
        사용자에게 있습니다.
      </Info>
      <Info>
        API 레포지토리:{" "}
        <a href="https://github.com/skymins04/real-time-river-level-korea">
          https://github.com/skymins04/real-time-river-level-korea
        </a>
      </Info>
      <Info>
        프론트엔드 레포지토리:{" "}
        <a href="https://github.com/HyunsDev/river-now">
          https://github.com/HyunsDev/river-now
        </a>
      </Info>
      <Info>
        개발자
        <Flex.Column>
          <Flex.Between>
            <div>백엔드</div>
            <div>강민수 - 광성고</div>
          </Flex.Between>

          <Flex.Between>
            <div>프론트엔드</div>
            <div>박현우 - 서령고</div>
          </Flex.Between>
        </Flex.Column>
      </Info>
      <Info>
        현재 리버나우는 개발 중인 프로젝트이며, &quot;최소기능버전&quot;으로
        동작하고 있습니다. 지속적으로 개선해 나가며 새로운 기능과 디자인을
        추가할 예정입니다
      </Info>
    </Divver>
  );
}
