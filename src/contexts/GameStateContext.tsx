import React, { createContext } from "react";

export const GameStateContext = createContext<{
  gameState: string;
  setGameState: React.Dispatch<React.SetStateAction<string>>;
}>({} as any);
