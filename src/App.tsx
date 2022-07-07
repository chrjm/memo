import { FC, useState, useMemo } from "react";
import "./App.css";

import WordsColumn from "./components/WordsColumn";

import { GameStateContext } from "./contexts/GameStateContext";

import { shuffleArray } from "./helpers/shuffleArray";
import { translations } from "./translations";

const App: FC = () => {
  const [gameState, setGameState] = useState<string>("learn");
  const [currentWords, setCurrentWords] = useState<{ [key: string]: string[] }>(
    { english: Object.keys(translations), french: Object.values(translations) }
  );
  const [firstSelectedWord, setFirstSelectedWord] = useState<string>("");
  const [pairedWords, setPairedWords] = useState<{ [key: string]: string }>(
    Object.fromEntries(Object.keys(translations).map((key) => [key, ""]))
  );

  const gameStateMemo = useMemo(() => {
    return { gameState, setGameState };
  }, [gameState]);

  function selectWord(selectedWord: string): void {
    if (gameState === "test") {
      if (firstSelectedWord === "") {
        setFirstSelectedWord(selectedWord);
      } else {
        if (currentWords.english.includes(firstSelectedWord)) {
          if (currentWords.french.includes(selectedWord)) {
            setPairedWords({
              ...pairedWords,
              [firstSelectedWord]: selectedWord,
            });
            setFirstSelectedWord("");
          }
        } else {
          if (currentWords.english.includes(selectedWord)) {
            setPairedWords({
              ...pairedWords,
              [selectedWord]: firstSelectedWord,
            });
            setFirstSelectedWord("");
          }
        }
      }
    }
  }

  console.log("Game State:", gameState);
  console.log("First Selected Word:", firstSelectedWord);
  console.log("Paired Words:", pairedWords);

  return (
    <GameStateContext.Provider value={gameStateMemo}>
      <div className="App">
        <header className={gameState}>
          <h1>Memo</h1>
          <button
            onClick={() => {
              if (gameState === "learn") {
                setCurrentWords({
                  english: shuffleArray(currentWords.english),
                  french: shuffleArray(currentWords.french),
                });
                setGameState("test");
              } else if (gameState === "test") {
                setGameState("review");
              } else if (gameState === "review") {
                setGameState("learn");
              }
            }}
          >
            {gameState === "learn" ? "GO!" : "GRADE"}
          </button>
        </header>
        <div className="word-columns">
          <WordsColumn
            name="English Words"
            words={currentWords.english}
            selectWord={selectWord}
            firstSelectedWord={firstSelectedWord}
            pairedWords={pairedWords}
          ></WordsColumn>
          <WordsColumn
            name="French Words"
            words={currentWords.french}
            selectWord={selectWord}
            firstSelectedWord={firstSelectedWord}
            pairedWords={pairedWords}
          ></WordsColumn>
        </div>
      </div>
    </GameStateContext.Provider>
  );
};

export default App;
