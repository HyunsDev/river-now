import styled from "styled-components";
import { Flex } from "../../../share/layout/flex";

type Status = "safe" | "warn" | "danger" | "noInfo";

const Divver = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 16px;
`;

const statusColorMap: {
  [key in Status]: string;
} = {
  safe: "rgba(57, 183, 93, 1)",
  warn: "rgba(250, 175, 0, 1)",
  danger: "rgba(216, 80, 74, 1)",
  noInfo: "#cecece",
};
const StatusBadge = styled.div<{ status: Status }>`
  font-size: 12px;
  background-color: ${(props) => statusColorMap[props.status]};
  color: #ffffff;
  border-radius: 999px;
  padding: 2px 8px;
`;

const SubText = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

const Text = styled.div`
  font-size: 16px;
`;

const statusTextMap: {
  [key in Status]: string;
} = {
  safe: "안전",
  warn: "주의",
  danger: "위험",
  noInfo: "정보 없음",
};

export function InfoBlock({
  status,
  subText,
  text,
  title,
}: {
  title: string;
  status: Status;
  subText: string;
  text: string;
}) {
  return (
    <Divver>
      <Flex.Column gap="4px">
        <Flex.Row gap="8px">
          <Title>{title}</Title>
          <StatusBadge status={status}>{statusTextMap[status]}</StatusBadge>
        </Flex.Row>
        <SubText>{subText}</SubText>
      </Flex.Column>
      <Text>{text}</Text>
    </Divver>
  );
}
