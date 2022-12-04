import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useFooter } from "../../../hook/useFooter/useFooter";

type FooterPosition = "small" | "half" | "full";
const Divver = styled.div<{ position: FooterPosition }>`
  display: flex;
  position: fixed;
  width: 100vw;
  left: 0px;
  bottom: 0px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  margin-bottom: ${(props) => (props.position === "full" ? "0px" : "10px")};
  transition: 200ms;
`;

const StyledBlock = styled.div<{ position: FooterPosition; isTouch: boolean }>`
  background-color: #ffffff;
  padding: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  transition: 200ms, height ${(props) => (props.isTouch ? "0ms" : "200ms")};
  overflow: hidden;
  position: relative;
  ${(props) =>
    props.position === "full"
      ? css`
          width: calc(100%);
          margin: 0px 20px;
          border-radius: 0px;
        `
      : css`
          width: calc(100% - 20px);
          margin: 0px 0px;
          border-radius: 12px;
        `};
`;

const FooterLabel = styled.div<{ isShow: boolean }>`
  font-size: 12px;
  color: #7e7e7e;
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  transition: 200ms;
`;

const FooterBarOuter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: rgba(0, 0, 0, 0.1); */
  min-height: 28px;
  /* position: absolute;
  top: 0px;
  left: 0px; */
`;

const FooterBarInner = styled.div`
  width: 80px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 9999px;
  height: 4px;
`;

const FooterChild = styled.div<{ position: FooterPosition }>`
  padding: 8px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow: ${(props) => (props.position === "small" ? "hidden" : "auto")};
`;

export function FooterBlock({ children }: { children?: React.ReactNode }) {
  const {
    footerPosition: { position, setPosition },
  } = useFooter();

  const ref = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const firstHeight = useRef<number>(0);
  const firstTouchPos = useRef<number>(0);
  const lastHeight = useRef<number>(-1);
  const [touchPos, setTouchPos] = useState<number>(-1);

  const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    setIsTouch(true);
    firstTouchPos.current = e.changedTouches[0].clientY;
    firstHeight.current =
      screen.height - ref.current.getBoundingClientRect().top;
    setTouchPos(e.changedTouches[0].clientY - firstTouchPos.current);
  };

  const touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const pos = e.changedTouches[0].clientY - firstTouchPos.current;
    setTouchPos(pos);

    if (firstHeight.current + -pos > window.innerHeight * 0.8) {
      setPosition("full");
    } else if (firstHeight.current + -pos > window.innerHeight * 0.4) {
      setPosition("half");
    } else {
      setPosition("small");
      if (!childRef.current) return;
      childRef.current.scrollTo({ top: 0 });
    }
  };

  const touchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsTouch(false);
    lastHeight.current = -1;
  };

  let height: number = 0;
  if (isTouch) {
    if (lastHeight.current === -1) {
      if (position === "small") {
        lastHeight.current = 100;
      } else if (position === "half") {
        lastHeight.current = window.innerHeight / 2;
      } else if (position === "full") {
        lastHeight.current = window.innerHeight;
      }
    }

    height = lastHeight.current - touchPos;
    if (height >= window.innerHeight) height = window.innerHeight;
    if (height <= 100) height = 100;
  } else {
    if (position === "small") {
      height = 100;
    } else if (position === "half") {
      height = window.innerHeight / 2;
    } else if (position === "full") {
      height = window.innerHeight;
    }
  }

  return (
    <Divver position={position}>
      <FooterLabel isShow={position === "small"}>
        위로 올려 자세한 정보를 확인하세요
      </FooterLabel>
      <StyledBlock
        position={position}
        style={{ height: `${height}px` }}
        isTouch={isTouch}
        ref={ref}
      >
        <FooterBarOuter
          onTouchStart={(e) => touchStart(e)}
          onTouchEnd={(e) => touchEnd(e)}
          onTouchMove={(e) => touchMove(e)}
        >
          <FooterBarInner />
        </FooterBarOuter>
        <FooterChild position={position} ref={childRef}>
          {children}
        </FooterChild>
      </StyledBlock>
    </Divver>
  );
}
