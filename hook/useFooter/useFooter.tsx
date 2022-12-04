import { useContext } from "react";
import { FooterPositionContext } from "./footerPositionContext";

export const useFooter = () => {
  const footerPosition = useContext(FooterPositionContext);

  return {
    footerPosition: footerPosition,
  };
};
