import React, { createContext, useState, ReactNode } from 'react';

type CircleContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>; 
};

export const CircleContext = createContext<CircleContextType>({
  count: 0,
  setCount: () => {},
});

export const CircleProvider = ({ children }: { children: ReactNode }) => {
const [count, setCount] = useState<number>(0); 

  return (
    <CircleContext.Provider value={{ count, setCount }}>
      {children}
    </CircleContext.Provider>
  );
};
