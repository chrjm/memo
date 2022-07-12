import { FC, useState, useMemo } from "react";
import "./App.css";

import Header from "./components/Header";
import PairedWords from "./components/PairedWords";
import WordColumns from "./components/WordColumns";
import Results from "./components/Results";

import { GameStateContext } from "./contexts/GameStateContext";
import { TranslationsContext } from "./contexts/TranslationsContext";

import { Translations } from "./types/Translations";

import { translationsData } from "./data/translationsData";

const App: FC = () => {
  const [gameState, setGameState] = useState<string>("learn");
  const gameStateMemo = useMemo(() => {
    return { gameState, setGameState };
  }, [gameState]);

  const [translations, setTranslations] = useState<Translations>(
    structuredClone(translationsData)
  );
  const translationsMemo = useMemo(() => {
    return { translations, setTranslations };
  }, [translations]);

  return (
    <GameStateContext.Provider value={gameStateMemo}>
      <TranslationsContext.Provider value={translationsMemo}>
        <div className="App">
          <Header />
          {(gameState === "learn" || gameState === "test") && <WordColumns />}
          {gameState === "test" && <PairedWords />}
          {gameState === "review" && <Results />}
        </div>
      </TranslationsContext.Provider>
    </GameStateContext.Provider>
  );
};

export default App;
