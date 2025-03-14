import React, { createContext, useState, ReactNode } from 'react';

type PointsOnBody = {
  points: {
    pointsOnHead: number;
    pointsOnHand: number;
    pointsOnTrunk: number;
    pointsOnLeg: number;
  };
  setPoints: React.Dispatch<
    React.SetStateAction<{
      pointsOnHead: number;
      pointsOnHand: number;
      pointsOnTrunk: number;
      pointsOnLeg: number;
    }>
  >;
};

export const PointsOnBodyContext = createContext<PointsOnBody>({
  points: { pointsOnHead: 0, pointsOnHand: 0, pointsOnTrunk: 0, pointsOnLeg: 0 },
  setPoints: () => {},
});

export const PointsProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState({
    pointsOnHead: 0,
    pointsOnHand: 0,
    pointsOnTrunk: 0,
    pointsOnLeg: 0,
  });

  return (
    <PointsOnBodyContext.Provider value={{ points, setPoints }}>
      {children}
    </PointsOnBodyContext.Provider>
  );
};
