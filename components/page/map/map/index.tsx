import React, { useRef, useState } from "react";
import styled from "styled-components";
import { MapSVG } from "./map";
import { Vector } from "./type";

const StyledMap = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  background-color: #e0e0e0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export function Map() {
  const [pos, setPos] = useState<Vector>({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const firstTouchPos = useRef<Vector>({ x: 0, y: 0 });

  const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    setIsTouch(true);
    firstTouchPos.current = {
      x: e.changedTouches[0].clientX - pos.x,
      y: e.changedTouches[0].clientY - pos.y,
    };
  };

  const touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const _pos: Vector = {
      x: e.changedTouches[0].clientX - firstTouchPos.current.x,
      y: e.changedTouches[0].clientY - firstTouchPos.current.y,
    };
    setPos(_pos);
  };

  const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    setIsTouch(false);
  };

  return (
    <StyledMap
      onTouchStart={(e) => touchStart(e)}
      onTouchEnd={(e) => touchEnd(e)}
      onTouchMove={(e) => touchMove(e)}
      ref={ref}
    >
      <MapSVG
        selectedCityName="seoul"
        pos={pos}
        setPos={setPos}
        isTouch={isTouch}
      />
    </StyledMap>
  );
}
