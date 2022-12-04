import React, { createContext, useContext, useState } from "react";

export type FooterPosition = "small" | "half" | "full";
export type FooterPositionContextProps = {
  position: FooterPosition;
  setPosition: (position: FooterPosition) => void;
};

export const FooterPositionContext = createContext<FooterPositionContextProps>({
  position: "small",
  setPosition: () => null,
});

export function FooterPositionContextProvider({
  children,
  initPosition = "small",
}: {
  children: React.ReactNode;
  initPosition?: FooterPosition;
}) {
  const [position, setPosition] = useState<FooterPosition>(initPosition);

  return (
    <FooterPositionContext.Provider
      value={{
        position,
        setPosition,
      }}
    >
      {children}
    </FooterPositionContext.Provider>
  );
}
