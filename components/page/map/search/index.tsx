import Link from "next/link";
import { DotsThreeVertical, Info } from "phosphor-react";
import { useState } from "react";
import styled from "styled-components";
import { useMap } from "../../../../hook/useMap/useMap";

const Divver = styled.div`
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const SearchBox = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  padding: 8px 16px;
  margin: 16px 12px 0px 12px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchBoxInput = styled.input`
  color: #0f0f0f;
  font-size: 16px;
  border: 0;

  &:focus {
    outline: 0;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
`;

const PreviewBox = styled.div`
  background-color: #ffffff;
  margin: 12px 12px 0px 12px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 16px;
  z-index: 10;
  height: 30vh;
  overflow: scroll;
`;

const PreviewBoxItem = styled.div`
  z-index: 10;
`;

const A = styled.a`
  display: flex;
  align-items: center;
`;

export function SearchBar() {
  const [text, setText] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const { regionNames, setSelectedRegionName } = useMap();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const onClick = (region: string) => {
    console.log(region);
    setSelectedRegionName(region);
    setIsFocus(false);
  };

  return (
    <Divver>
      <SearchBox>
        <SearchBoxInput
          value={text}
          onChange={(e) => onChange(e)}
          placeholder="지역을 검색해보세요"
          onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
        />
        <Icons>
          <Link href={"/info"} passHref>
            <A>
              <Info size={20} />
            </A>
          </Link>
        </Icons>
      </SearchBox>
      {isFocus && (
        <PreviewBox>
          {regionNames.map((e) => (
            <PreviewBoxItem key={e} onClick={() => onClick(e)}>
              {e}
            </PreviewBoxItem>
          ))}
        </PreviewBox>
      )}
    </Divver>
  );
}
