import React, { createContext, useState, ReactNode } from "react";

type SeverityPoints = {
  erythema: number;
  induration: number;
  desquamation: number;
  setSeverity: (points: SeverityPoints) => void;
};

export const SeverityContext = createContext<SeverityPoints | undefined>(undefined);

export const SeverityProvider = ({ children }: { children: ReactNode }) => {
  const [severity, setSeverity] = useState<SeverityPoints>({
    erythema: 0,
    induration: 0,
    desquamation: 0,
    setSeverity: () => {},
  });

  return (
    <SeverityContext.Provider value={{ ...severity, setSeverity }}>
      {children}
    </SeverityContext.Provider>
  );
};
